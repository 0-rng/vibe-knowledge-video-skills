// Original deterministic motion helpers. Seconds in; coordinates/progress out.
export type Point = {x:number;y:number};
export const clamp=(x:number,a=0,b=1)=>Math.max(a,Math.min(b,x));
export const mix=(a:number,b:number,p:number)=>a+(b-a)*p;
export function phase(t:number,start:number,end:number){if(end<=start)throw new Error('Motion interval must be positive');return clamp((t-start)/(end-start));}
export type Curve='linear'|'in'|'out'|'smooth'|'quintOut';
export function eased(p:number,curve:Curve='smooth'){
 p=clamp(p);return curve==='linear'?p:curve==='in'?p*p*p:curve==='out'?1-(1-p)**3:curve==='quintOut'?1-(1-p)**5:p*p*(3-2*p);
}
export const pose=(t:number,start:number,end:number,from:number,to:number,curve:Curve='smooth')=>mix(from,to,eased(phase(t,start,end),curve));
export function arc(a:Point,b:Point,p:number,bend:number):Point{
 const dx=b.x-a.x,dy=b.y-a.y,n=Math.hypot(dx,dy)||1,k=Math.sin(Math.PI*clamp(p))*bend;
 return{x:mix(a.x,b.x,p)-dy/n*k,y:mix(a.y,b.y,p)+dx/n*k};
}
// Analytic follow-through, not accumulated spring state. No clock or previous frame.
export function damped(age:number,amplitude:number,decay=8,hz=4){return age<0?0:amplitude*Math.exp(-decay*age)*Math.sin(2*Math.PI*hz*age);}
export function revealRect(width:number,height:number,p:number,from:'left'|'right'|'top'|'bottom'='left'){
 p=clamp(p);return from==='left'?{x:0,y:0,w:width*p,h:height}:from==='right'?{x:width*(1-p),y:0,w:width*p,h:height}:from==='top'?{x:0,y:0,w:width,h:height*p}:{x:0,y:height*(1-p),w:width,h:height*p};
}
export function staged<T>(items:T[],start:number,delay:number){return items.map((item,i)=>({item,start:start+i*delay}));}
export type MotionBeat={prepare:[number,number];act:[number,number];settle:[number,number]};
export function beatProgress(t:number,b:MotionBeat){return{prepare:phase(t,...b.prepare),act:phase(t,...b.act),settle:phase(t,...b.settle)};}
