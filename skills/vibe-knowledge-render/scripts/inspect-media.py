"""Inspect real exports. Technical results never constitute aesthetic approval.
Requires Python, numpy, Pillow, and ffmpeg (or imageio_ffmpeg).
"""
from pathlib import Path
import argparse,subprocess,json,re,io,shutil
import numpy as np
from PIL import Image,ImageDraw

def main():
 ap=argparse.ArgumentParser(description=__doc__);ap.add_argument('video',type=Path);ap.add_argument('--out',type=Path,required=True)
 for k in ['fps','frames','width','height']:ap.add_argument('--'+k,type=int)
 ap.add_argument('--reference-wav',type=Path);a=ap.parse_args();a.out.mkdir(parents=True,exist_ok=True)
 try:
  import imageio_ffmpeg
  ff=imageio_ffmpeg.get_ffmpeg_exe()
 except ImportError:
  ff=shutil.which('ffmpeg')
 if not ff:raise SystemExit('ffmpeg unavailable; no media checks performed')
 def run(args):
  p=subprocess.run([ff,'-hide_banner','-nostdin',*map(str,args)],capture_output=True)
  if p.returncode:raise RuntimeError(p.stderr.decode(errors='replace')[-3000:])
  return p
 # Every decoded frame participates in the count and luminance diagnostics.
 p=run(['-i',a.video,'-map','0:v:0','-vf','scale=135:240','-pix_fmt','rgb24','-f','rawvideo','-']);data=np.frombuffer(p.stdout,dtype=np.uint8).reshape(-1,240,135,3);log=p.stderr.decode(errors='replace')
 meta=re.search(r'Video:.*?(\d{2,5})x(\d{2,5}).*?([\d.]+) fps',log);assert meta,'Could not parse video metadata'
 width,height=int(meta[1]),int(meta[2]);fps=float(meta[3]);count=len(data)
 for key,value in [('width',width),('height',height),('frames',count),('fps',fps)]:
  expected=getattr(a,key)
  if expected is not None:assert value==expected,(key,value,expected)
 gray=data.mean(axis=3);luma=gray.mean(axis=(1,2));diff=np.abs(gray[1:]-gray[:-1]).mean(axis=(1,2));black=np.flatnonzero(luma<1).tolist()
 full=run(['-v','error','-i',a.video,'-f','null','-']);assert not full.stderr.strip(),full.stderr
 # 12 fps review sheets preserve actual decoded imagery, not source promises.
 stride=max(1,round(fps/12));indices=list(range(0,count,stride))
 sheets=[]
 for j in range(0,len(indices),12):
  marks=indices[j:j+12];sheet=Image.new('RGB',(1080,1530),'#141a1e');d=ImageDraw.Draw(sheet)
  for k,n in enumerate(marks):
   im=Image.fromarray(data[n]).resize((270,480),Image.Resampling.LANCZOS);x=k%4*270;y=k//4*510;sheet.paste(im,(x,y));d.text((x+10,y+485),f'frame {n} / {n/fps:.3f}s',fill='#eee6cb')
  name=f'continuous-{j//12+1:02d}.jpg';sheet.save(a.out/name,quality=92);sheets.append(name)
 loud=None
 try:
  log2=run(['-i',a.video,'-vn','-af','loudnorm=I=-15:TP=-1.8:LRA=7:print_format=json','-f','null','-']).stderr.decode();loud=json.loads(re.findall(r'\{\s*"input_i".*?\}',log2,re.S)[-1])
 except (IndexError,ValueError):pass
 offset=None
 if a.reference_wav:
  def raw(p):return np.frombuffer(run(['-v','error','-i',p,'-vn','-ar','48000','-ac','1','-f','f32le','-']).stdout,dtype='<f4')
  va=raw(a.video);ref=raw(a.reference_wav);offset=[]
  for sec in [.45,2.05,3.8]:
   n=int(sec*48000);x=va[n:n+24000:2];y=ref[n:n+24000:2];size=1<<(len(x)+len(y)-2).bit_length();corr=np.fft.irfft(np.fft.rfft(x,size)*np.fft.rfft(y[::-1],size),size)[:len(x)+len(y)-1];lag=int(np.argmax(corr)-len(y)+1);offset.append({'at':sec,'lagMs':lag/24})
  assert all(abs(x['lagMs'])<=5 for x in offset),offset
 report={'video':str(a.video.resolve()),'width':width,'height':height,'fps':fps,'decodedFrames':count,'durationSeconds':count/fps,'completeDecode':True,'nearBlackFrames':black,'maxFrameLumaDifference':float(diff.max()),'loudnormInput':loud,'referenceAudioOffsetMs':offset,'reviewSheets':sheets,'aestheticReview':'NOT AUTOMATED: inspect the real sheets and video; log actual viewing/listening capability.'}
 (a.out/'technical.json').write_text(json.dumps(report,ensure_ascii=False,indent=2));print(json.dumps(report,ensure_ascii=False,indent=2))
if __name__=='__main__':main()
