import React from 'react';
import {useCurrentFrame,useVideoConfig} from 'remotion';
import {FontGate} from './visual-system/FontGate';
import {AbstractConcept,ChapterNumber,ChapterTransition,CinematicStage,EditorialFrame,MicroLabel,PaperObject,SerifText,ThinLineChart} from './visual-system/components';
import {palette as P,typography as T,phase} from './visual-system/tokens';

export const AtmosphereScene:React.FC=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <FontGate><CinematicStage template="A" accent="gold" dust="window" motif={<PaperObject/>}>
  <EditorialFrame index="01" section="ATMOSPHERE  /  光与留白" note="DARK EDITORIAL  —  STYLE STUDY / 2026"/>
  <ChapterNumber value="01"/>
  <MicroLabel x={148} y={310} color={P.coral}>01 — ATTENTION</MicroLabel>
  <SerifText x={144} y={382} width={850} lines={[{text:'在喧嚣之外，'},{text:'把注意力留给重要的事。'}]} size={65}/>
  <div style={{position:'absolute',left:148,top:652,width:610,fontFamily:T.serif,fontSize:29,lineHeight:1.9,letterSpacing:1.8,color:P.muted,opacity:phase(t,1.1,.7)}}>让光找到主体，也让画面留有呼吸。</div>
  <MicroLabel x={151} y={845} size={17} spacing={1.5}>A / WINDOW LIGHT · MATTE PAPER</MicroLabel>
  <MicroLabel x={1460} y={858} size={16} color={P.gold} spacing={2}>A QUIET MOMENT</MicroLabel>
 </CinematicStage></FontGate>;
};

export const DataScene:React.FC=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;const progress=phase(t,.6,1.6);
 const a=[12,19,27,30,41,46,58,62,69,76,82],b=[13,18,24,29,32,37,43,48,53,58,64];
 const delta=Math.round((a[a.length-1]-b[b.length-1])*progress);
 return <FontGate><CinematicStage template="C" accent="ice" dust="none" lightX={1250} lightY={620} motif={<ThinLineChart series={[{name:'A',values:a,accent:true},{name:'B',values:b}]}/>}>
  <EditorialFrame index="02" section="EVIDENCE  /  数据的形状" note="ILLUSTRATIVE DATA  —  VISUAL SYSTEM TEST"/>
  <ChapterNumber value="02"/>
  <MicroLabel x={148} y={278} color={P.ice}>02 — OBSERVE THE DIFFERENCE</MicroLabel>
  <SerifText x={144} y={350} width={620} size={61} lines={[{text:'看见差异，'},{text:'让趋势自己说话。'}]}/>
  <MicroLabel x={148} y={591} size={25} chinese>同一尺度，让变化可以比较。</MicroLabel>
  <div style={{position:'absolute',left:144,top:690,fontFamily:T.sans,fontSize:84,fontWeight:200,color:P.ice,letterSpacing:-2,opacity:phase(t,1.1,.65)}}>{delta.toString().padStart(2,'0')}<span style={{fontSize:22,letterSpacing:1,color:P.muted,marginLeft:20}}>Δ / INDEX</span></div>
  <MicroLabel x={148} y={817} chinese size={20}>样式演示 · 示意数据，非研究结果</MicroLabel>
  <MicroLabel x={820} y={816} color={P.ice} size={18}>—  SERIES A</MicroLabel>
  <MicroLabel x={1030} y={816} color={P.muted} size={18}>- -  SERIES B</MicroLabel>
  <MicroLabel x={1585} y={816} chinese size={19}>时间（示意）</MicroLabel>
 </CinematicStage></FontGate>;
};

export const ConceptScene:React.FC=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <FontGate><CinematicStage template="D" accent="coral" dust="depth" lightX={1080} lightY={680} motif={<AbstractConcept variant="branch" accent="coral" x={960} y={690} spread={1.55} verticalScale={.82}/>}>
  <EditorialFrame index="03" section="CONCEPT  /  路径与可能" note="CONCEPTUAL MODEL  —  NOT AN EXPERIMENT"/>
  <ChapterNumber value="03"/>
  <SerifText x={200} y={228} width={1520} align="center" size={65} lines={[{text:'每一次选择，都在改变路径。'}]}/>
  <div style={{position:'absolute',left:200,top:348,width:1520,textAlign:'center',fontFamily:T.serif,fontSize:28,lineHeight:1.9,letterSpacing:1.8,color:P.muted,opacity:phase(t,1.1,.7)}}>让抽象关系，成为看得见的变化。</div>
  <MicroLabel x={151} y={894} size={16} spacing={1.2}>D / BRANCHING STRUCTURE</MicroLabel>
  <MicroLabel x={457} y={816} chinese size={18}>起点</MicroLabel>
  <MicroLabel x={1490} y={500} chinese size={18} color={P.coral}>被选择的方向</MicroLabel>
 </CinematicStage></FontGate>;
};

export const TransitionStudy:React.FC=()=> <FontGate><CinematicStage template="F" dust="none" motif={null}><ChapterTransition chapter="02" label="让证据浮现"/></CinematicStage></FontGate>;
