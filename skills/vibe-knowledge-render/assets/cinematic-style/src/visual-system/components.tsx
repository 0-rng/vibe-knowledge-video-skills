import React,{useId} from 'react';
import {AbsoluteFill,useCurrentFrame,useVideoConfig} from 'remotion';
import {Accent,Template,palette as P,typography as T,design as D,phase,seeded,STYLE_VERSION} from './tokens';

const Svg:React.FC<React.SVGProps<SVGSVGElement>>=props=><svg width={1920} height={1080} viewBox="0 0 1920 1080" style={{position:'absolute',inset:0}} {...props}/>;

/** No image contains type. Every atmosphere is generated at the requested frame. */
export const AtmosphereBackground:React.FC<{template:Template}>=({template})=>{
 const {fps}=useVideoConfig();const time=useCurrentFrame()/fps;const uid=useId().replace(/:/g,'');
 const drift=Math.sin(time*0.13)*1.8;
 const backgrounds:Record<Template,string>={
  A:`radial-gradient(ellipse at ${76+drift}% 42%, ${P.wine} 0%, ${P.night} 65%),linear-gradient(${P.wine},${P.night})`,
  B:`radial-gradient(ellipse at ${57+drift}% 24%,${P.aubergine} 0%,${P.night} 72%)`,
  C:`radial-gradient(ellipse at ${53+drift}% 74%,${P.ice}12 0%,transparent 68%),linear-gradient(${P.night},${P.night})`,
  D:`radial-gradient(ellipse at ${66+drift}% 48%,${P.aubergine} 0%,${P.night} 74%)`,
  E:`radial-gradient(ellipse at ${70+drift}% 72%,${P.wine} 0%,${P.night} 67%)`,
  F:`radial-gradient(ellipse at 34% 54%,${P.aubergine} 0%,${P.night} 73%)`,
 };
 return <AbsoluteFill data-layer="Base-Atmosphere" style={{background:backgrounds[template],overflow:'hidden'}}>
  <Svg>
   <defs>
    <filter id={`grain${uid}`} x="0%" y="0%" width="100%" height="100%"><feTurbulence baseFrequency="0.67" numOctaves={3} seed={17} type="fractalNoise"/><feColorMatrix type="saturate" values="0"/></filter>
    <linearGradient id={`plane${uid}`} x1="0" y1="0" x2="0.8" y2="1"><stop stopColor={P.gold} stopOpacity="0.07"/><stop offset="1" stopColor={P.night} stopOpacity="0"/></linearGradient>
    <radialGradient id={`vig${uid}`}><stop offset="0.3" stopColor={P.night} stopOpacity="0"/><stop offset="1" stopColor={P.night} stopOpacity="0.66"/></radialGradient>
   </defs>
   {template==='A'&&<g transform={`translate(${Math.sin(time*0.1)*3},0)`}>
    <path d="M840 0H1920V877L995 750Z" fill={`url(#plane${uid})`}/>
    <path d="M0 890L1076 706L1920 895V1080H0Z" fill={P.wine} opacity="0.32"/>
    <path d="M1030 0L1055 729M1055 729L1920 920" fill="none" stroke={P.gold} strokeOpacity="0.085" strokeWidth="1"/>
    <path d="M1160 0L1190 156L1630 840L1652 837Z" fill={P.night} opacity="0.75"/>
    <path d="M1390 0L1430 110L1815 751L1840 744Z" fill={P.night} opacity="0.7"/>
   </g>}
   {template==='C'&&<g opacity="0.16"><path d="M0 846L980 692L1920 827" stroke={P.ice} strokeOpacity="0.25" fill="none"/><path d="M980 692L960 1080" stroke={P.ice} strokeOpacity="0.17"/></g>}
   {template==='D'&&<g transform={`translate(${Math.sin(time*0.09)*4},0)`}><path d="M965 0H1920V1080L1218 844Z" fill={P.wine} opacity="0.22"/><path d="M1218 844L1860 1080" stroke={P.coral} strokeOpacity="0.075"/></g>}
   <rect width="1920" height="1080" filter={`url(#grain${uid})`} opacity={D.grainOpacity}/>
   <rect width="1920" height="1080" fill={`url(#vig${uid})`}/>
  </Svg>
 </AbsoluteFill>;
};

