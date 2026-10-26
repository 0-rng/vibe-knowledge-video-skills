"""Validate handoff integrity, not creativity or factual truth. Stdlib only."""
import json,sys
from pathlib import Path

def validate(d):
 errors=[]
 def need(obj,keys,where):
  for k in keys:
   if k not in obj:errors.append(f'{where}: missing {k}')
 need(d,['project','shots','events'],'root')
 if errors:return errors
 p=d['project'];need(p,['id','topic','width','height','fps','durationFrames','lockedText','scope'],'project')
 for k in ['width','height','fps','durationFrames']:
  if not isinstance(p.get(k),(int,float)) or p[k]<=0:errors.append(f'project.{k}: positive number required')
 if errors:return errors
 n=p['durationFrames'];shots={}
 for i,s in enumerate(d['shots']):
  where=f'shots[{i}]';need(s,['id','beatId','startFrame','endFrame','purpose','firstFrame','layers','expectation','actions','camera','motion','reveal','continuity','implementation','eventIds'],where)
  if any(k not in s for k in ['id','startFrame','endFrame','eventIds']):continue
  if s['id'] in shots:errors.append(f'{where}: duplicate shot id')
  shots[s['id']]=s
  if not (isinstance(s['startFrame'],int) and isinstance(s['endFrame'],int) and 0<=s['startFrame']<s['endFrame']<=n):errors.append(f'{where}: frame interval outside project')
 events={}
 for i,e in enumerate(d['events']):
  where=f'events[{i}]';need(e,['id','shotId','frame','observable','sound'],where)
  if any(k not in e for k in ['id','shotId','frame']):continue
  if e['id'] in events:errors.append(f'{where}: duplicate event id')
  events[e['id']]=e;s=shots.get(e['shotId'])
  if not s:errors.append(f'{where}: unknown shot')
  elif not isinstance(e['frame'],int) or not s['startFrame']<=e['frame']<s['endFrame']:errors.append(f'{where}: event outside shot')
 for s in shots.values():
  for eid in s['eventIds']:
   if eid not in events or events[eid]['shotId']!=s['id']:errors.append(f'{s["id"]}: unresolved event {eid}')
 for c in d.get('concepts',[]):
  ids=[q['id'] for q in c.get('candidates',[]) if 'id' in q]
  if not ids or len(set(ids))!=len(ids):errors.append('concept: nonempty distinct candidate IDs required')
  if c.get('selected') not in ids:errors.append('concept: selected candidate missing')
 return errors
if __name__=='__main__':
 d=json.loads(Path(sys.argv[1]).read_text());e=validate(d)
 if e:print('\n'.join(e));raise SystemExit(1)
 print('Handoff integrity valid; visual quality remains unverified until rendered review.')
