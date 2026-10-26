import React from 'react';
import {Composition} from 'remotion';
import {AtmosphereScene,DataScene,ConceptScene,TransitionStudy} from './Showcase';
export const Root=()=> <>
 <Composition id="Atmosphere" component={AtmosphereScene} width={1920} height={1080} fps={30} durationInFrames={150}/>
 <Composition id="Data" component={DataScene} width={1920} height={1080} fps={30} durationInFrames={150}/>
 <Composition id="Concept" component={ConceptScene} width={1920} height={1080} fps={30} durationInFrames={150}/>
 <Composition id="ChapterTransition" component={TransitionStudy} width={1920} height={1080} fps={30} durationInFrames={60}/>
</>;