export const LightField:React.FC<{accent?:Accent;x?:number;y?:number;window?:boolean}>=({accent='gold',x=1390,y=420,window:windowed=false})=>{
 const time=useCurrentFrame()/useVideoConfig().fps;const id=useId().replace(/:/g,'');const breathe=0.94+Math.sin(time*.27)*.035;
 return <Svg data-layer="Light" style={{position:'absolute',inset:0,pointerEvents:'none',mixBlendMode:'screen',opacity:breathe}}>
  <defs>
   <radialGradient id={`pool${id}`}><stop stopColor={P[accent]} stopOpacity="0.18"/><stop offset="0.42" stopColor={P[accent]} stopOpacity="0.045"/><stop offset="1" stopColor={P[accent]} stopOpacity="0"/></radialGradient>
   <linearGradient id={`shaft${id}`} x1="0" y1="0" x2="0.7" y2="1"><stop stopColor={P.gold} stopOpacity="0.11"/><stop offset="0.8" stopColor={P.gold} stopOpacity="0"/></linearGradient>
   <filter id={`soft${id}`}><feGaussianBlur stdDeviation="19"/></filter>
  </defs>
  <ellipse cx={x} cy={y} rx="550" ry="420" fill={`url(#pool${id})`}/>
  {windowed&&<g filter={`url(#soft${id})`}>
   <path d="M1065 -70L1215 -70L1700 900L1358 960Z" fill={`url(#shaft${id})`}/>
   <path d="M1290 -70L1350 -70L1870 800L1750 843Z" fill={`url(#shaft${id})`} opacity="0.6"/>
  </g>}
  <ellipse cx={x+180} cy={y+120} rx="220" ry="320" fill={`url(#pool${id})`} opacity="0.14"/>
 </Svg>;
};

export const DustMotes:React.FC<{variant?:'window'|'depth'|'none';count?:number}>=({variant='depth',count=30})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 if(variant==='none')return null;
 return <Svg data-layer="Atmosphere-dust" style={{position:'absolute',inset:0,pointerEvents:'none'}}>
  {Array.from({length:count},(_,i)=>{
   const r=seeded(i+3),near=i%7===0;
   const x=(variant==='window'?1110:220)+seeded(i+64)*(variant==='window'?660:1450)+Math.sin(t*.13+i)*7;
   const y=100+((seeded(i+120)*830-t*(3+r*5))%860+860)%860;
   return <circle key={i} cx={x} cy={y} r={near?2.1:r*.85+.4} fill={variant==='window'?P.gold:P.ivory} opacity={near?.14:.09+r*.13} style={{filter:near?'blur(1.3px)':undefined}}/>;
  })}
 </Svg>;
};

type TitleLine={text:string;emphasis?:boolean};
export const SerifText:React.FC<{lines:TitleLine[];x:number;y:number;width?:number;size?:number;accent?:Accent;start?:number;align?:'left'|'center'|'right'}>=({lines,x,y,width=850,size=T.title,accent='coral',start=.25,align='left'})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <div data-layer="Layout" data-chinese-text="true" style={{position:'absolute',left:x,top:y,width,fontFamily:T.serif,fontWeight:400,fontSize:size,lineHeight:1.53,letterSpacing:2.2,textAlign:align}}>
  {lines.map((line,i)=>{const p=phase(t,start+i*.18,.65);return <div key={line.text} style={{opacity:p,transform:`translateY(${(1-p)*12}px)`,color:line.emphasis?P[accent]:P.ivory,whiteSpace:'pre-wrap'}}>{line.text}</div>;})}
 </div>;
};

export const MicroLabel:React.FC<{children:React.ReactNode;x:number;y:number;color?:(typeof P)[keyof typeof P];chinese?:boolean;size?:number;spacing?:number}>=({children,x,y,color=P.muted,chinese=false,size=19,spacing=2.4})=>{
 const hasChinese=chinese||(typeof children==='string'&&/[\u3400-\u9fff]/.test(children));
 return <div style={{position:'absolute',left:x,top:y,color,fontSize:size,fontFamily:hasChinese?T.serif:T.sans,letterSpacing:hasChinese?1.2:spacing,lineHeight:1.7,whiteSpace:'nowrap'}}>{children}</div>;
};

