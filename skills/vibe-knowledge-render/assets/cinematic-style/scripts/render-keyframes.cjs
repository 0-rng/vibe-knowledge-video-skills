// Retained only for explicit replay of the historical component demo.
if (!process.argv.includes('--historical-demo')) {
 console.error('Historical demo only. Create topic-specific compositions; old three-image rendering is not part of the current workflow.');
 process.exit(1);
}
const fs=require('fs');
const path=require('path');
const {bundle}=require('@remotion/bundler');
const {selectComposition,renderStill,openBrowser}=require('@remotion/renderer');

(async()=>{
 const root=path.resolve(__dirname,'..');
 fs.mkdirSync(path.join(root,'output/keyframes'),{recursive:true});
 require('child_process').execFileSync('/usr/bin/python3',[path.join(root,'scripts/validate-style-contract.py'),path.join(root,'SHOT_PLAN.json')],{stdio:'inherit'});
 const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts')});
 const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
 const browser=await openBrowser('chrome',{browserExecutable});
 const allJobs=[['Atmosphere','01-atmosphere.png',90],['Data','02-data.png',90],['Concept','03-concept.png',90]];
 const selectedJob=process.argv.slice(2).find(arg=>!arg.startsWith('--'));
 const jobs=selectedJob?allJobs.filter(job=>job[0]===selectedJob):allJobs;
 const log=[];
 try{
  for(const [id,file,frame] of jobs){
   const composition=await selectComposition({serveUrl,id,browserExecutable,puppeteerInstance:browser});
   const output=path.join(root,'output/keyframes',file);
   await renderStill({serveUrl,composition,frame,output,imageFormat:'png',browserExecutable,puppeteerInstance:browser,
    onBrowserLog:entry=>{if(entry.text.includes('SERIES_FONT_READY'))console.log(entry.text);}});
   log.push({id,frame,seconds:frame/30,width:composition.width,height:composition.height,fps:composition.fps,path:output});
   console.log('Rendered',id,output);
  }
 }finally{await browser.close({silent:true});}
 const manifestPath=path.join(root,'output/keyframes/manifest.json');
 const previous=fs.existsSync(manifestPath)?JSON.parse(fs.readFileSync(manifestPath,'utf8')).frames:[];
 const frames=[...previous.filter(item=>!log.some(next=>next.id===item.id)),...log].sort((a,b)=>a.path.localeCompare(b.path));
 fs.writeFileSync(manifestPath,JSON.stringify({styleVersion:'dark-editorial-1.0',kind:'historical-style-demo',historicalExampleOnly:true,useAsCreativeBaseline:false,notMotionValidated:true,frames},null,2)+'\n');
})().catch(error=>{console.error(error);process.exitCode=1;});
