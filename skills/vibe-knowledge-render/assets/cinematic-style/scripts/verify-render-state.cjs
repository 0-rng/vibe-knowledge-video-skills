const fs=require('fs');
const path=require('path');
const {bundle}=require('@remotion/bundler');
const {openBrowser,selectComposition,renderStill}=require('@remotion/renderer');

(async()=>{
 const root=path.resolve(__dirname,'..'),out=path.join(root,'output/qa');
 fs.mkdirSync(out,{recursive:true});
 const serveUrl=await bundle({entryPoint:path.join(root,'src/index.ts')});
 const browserExecutable='/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
 const browser=await openBrowser('chrome',{browserExecutable});
 const results=[];
 try{
  for(const [id,file] of [['Atmosphere','01-atmosphere.png'],['Data','02-data.png'],['Concept','03-concept.png']]){
   const composition=await selectComposition({serveUrl,id,browserExecutable,puppeteerInstance:browser});
   for(const frame of [20,90]){
    await renderStill({serveUrl,composition,frame,output:path.join(out,`${id}-${frame}.png`),imageFormat:'png',browserExecutable,puppeteerInstance:browser});
   }
   const referencePath=path.join(root,'output/keyframes',file),repeatPath=path.join(out,`${id}-90.png`);
   const reference=fs.readFileSync(referencePath);
   const repeat=fs.readFileSync(repeatPath);
   const same=reference.equals(repeat);
   let pixelCheck={maxChannelError:0,changedPixels:0,withinOneLevelTwoPixelTolerance:true};
   if(!same){
    const python=process.env.STYLE_QA_PYTHON||path.join(require('os').homedir(),'.cache/codex-runtimes/codex-primary-runtime/dependencies/python/bin/python3');
    const code='import sys,json,numpy as np; from PIL import Image; a=np.array(Image.open(sys.argv[1]).convert("RGB"),dtype=np.int16); b=np.array(Image.open(sys.argv[2]).convert("RGB"),dtype=np.int16); d=np.abs(a-b); m=int(d.max()); n=int((d.max(axis=2)>0).sum()); print(json.dumps({"maxChannelError":m,"changedPixels":n,"withinOneLevelTwoPixelTolerance":m<=1 and n<=2}))';
    pixelCheck=JSON.parse(require('child_process').execFileSync(python,['-c',code,referencePath,repeatPath],{encoding:'utf8'}));
   }
   results.push({composition:id,order:[90,20,90],sameFramePngBytesEqual:same,pixelCheck,continuousMotionValidated:false});
   if(!pixelCheck.withinOneLevelTwoPixelTolerance)throw new Error(`${id}: same-frame pixels exceed documented rasterization tolerance`);
  }
 }finally{await browser.close({silent:true});}
 fs.writeFileSync(path.join(out,'determinism.json'),JSON.stringify(results,null,2)+'\n');
 console.log(JSON.stringify(results));
})().catch(error=>{console.error(error);process.exitCode=1;});