export const ChapterNumber:React.FC<{value:string;x?:number;y?:number;size?:number}>=({value,x=1510,y=114,size=T.chapter})=>{
 const t=useCurrentFrame()/useVideoConfig().fps;
 return <Svg><text x={x} y={y+size*.72} fill="none" stroke={P.ivory} strokeOpacity={.13*phase(t,.2,.7)} strokeWidth="0.75" fontFamily={T.sans} fontWeight="100" fontSize={size} letterSpacing="-10">{value}</text></Svg>;
};

export const EditorialFrame:React.FC<{index:string;section:string;note:string}>=({index,section,note})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=phase(t,.1,.65);
 return <AbsoluteFill data-layer="Layout" style={{opacity:p,pointerEvents:'none'}}>
  <MicroLabel x={D.safeX} y={D.safeY-5}>{section}</MicroLabel>
  <Svg><path d={`M${D.safeX} 155H${D.safeX+49}`} stroke={P.coral} strokeWidth="1.4" opacity="0.7"/><path d="M144 956H1776" stroke={P.ivory} strokeOpacity="0.085"/></Svg>
  <MicroLabel x={D.safeX} y={979} size={17} spacing={1.4}>{note}</MicroLabel>
  <MicroLabel x={1638} y={979} size={17} spacing={1.8}>{index} / 03</MicroLabel>
 </AbsoluteFill>;
};

