import React,{useEffect,useState} from 'react';
import {delayRender,continueRender,cancelRender} from 'remotion';
import {typography} from './tokens';

let fontReady:Promise<void>|undefined;
export const loadSeriesFont=()=>{
 if(!fontReady)fontReady=(async()=>{
  const face=new FontFace(typography.serif,'local("Songti SC Regular"), local("STSongti-SC-Regular")',{weight:'400',style:'normal'});
  await face.load();
  (document.fonts as FontFaceSet & {add:(font:FontFace)=>FontFaceSet}).add(face);
  await document.fonts.load(`64px "${typography.serif}"`,'电影感知识视觉：空间与表达');
  await document.fonts.ready;
  if(!document.fonts.check(`64px "${typography.serif}"`,'中文字体'))throw new Error('Required Songti SC font not ready; no silent fallback.');
  console.info('SERIES_FONT_READY: Songti SC; live HTML/SVG Chinese text');
 })();
 return fontReady;
};
export const FontGate:React.FC<{children:React.ReactNode}>=({children})=>{
 const [handle]=useState(()=>delayRender('Wait for genuine Songti SC font'));
 useEffect(()=>{loadSeriesFont().then(()=>continueRender(handle)).catch(e=>cancelRender(e));},[handle]);
 return <div data-style-font="Songti SC" style={{position:'absolute',inset:0}}>{children}</div>;
};
