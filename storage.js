import { PROGRESS_MODES } from "./config.js?v=5.3.0";
const KEY="taalhelden_modulair_v1";
const ENGLISH_PARTS=["words","sentences","conversations","listening","speaking","situations","roleplay","missions"];
const ENGLISH_THEMES=["kennismaken","vrienden","spelen","over-jezelf","restaurant","winkel","onderweg","vakantie","zwembad","hulp"];
const emptyProgress=()=>Object.fromEntries(PROGRESS_MODES.map(mode=>[mode,{answered:0,correct:0,sessions:0,points:0}]));
const emptyEnglish=()=>({
  favorites:[],learned:[],completedMissions:[],
  sentencePracticed:[],sentenceLegacy:Object.fromEntries(ENGLISH_THEMES.map(theme=>[theme,0])),
  progress:Object.fromEntries(ENGLISH_PARTS.map(part=>[part,{answered:0,correct:0,sessions:0,stars:0}])),
  themeProgress:Object.fromEntries(ENGLISH_THEMES.map(theme=>[theme,{answered:0,correct:0}]))
});
export function defaultState(){
  return {points:0,rewards:0,rewardProgress:0,level:1,streak:0,history:[],progress:emptyProgress(),english:emptyEnglish(),settings:{theme:"light",rate:.8,sessionLength:15}};
}
export function loadState(){
  const base=defaultState();
  try{
    const parsed=JSON.parse(localStorage.getItem(KEY)||"null");
    if(!parsed)return base;
    const english={...base.english,...(parsed.english||{})};
    english.progress=Object.fromEntries(Object.entries(base.english.progress).map(([part,value])=>[part,{...value,...(parsed.english?.progress?.[part]||{})}]));
    english.themeProgress=Object.fromEntries(Object.entries(base.english.themeProgress).map(([theme,value])=>[theme,{...value,...(parsed.english?.themeProgress?.[theme]||{})}]));
    english.favorites=Array.isArray(parsed.english?.favorites)?parsed.english.favorites:[];
    english.learned=Array.isArray(parsed.english?.learned)?parsed.english.learned:[];
    english.completedMissions=Array.isArray(parsed.english?.completedMissions)?parsed.english.completedMissions:[];
    english.sentencePracticed=Array.isArray(parsed.english?.sentencePracticed)?parsed.english.sentencePracticed:[];
    const hasSentenceTracking=Array.isArray(parsed.english?.sentencePracticed)||parsed.english?.sentenceLegacy;
    english.sentenceLegacy=Object.fromEntries(ENGLISH_THEMES.map(theme=>[
      theme,
      Number(parsed.english?.sentenceLegacy?.[theme])||(hasSentenceTracking?0:Number(parsed.english?.themeProgress?.[theme]?.answered)||0)
    ]));
    return {...base,...parsed,settings:{...base.settings,...(parsed.settings||{})},progress:{...base.progress,...(parsed.progress||{})},english};
  }catch{return base;}
}
export function saveState(state){localStorage.setItem(KEY,JSON.stringify(state));}
export function resetState(){const state=defaultState();saveState(state);return state;}