export type SeriesData={name:string;values:number[];accent?:boolean};
export const ThinLineChart:React.FC<{series:SeriesData[];x?:number;y?:number;width?:number;height?:number;max?:number;start?:number}>=({series,x=780,y=290,width=940,height=470,max=100,start=.6})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=phase(t,start,1.6),id=useId().replace(/:/g,'');
 const startX=x+40,endX=x+width-25,baseY=y+height-45,topY=y+35;
 const point=(v:number,i:number,n:number)=>[startX+i/(n-1)*(endX-startX),baseY-v/max*(baseY-topY)];
 const paths=series.map(s=>s.values.map((v,i)=>{const q=point(v,i,s.values.length);return `${i?'L':'M'}${q[0]} ${q[1]}`;}).join(' '));
 const maskWidth=(endX-startX+20)*p;
 return <Svg data-layer="Motif-data">
  <defs>
   <clipPath id={`plot${id}`}><rect x={startX-8} y={topY-20} width={maskWidth} height={height+20}/></clipPath>
   <linearGradient id={`fill${id}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor={P.ice} stopOpacity="0.10"/><stop offset="1" stopColor={P.ice} stopOpacity="0"/></linearGradient>
   <filter id={`lineglow${id}`}><feGaussianBlur stdDeviation="4"/></filter>
  </defs>
  {[0,max*.25,max*.5,max*.75,max].map(v=>{const yy=point(v,0,2)[1];return <g key={v} opacity={phase(t,.2,.6)}>
   <path d={`M${startX} ${yy}H${endX}`} stroke={P.ivory} strokeOpacity={v===0?.24:.075} strokeWidth=".9"/>
   <text x={startX-24} y={yy+6} textAnchor="end" fontFamily={T.sans} fill={P.muted} fontSize="18">{v}</text>
  </g>;})}
  <path d={`M${startX} ${topY}V${baseY}`} stroke={P.ivory} strokeOpacity="0.23" strokeWidth=".9"/>
  {[0,2,4,6,8,10].map(v=><text key={v} x={startX+v/10*(endX-startX)} y={baseY+38} textAnchor="middle" fontFamily={T.sans} fontSize="18" fill={P.muted}>{v.toString().padStart(2,'0')}</text>)}
  <g clipPath={`url(#plot${id})`}>
   {series.map((s,j)=>{
    const color=s.accent?P.ice:P.muted;
    const last=point(s.values[s.values.length-1],s.values.length-1,s.values.length);
    return <g key={s.name}>
     {s.accent&&<path d={`${paths[j]} L${endX} ${baseY}L${startX} ${baseY}Z`} fill={`url(#fill${id})`}/>}
     {s.accent&&<path d={paths[j]} fill="none" stroke={color} strokeWidth="5" filter={`url(#lineglow${id})`} opacity=".28"/>}
     <path d={paths[j]} fill="none" stroke={color} strokeWidth={s.accent?1.9:1.2} strokeDasharray={s.accent?undefined:'4 7'} strokeLinejoin="round" opacity={s.accent?1:.7}/>
     {s.values.map((v,i)=>{const [xx,yy]=point(v,i,s.values.length);return <circle key={i} cx={xx} cy={yy} r={s.accent?2.6:1.7} fill={color} opacity={s.accent?.9:.6}/>;})}
     {s.accent&&<g opacity={phase(t,2.1,.5)}><circle cx={last[0]} cy={last[1]} r="7" stroke={P.ice} strokeOpacity=".25" fill="none"/><circle cx={last[0]} cy={last[1]} r="3" fill={P.ivory}/></g>}
    </g>;
   })}
  </g>
 </Svg>;
};

/** One motif, several internal states. Not a universal icon or stock particle field. */
export const AbstractConcept:React.FC<{variant?:'branch'|'threshold'|'orbit';x?:number;y?:number;accent?:Accent;spread?:number;verticalScale?:number}>=({variant='branch',x=1280,y=560,accent='coral',spread=1,verticalScale=1})=>{
 const t=useCurrentFrame()/useVideoConfig().fps,p=phase(t,.7,1.5),id=useId().replace(/:/g,'');const color=P[accent];
 return <Svg data-layer="Motif-concept">
  <defs><filter id={`glow${id}`}><feGaussianBlur stdDeviation="5"/></filter><radialGradient id={`ball${id}`} cx=".35" cy=".23"><stop stopColor={color} stopOpacity=".38"/><stop offset=".35" stopColor={P.aubergine}/><stop offset="1" stopColor={P.night}/></radialGradient></defs>
  {variant==='branch'&&<g transform={`translate(${x} ${y}) rotate(${Math.sin(t*.08)*.3}) scale(${spread} ${verticalScale})`}>
   {[-3,-2,-1,0,1,2,3].map((k,i)=>{
    const path=`M-310 90 C-170 90 -165 ${k*56} -65 ${k*62} S145 ${k*88} 320 ${k*86}`;
    return <g key={k}><path d={path} fill="none" stroke={P.muted} strokeOpacity=".22" strokeWidth="1"/><circle cx="320" cy={k*86} r="3" fill={P.muted} opacity=".4"/>
     {i===1&&<><path d={path} fill="none" stroke={color} strokeWidth="6" opacity=".19" filter={`url(#glow${id})`} pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/><path d={path} fill="none" stroke={color} strokeWidth="1.7" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/><circle cx="320" cy={k*86} r="4" fill={color} opacity={phase(t,2.2,.4)}/></>}
    </g>;
   })}
   <circle cx="-310" cy="90" r="7" fill={color} opacity=".15"/><circle cx="-310" cy="90" r="3" fill={color}/>
   <path d="M-44 -294L-32 322M-21 -294L-9 322" stroke={P.ivory} strokeOpacity=".1" strokeWidth=".65"/>
   <ellipse cx="-32" cy="16" rx="68" ry="307" fill="none" stroke={color} strokeOpacity=".12" strokeWidth=".7"/>
  </g>}
  {variant==='threshold'&&<g><ellipse cx={x} cy={y+175} rx="220" ry="38" fill={P.night} opacity=".7"/><circle cx={x} cy={y} r="175" fill={`url(#ball${id})`} stroke={color} strokeOpacity=".35" strokeWidth=".7"/><path d={`M${x-240} ${y}H${x+240}`} stroke={color} opacity=".65" strokeWidth="1" pathLength="1" strokeDasharray="1" strokeDashoffset={1-p}/></g>}
  {variant==='orbit'&&<g transform={`translate(${x} ${y}) rotate(-25)`}>{[100,170,245].map((rr,i)=><ellipse key={rr} rx={rr} ry={rr*.42} fill="none" stroke={i===1?color:P.muted} strokeOpacity={i===1?.65:.25} strokeWidth="1"/>)}<circle cx={170*Math.cos(t*.15)} cy={71.4*Math.sin(t*.15)} r="4" fill={color}/></g>}
 </Svg>;
};

/** Reusable paper object: no letters baked into its material or surface. */
export const PaperObject:React.FC=()=>{
 const t=useCurrentFrame()/useVideoConfig().fps,id=useId().replace(/:/g,'');const rise=Math.sin(t*.34)*3;
 return <Svg data-layer="Motif-object"><defs>
  <linearGradient id={`paper${id}`} x1="0" y1="0" x2="1" y2="1"><stop stopColor={P.ivory} stopOpacity=".68"/><stop offset=".37" stopColor={P.ivory} stopOpacity=".37"/><stop offset="1" stopColor={P.gold} stopOpacity=".16"/></linearGradient>
  <linearGradient id={`fold${id}`} x1="0" y1="0" x2=".9" y2="1"><stop stopColor={P.ivory} stopOpacity=".76"/><stop offset="1" stopColor={P.gold} stopOpacity=".13"/></linearGradient>
  <filter id={`shadow${id}`} x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="23"/></filter>
 </defs>
 <ellipse cx="1372" cy="817" rx="207" ry="38" fill={P.night} opacity=".95" filter={`url(#shadow${id})`}/>
 <g transform={`translate(0 ${rise}) rotate(-7 1370 550)`}>
  <path d="M1202 347L1458 304L1564 629L1299 721Z" fill={P.night} opacity=".7" transform="translate(25 38)" filter={`url(#shadow${id})`}/>
  <path d="M1202 347L1458 304L1564 629L1299 721Z" fill={`url(#paper${id})`} stroke={P.ivory} strokeOpacity=".28" strokeWidth=".9"/>
  <path d="M1202 347L1428 478L1458 304Z" fill={`url(#fold${id})`}/>
  <path d="M1428 478L1299 721L1564 629Z" fill={P.gold} opacity=".13"/>
  <path d="M1202 347L1428 478L1564 629M1428 478L1299 721" fill="none" stroke={P.ivory} strokeOpacity=".21" strokeWidth=".7"/>
  <path d="M1458 304L1564 629" stroke={P.ivory} strokeOpacity=".66" strokeWidth="1"/>
  <path d="M1210 353L1299 710" stroke={P.ivory} strokeOpacity=".2" strokeWidth=".6"/>
 </g></Svg>;
};

export const ChapterTransition:React.FC<{chapter:string;label:string;start?:number;duration?:number}>=({chapter,label,start=0,duration=1.8})=>{
 const t=useCurrentFrame()/useVideoConfig().fps-start;
 if(t<0||t>duration)return null;
 const envelope=phase(t,0,.45)*(1-phase(t,duration-.5,.5));
 return <AbsoluteFill style={{background:P.night,opacity:envelope}}>
  <ChapterNumber value={chapter} x={200} y={350} size={256}/>
  <Svg><path d={`M570 550H${570+phase(t,.25,.7)*680}`} stroke={P.coral} strokeOpacity=".55" strokeWidth="1"/></Svg>
  <SerifText lines={[{text:label}]} x={570} y={432} size={48} start={start+.22}/>
 </AbsoluteFill>;
};

export const CinematicStage:React.FC<{template:Template;accent?:Accent;dust?:'window'|'depth'|'none';lightX?:number;lightY?:number;motif:React.ReactNode;children:React.ReactNode}>=({template,accent='gold',dust='none',lightX=1360,lightY=450,motif,children})=>
 <AbsoluteFill data-style-version={STYLE_VERSION} style={{background:P.night,color:P.ivory,overflow:'hidden'}}>
  <AtmosphereBackground template={template}/>
  <DustMotes variant={dust} count={dust==='window'?36:20}/>
  <AbsoluteFill data-layer="Motif">{motif}</AbsoluteFill>
  <LightField accent={accent} x={lightX} y={lightY} window={template==='A'}/>
  <AbsoluteFill data-layer="Layout">{children}</AbsoluteFill>
 </AbsoluteFill>;
