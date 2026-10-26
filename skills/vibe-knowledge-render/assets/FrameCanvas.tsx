import React,{useLayoutEffect,useMemo,useRef} from 'react';
import {useCurrentFrame,useVideoConfig,delayRender,continueRender,cancelRender} from 'remotion';

type Props={draw:(g:CanvasRenderingContext2D,seconds:number,frame:number)=>void;ready?:()=>Promise<unknown>};
/** Shared capture clock for any self-contained Canvas scene. No RAF or screen recorder. */
export function FrameCanvas({draw,ready}:Props){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig(),ref=useRef<HTMLCanvasElement>(null);
 const handle=useMemo(()=>delayRender(`canvas frame ${frame}`),[frame]);
 useLayoutEffect(()=>{
  let active=true,finished=false;
  const release=()=>{if(!finished){finished=true;continueRender(handle)}};
  Promise.resolve(ready?.()).then(()=>{
   if(!active)return;
   const c=ref.current;if(!c)throw new Error('Canvas not mounted');const g=c.getContext('2d');if(!g)throw new Error('Canvas2D unavailable');
   g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,width,height);g.save();draw(g,frame/fps,frame);g.restore();release();
  }).catch(e=>{if(active)cancelRender(e instanceof Error?e:new Error(String(e)))});
  return()=>{active=false;release()};
 },[frame,fps,width,height,draw,ready,handle]);
 return <canvas ref={ref} width={width} height={height} style={{position:'absolute',width:'100%',height:'100%'}}/>;
}
