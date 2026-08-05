import { escapeHtml, shuffle, normalize } from "./utils.js?v=5.3.0";
import { speakEnglish } from "./speech.js?v=5.3.0";
import {
  ENGLISH_THEMES,
  ENGLISH_SENTENCES,
  ENGLISH_DIALOGUES
} from "./english-data.js?v=5.3.0";
import { ENGLISH_V5_ADVENTURES, LISTEN_AND_DO_V5 } from "./english-v5-data.js?v=5.3.0";
import {
  FULL_DIALOGUE_OVERRIDES,
  CONVERSATION_CONTINUATIONS,
  ENGLISH_V6_EXTRA_ADVENTURES,
  ENGLISH_V6_ROLEPLAYS,
  ENGLISH_V6_ROLEPLAY_TRANSLATIONS,
  ENGLISH_V6_COUNTRIES
} from "./english-v6-data.js?v=5.3.0";

const SCENES={
  kennismaken:{place:"Op de camping",art:"⛺ 🌳 🧒 👧",image:"scene-camping.webp"},vrienden:{place:"Bij de speeltuin",art:"🛝 🌤️ 👧 🧒",image:"scene-playground.webp"},
  spelen:{place:"Op het sportveld",art:"🌳 ⚽ 🥅 🧒",image:"scene-sports.webp"},"over-jezelf":{place:"Op een bankje",art:"🌴 🪑 👧 🧒",image:"scene-about.webp"},
  restaurant:{place:"In het restaurant",art:"🍽️ 🍕 🥤 👩‍🍳",image:"scene-restaurant.webp"},winkel:{place:"In een kledingwinkel",art:"👕 🛍️ 🪞 🧒",image:"scene-shop.webp"},
  onderweg:{place:"Bij de bushalte",art:"🚌 🗺️ 🏖️ 👧",image:"scene-bus.webp"},vakantie:{place:"Bij de receptie",art:"⛺ 🔑 🗺️ 👩",image:"scene-reception.webp"},
  zwembad:{place:"Bij het zwembad",art:"🏊 💦 🛟 👧",image:"scene-pool.webp"},hulp:{place:"Bij de informatiebalie",art:"🆘 ℹ️ 👧 👮",image:"scene-help.webp"}
};
const ALL_DIALOGUES=[...ENGLISH_DIALOGUES,...ENGLISH_V5_ADVENTURES,...ENGLISH_V6_EXTRA_ADVENTURES];
const MISSION_DIALOGUES=ENGLISH_V5_ADVENTURES.filter((_,index)=>index%2===1);
const CONTINUATION_BEFORE_LAST=new Set(["v5-friends-plans","v5-play-team","v5-self-family","v5-shop-souvenir","v5-travel-ticket","v5-holiday-bike","v5-pool-lifeguard"]);

const EXTRA_TURNS={
  "d-kennismaken":[
    {speaker:"Sam",line:"How long are you staying here?",prompt:"Je blijft twee weken. Wat zeg je?",options:["I am staying for two weeks.","I am nine years old.","I live near Utrecht.","I need two tickets."],correct:"I am staying for two weeks."},
    {speaker:"Sam",line:"Do you like swimming?",prompt:"Je vindt zwemmen leuk. Wat antwoord je?",options:["Yes, I love swimming!","No, I need a receipt.","The bus is over there.","It costs five euros."],correct:"Yes, I love swimming!"},
    {speaker:"Sam",line:"Shall we meet at the pool later?",prompt:"Rond het gesprek vriendelijk af.",options:["Yes, see you there!","I cannot find my room.","This shirt is too small.","The bill, please."],correct:"Yes, see you there!"}
  ],
  "d-vrienden":[
    {speaker:"Maya",line:"What time shall we meet?",prompt:"Stel twee uur voor.",options:["How about two o'clock?","I am two years old.","I need two forks.","It is the second stop."],correct:"How about two o'clock?"},
    {speaker:"Maya",line:"Great. Where shall we meet?",prompt:"Spreek af bij de glijbaan.",options:["Let's meet by the slide.","Let's order some soup.","Turn left at the station.","My room is upstairs."],correct:"Let's meet by the slide."},
    {speaker:"Maya",line:"See you this afternoon!",prompt:"Neem afscheid.",options:["See you later!","What does it cost?","Please call a doctor.","I need a smaller size."],correct:"See you later!"}
  ],
  "d-spelen":[
    {speaker:"Noah",line:"Do you know the rules?",prompt:"Je kent de regels nog niet.",options:["Not yet. Can you explain them?","Yes, I ordered the pasta.","No, the pool is closed.","My sister is seven."],correct:"Not yet. Can you explain them?"},
    {speaker:"Noah",line:"First, stand behind this line.",prompt:"Je begrijpt het niet helemaal.",options:["Can you show me, please?","Can I have the menu?","Where is my suitcase?","Do you sell postcards?"],correct:"Can you show me, please?"},
    {speaker:"Noah",line:"Like this. Now you can start!",prompt:"Laat weten dat je klaar bent.",options:["Okay, I am ready!","No, I am full.","It is too expensive.","The train leaves now."],correct:"Okay, I am ready!"}
  ],
  "d-over":[
    {speaker:"Aisha",line:"Where do you live?",prompt:"Vertel dat je bij Utrecht woont.",options:["I live near Utrecht.","I am going to the beach.","I would like some water.","It is near the station."],correct:"I live near Utrecht."},
    {speaker:"Aisha",line:"Sorry, can you say that again?",prompt:"Zeg het iets eenvoudiger opnieuw.",options:["I live in the Netherlands.","I lost my parents.","I need another towel.","I am on your team."],correct:"I live in the Netherlands."},
    {speaker:"Aisha",line:"That sounds nice!",prompt:"Stel nu zelf een vraag.",options:["Where do you live?","Where is the bill?","How much is the bus?","Which shirt is mine?"],correct:"Where do you live?"}
  ],
  "d-restaurant":[
    {speaker:"Ober",line:"The pizza comes with nuts in the salad.",prompt:"Je wilt zeggen dat je geen noten mag.",options:["I cannot eat nuts.","I cannot find my hat.","I cannot swim here.","I cannot play today."],correct:"I cannot eat nuts."},
    {speaker:"Ober",line:"No problem. I will leave them out.",prompt:"Bedank de ober.",options:["Thank you very much.","What time is the bus?","Can I try it on?","Please wait by the pool."],correct:"Thank you very much."},
    {speaker:"Ober",line:"Is everything okay?",prompt:"Het eten smaakt goed.",options:["Yes, it is delicious!","Yes, it is my suitcase.","No, I am from Utrecht.","No, this is platform six."],correct:"Yes, it is delicious!"}
  ],
  "d-winkel":[
    {speaker:"Winkelmedewerker",line:"How does it fit?",prompt:"Het shirt is te groot.",options:["It is too big.","It is too late.","It is too deep.","It is too far."],correct:"It is too big."},
    {speaker:"Winkelmedewerker",line:"Would you like a smaller size?",prompt:"Je wilt graag een kleinere maat.",options:["Yes, please.","No, I am lost.","The pool is closed.","I need a train ticket."],correct:"Yes, please."},
    {speaker:"Winkelmedewerker",line:"Here you are.",prompt:"Bedank en vraag waar je kunt betalen.",options:["Thank you. Where can I pay?","Thank you. Where can I swim?","Thank you. What team are you on?","Thank you. When does school start?"],correct:"Thank you. Where can I pay?"}
  ],
  "d-onderweg":[
    {speaker:"Chauffeur",line:"The next stop is Central Station.",prompt:"Je verstaat de chauffeur niet goed.",options:["Sorry, can you speak more slowly?","Sorry, can I order dessert?","Sorry, is this shirt blue?","Sorry, can I join the game?"],correct:"Sorry, can you speak more slowly?"},
    {speaker:"Chauffeur",line:"Of course. The beach is after Central Station.",prompt:"Controleer of de volgende halte het strand is.",options:["Is the beach the next stop?","Is the pizza ready?","Is the pool very deep?","Is this your football?"],correct:"Is the beach the next stop?"},
    {speaker:"Chauffeur",line:"Yes, this is your stop.",prompt:"Bedank en stap uit.",options:["Thank you for your help!","Please bring the bill.","I need a blue T-shirt.","My name is Liz."],correct:"Thank you for your help!"}
  ],
  "d-vakantie":[
    {speaker:"Receptionist",line:"Your camping place is number twenty-four.",prompt:"Je weet niet waar die plek is.",options:["Can you show me on the map?","Can you bring me a fork?","Can I try this on?","Can you join my team?"],correct:"Can you show me on the map?"},
    {speaker:"Receptionist",line:"It is here, next to the small playground.",prompt:"Vraag of het ver lopen is.",options:["Is it far from here?","Is it safe to swim?","Is it gluten-free?","Is it my turn?"],correct:"Is it far from here?"},
    {speaker:"Receptionist",line:"No, it is a five-minute walk.",prompt:"Rond het gesprek af.",options:["Thank you for your help.","I would like some chips.","My sister is eight.","The waves are high."],correct:"Thank you for your help."}
  ],
  "d-zwembad":[
    {speaker:"Mila",line:"The water is quite deep here.",prompt:"Je wilt liever in het ondiepe deel blijven.",options:["I would rather stay in the shallow part.","I would rather buy this shirt.","I would rather take the train.","I would rather order soup."],correct:"I would rather stay in the shallow part."},
    {speaker:"Mila",line:"No problem. Shall I wait for you?",prompt:"Je vindt dat fijn.",options:["Yes, please wait for me.","No, please bring the bill.","Yes, I need a receipt.","No, my room is upstairs."],correct:"Yes, please wait for me."},
    {speaker:"Mila",line:"Of course. Let's swim together.",prompt:"Reageer enthousiast.",options:["Great, let's go!","Great, turn left here.","Great, it costs ten euros.","Great, call my parents."],correct:"Great, let's go!"}
  ],
  "d-hulp":[
    {speaker:"Helper",line:"What do your parents look like?",prompt:"Beschrijf één van je ouders.",options:["My dad is tall and has brown hair.","My dad would like a pizza.","My dad is at platform two.","My dad likes this T-shirt."],correct:"My dad is tall and has brown hair."},
    {speaker:"Helper",line:"Where did you last see them?",prompt:"Je zag ze bij de ingang.",options:["I saw them near the entrance.","I saw a blue swimming pool.","I saw the dessert menu.","I saw bus number six."],correct:"I saw them near the entrance."},
    {speaker:"Helper",line:"Stay here. We will find them.",prompt:"Zeg dat je het begrijpt en bedank.",options:["Okay, thank you for helping me.","Okay, I need a smaller size.","Okay, the game is over.","Okay, where is the station?"],correct:"Okay, thank you for helping me."}
  ]
};

const LISTEN_DO=[
  {audio:"Tap the red T-shirt.",prompt:"Wat moet je aantikken?",options:["🔴 Rood T-shirt","🔵 Blauw T-shirt","🟢 Groene pet","🟡 Gele tas"],correct:"🔴 Rood T-shirt",theme:"winkel"},
  {audio:"The bus to the beach is number six.",prompt:"Welke bus heb je nodig?",options:["🚌 Bus 2","🚌 Bus 4","🚌 Bus 6","🚌 Bus 8"],correct:"🚌 Bus 6",theme:"onderweg"},
  {audio:"Meet me by the swimming pool.",prompt:"Waar spreken jullie af?",options:["🏊 Zwembad","🛝 Speeltuin","🍽️ Restaurant","⛺ Tent"],correct:"🏊 Zwembad",theme:"vrienden"},
  {audio:"Turn left after the restaurant.",prompt:"Welke richting ga je op?",options:["⬅️ Links","➡️ Rechts","⬆️ Rechtdoor","↩️ Terug"],correct:"⬅️ Links",theme:"onderweg"},
  {audio:"I would like water and a pizza.",prompt:"Welke bestelling klopt?",options:["🥤🍕 Water en pizza","🥛🍔 Melk en hamburger","🧃🍟 Sap en friet","☕🥗 Thee en salade"],correct:"🥤🍕 Water en pizza",theme:"restaurant"},
  {audio:"Wait next to the information desk.",prompt:"Waar moet je wachten?",options:["ℹ️ Informatiebalie","🚪 Uitgang","🚻 Toilet","🎟️ Kassa"],correct:"ℹ️ Informatiebalie",theme:"hulp"}
];

const PARTS=[
  {id:"words",icon:"📚",label:"Woorden",description:"Bestaande woorden, flitskaarten en luisteren"},
  {id:"sentences",icon:"💬",label:"Zinnen",description:"Praktische zinnen in tien thema’s"},
  {id:"conversations",icon:"🗣️",label:"Gesprekken",description:"Kies antwoorden en bouw een gesprek"},
  {id:"listening",icon:"🎧",label:"Luisteren",description:"Alleen audio, daarna snel kiezen"},
  {id:"speaking",icon:"🎤",label:"Spreken",description:"Luister, spreek na en verdien sterren"},
  {id:"situations",icon:"🎮",label:"Situaties",description:"Reageer in herkenbare vakantiesituaties"},
  {id:"roleplay",icon:"🎭",label:"Rollenspel",description:"Speel samen om de beurt een rol"},
  {id:"missions",icon:"🌍",label:"Vakantiemissie",description:"Tien missies en handige landentips"},
  {id:"progress",icon:"🏆",label:"Voortgang",description:"Scores, favorieten en medailles"}
];
const LEVEL_LABEL={gr4:"Groep 4",gr5:"Groep 5",gr6:"Groep 6",gr7:"Groep 7"};
let root=null,hooks=null,level="gr4",session=null;
let sentenceView={theme:"kennismaken",index:0};
let roleplayView={script:null,role:1,index:0};
const themeBy=id=>ENGLISH_THEMES.find(t=>t.id===id)||ENGLISH_THEMES[0];
const partBy=id=>PARTS.find(p=>p.id===id)||PARTS[0];
const learnerName=()=>level==="gr4"||level==="gr5"?"Isa":"Liz";
const flagImage=(code,alt,className="english-inline-flag")=>`<img class="${className}" src="./assets/flags/${code}.svg" alt="${escapeHtml(alt)}">`;
const randomFamilyName=()=>shuffle(["Janssen","de Groot","Smit","Bakker"])[0];
const withFamilyName=(value,name)=>String(value||"").replace(/Keiman|Janssen|de Groot|Smit|Bakker/g,name);
function personalizeEnglish(value){
  let text=String(value||"");
  if(text==="This is my younger sister and her name is Isa.")return learnerName()==="Isa"?"This is my older sister and her name is Liz.":text;
  text=text.replace(/\b(?:Isa|Liz)\b/g,learnerName());
  if(learnerName()==="Isa"){
    text=text.replace(/nine years old/gi,"seven years old")
      .replace(/one younger sister/gi,"one older sister")
      .replace(/She is younger than me\./gi,"She is older than me.")
      .replace(/She is seven years old\./gi,"She is nine years old.");
  }
  return text;
}
function personalizeDutch(value){
  const text=String(value||"");
  if(text==="Dit is mijn jongere zus en ze heet Isa.")return learnerName()==="Isa"?"Dit is mijn oudere zus en ze heet Liz.":text;
  return text.replace(/\b(?:Isa|Liz)\b/g,learnerName())
    .replace(/negen jaar oud/gi,learnerName()==="Isa"?"zeven jaar oud":"negen jaar oud");
}
const levelSentences=()=>ENGLISH_SENTENCES.map(sentence=>({...sentence,en:personalizeEnglish(sentence.en),nl:personalizeDutch(sentence.nl)}));

function balanceAnswerPositions(items){
  const queues=new Map(),lastPositions=new Map();
  return items.map(item=>{
    const options=[...(item.options||[])];
    if(!options.length||!options.includes(item.correct))return {...item,options:shuffle(options)};
    const size=options.length;
    let queue=queues.get(size);
    if(!queue?.length){
      queue=shuffle(Array.from({length:size},(_,index)=>index));
      const previous=lastPositions.get(size);
      if(size>1&&queue[0]===previous)[queue[0],queue[1]]=[queue[1],queue[0]];
      queues.set(size,queue);
    }
    const target=queue.shift();lastPositions.set(size,target);
    const arranged=shuffle(options.filter(option=>option!==item.correct));
    arranged.splice(target,0,item.correct);
    return {...item,options:arranged};
  });
}

function state(){
  const s=hooks.getState();
  s.english=s.english||{};
  s.english.favorites=Array.isArray(s.english.favorites)?s.english.favorites:[];
  s.english.learned=Array.isArray(s.english.learned)?s.english.learned:[];
  s.english.sentencePracticed=Array.isArray(s.english.sentencePracticed)?s.english.sentencePracticed:[];
  s.english.sentenceLegacy=s.english.sentenceLegacy&&typeof s.english.sentenceLegacy==="object"?s.english.sentenceLegacy:{};
  s.english.completedMissions=Array.isArray(s.english.completedMissions)?s.english.completedMissions:[];
  s.english.profile={name:learnerName(),age:"9",place:"Nederland",hobby:"zwemmen",...(s.english.profile||{})};
  s.english.profile.name=learnerName();
  s.english.daily=s.english.daily||{date:"",completed:false};
  s.english.mistakes=s.english.mistakes&&typeof s.english.mistakes==="object"?s.english.mistakes:{};
  s.english.completedAdventures=Array.isArray(s.english.completedAdventures)?s.english.completedAdventures:[];
  s.english.builderUsed=Array.isArray(s.english.builderUsed)?s.english.builderUsed:[];
  s.english.progress=s.english.progress||{};
  PARTS.filter(p=>p.id!=="progress").forEach(p=>{
    s.english.progress[p.id]={answered:0,correct:0,sessions:0,stars:0,...(s.english.progress[p.id]||{})};
  });
  s.english.themeProgress=s.english.themeProgress||{};
  ENGLISH_THEMES.forEach(t=>{
    s.english.themeProgress[t.id]={answered:0,correct:0,...(s.english.themeProgress[t.id]||{})};
  });
  return s.english;
}
const progressPercent=p=>p?.answered?Math.round((p.correct||0)/p.answered*100):0;
const sentenceThemePercent=theme=>{
  const sentences=ENGLISH_SENTENCES.filter(sentence=>sentence.theme===theme);
  if(!sentences.length)return 0;
  const ids=new Set(sentences.map(sentence=>sentence.id));
  const practised=new Set(state().sentencePracticed.filter(id=>ids.has(id))).size;
  const legacy=Math.max(0,Number(state().sentenceLegacy[theme])||0);
  return Math.round(Math.min(sentences.length,Math.max(practised,legacy))/sentences.length*100);
};
const themeCards=(action,showProgress=false)=>ENGLISH_THEMES.map(t=>{
  const pct=sentenceThemePercent(t.id);
  return `<button class="english-theme-card" data-en-action="${action}" data-theme="${t.id}" type="button">
    <span class="english-theme-icon">${t.icon}</span>
    <span><strong>${escapeHtml(t.label)}</strong><small>${escapeHtml(t.description)}</small></span>
    ${showProgress?`<b>${pct}%</b>`:""}
  </button>`;
}).join("");

function speak(text,lang="en-GB"){
  if(lang==="en-GB")return speakEnglish(text,hooks.getRate());
  if(!("speechSynthesis" in window))return false;
  speechSynthesis.cancel();
  const u=new SpeechSynthesisUtterance(String(text||""));
  u.lang=lang;u.rate=Math.max(.65,hooks.getRate()-.05);u.pitch=1;
  const voices=speechSynthesis.getVoices?.()||[];
  u.voice=voices.find(v=>String(v.lang||"").toLowerCase().startsWith(lang.toLowerCase().slice(0,2)))||null;
  speechSynthesis.speak(u);return true;
}
function toolbar(title,subtitle,back="home"){
  return `<div class="english-subheader">
    <button class="english-back" data-en-action="${back}" type="button">← Terug</button>
    <div><h3>${escapeHtml(title)}</h3><p>${escapeHtml(subtitle||"")}</p></div>
  </div>`;
}
function renderHome(){
  session=null;
  const s=state();
  const answered=Object.values(s.progress).reduce((n,p)=>n+(p.answered||0),0);
  const missions=s.completedMissions.length;
  root.innerHTML=`<section class="english-home">
    <div class="english-hero">
      <div><span class="english-kicker">Engels gebruiken</span><h2>Durf te praten op vakantie</h2>
      <p>Oefen woorden, zinnen en echte gesprekken. Zonder Engelse typopdrachten.</p></div>
    </div>
    <div class="english-quick-stats">
      <span><b>10</b> thema’s</span><span><b>${s.favorites.length}</b> favorieten</span>
      <span><b>${answered}</b> geoefend</span><span><b>${s.completedAdventures.length}</b> avonturen</span>
    </div>
    <button class="english-daily-card ${s.daily.completed&&s.daily.date===new Date().toISOString().slice(0,10)?"complete":""}" data-en-action="daily-start" type="button">
      <span>${s.daily.completed&&s.daily.date===new Date().toISOString().slice(0,10)?"✅":"🌞"}</span><div><strong>Uitdaging van vandaag</strong><small>Voer één kort vakantiegesprek</small></div><b>Start →</b>
    </button>
    <div class="english-part-grid">${PARTS.map(p=>`<button class="english-part-card" data-en-action="part" data-part="${p.id}" type="button">
      <span>${p.icon}</span><strong>${escapeHtml(p.label)}</strong><small>${escapeHtml(p.description)}</small>
    </button>`).join("")}</div>
  </section>`;
}
function renderPart(part){
  if(part==="words")return renderWordsMenu();
  if(part==="sentences")return renderSentenceThemes();
  if(part==="conversations")return renderConversations();
  if(part==="listening")return renderListeningIntro();
  if(part==="speaking")return renderSpeakingThemes();
  if(part==="situations")return renderSituationsIntro();
  if(part==="roleplay")return renderRoleplays();
  if(part==="missions")return renderMissions();
  renderEnglishProgress();
}

function renderWordsMenu(){
  const p=state().progress.words;
  root.innerHTML=toolbar("Woorden","De bestaande Engelse woorden blijven behouden.")+
  `<div class="english-choice-grid">
    <button class="english-feature-card" data-en-action="word-quiz-start" type="button"><span>🎯</span><strong>Snel oefenen</strong><small>15 meerkeuzevragen met Engelse audio</small></button>
    <button class="english-feature-card" data-en-action="word-cards-start" type="button"><span>🃏</span><strong>Flitskaarten</strong><small>25 kaarten: draaien, luisteren en slim herhalen</small></button>
  </div>
  <div class="english-note"><strong>Jouw resultaat:</strong> ${p.correct} van ${p.answered} goed · ${p.sessions} sessies</div>`;
}
function wordAudio(q){
  const match=String(q.question||"").match(/['‘’"]([^'‘’"]+)['‘’"]/);
  return /^Wat betekent/i.test(q.question||"")&&match?match[1]:String(q.correct||match?.[1]||"");
}
function startWordQuiz(){
  const source=shuffle(hooks.getWords(level)||[]).slice(0,15);
  session={kind:"words",part:"words",title:"Woorden oefenen",items:balanceAnswerPositions(source.map(q=>({
    question:q.question,options:q.options||[],correct:q.correct,audio:wordAudio(q),theme:""
  }))),index:0,score:0,answered:false,selected:-1,menu:"words"};
  renderChoiceSession();
}
function wordPairs(){
  const out=[],seen=new Set();
  for(const q of hooks.getWords(level)||[]){
    const m=String(q.question||"").match(/^Hoe zeg je ['‘’"](.+?)['‘’"] in het Engels\?$/i);
    if(!m||seen.has(String(q.correct).toLowerCase()))continue;
    seen.add(String(q.correct).toLowerCase());out.push({nl:m[1],en:String(q.correct),id:`word-${normalize(q.correct).replace(/\s+/g,"-")}`});
  }
  return shuffle(out);
}
function startWordCards(){
  session={kind:"word-cards",part:"words",title:"Engelse flitskaarten",items:wordPairs().slice(0,25),index:0,score:0,flipped:false,menu:"words"};
  renderWordCard();
}
function renderWordCard(){
  const q=session.items[session.index];
  if(!q)return finishSimple("words","Flitskaarten bekeken",session.score,session.items.length,"words");
  root.innerHTML=toolbar("Engelse flitskaarten",`${session.index+1} van ${session.items.length}`,"words")+
  `<div class="english-session-meter"><span style="width:${(session.index+1)/session.items.length*100}%"></span></div>
  <button class="english-study-card ${session.flipped?"flipped":""}" data-en-action="word-card-flip" type="button">
    <span class="english-study-inner">
      <span class="english-study-face english-study-front"><small>Nederlands</small><strong>${escapeHtml(q.nl)}</strong><em>Tik om te draaien</em></span>
      <span class="english-study-face english-study-back"><small>Engels</small><strong>${escapeHtml(q.en)}</strong><em>${session.flipped?"Tik voor Nederlands":""}</em></span>
    </span>
  </button>
  <div class="english-card-actions">
    <button class="button warning" data-en-action="speak" data-text="${escapeHtml(q.en)}" type="button">🔊 Luister</button>
    <button class="button secondary" data-en-action="word-card-rate" data-known="0" type="button">Nog oefenen</button>
    <button class="button primary" data-en-action="word-card-rate" data-known="1" type="button">Ik ken dit</button>
  </div>`;
}

function renderSentenceThemes(){
  root.innerHTML=toolbar("Zinnen","Kies een thema en oefen praktische vakantiezinnen.")+
    `<div class="english-theme-grid">${themeCards("sentence-theme",true)}</div>
    <button class="button secondary english-wide-button" data-en-action="sentence-favorites" type="button">❤️ Mijn favoriete zinnen (${state().favorites.length})</button>`;
}
function sentencesFor(theme){
  const sentences=levelSentences();
  const all=theme==="favorites"?sentences.filter(s=>state().favorites.includes(s.id)):sentences.filter(s=>s.theme===theme);
  return all;
}
function renderSentenceCard(theme,index=0){
  const list=sentencesFor(theme);
  if(!list.length){root.innerHTML=toolbar("Favorieten","Je hebt nog geen favoriete zinnen.","sentences")+`<div class="english-empty">Tik bij een zin op ❤️ om hem te bewaren.</div>`;return;}
  const safe=((index%list.length)+list.length)%list.length;
  sentenceView={theme,index:safe};const q=list[safe],fav=state().favorites.includes(q.id);
  const t=theme==="favorites"?{label:"Favoriete zinnen",icon:"❤️",description:"Jouw bewaarde zinnen"}:themeBy(theme);
  root.innerHTML=toolbar(`${t.icon} ${t.label}`,"Luister, bekijk de vertaling of oefen de zin.","sentences")+
  `<article class="english-sentence-card">
    <span class="english-level-badge">${q.difficulty===1?"Basiszin":"Langere zin"}</span>
    <p class="english-sentence-en">${escapeHtml(q.en)}</p>
    <p class="english-sentence-nl">${flagImage("nl","Nederlandse vertaling")}<span>${escapeHtml(q.nl)}</span></p>
    <div class="english-sentence-actions">
      <button class="button warning" data-en-action="speak" data-text="${escapeHtml(q.en)}" type="button">🔊 Afspelen</button>
      <button class="english-favorite ${fav?"active":""}" data-en-action="sentence-favorite" data-id="${q.id}" type="button" aria-label="Favoriet">${fav?"❤️":"♡"}</button>
    </div>
  </article>
  <div class="english-navigation">
    <button class="button secondary" data-en-action="sentence-prev" type="button">← Vorige</button>
    <button class="button primary" data-en-action="sentence-quiz-start" data-theme="${theme}" type="button">⭐ Oefenen</button>
    <button class="button secondary" data-en-action="sentence-next" type="button">Volgende →</button>
  </div>`;
}
function quizSentencePool(theme){
  const full=sentencesFor(theme);
  const basic=full.filter(s=>s.difficulty===1);
  const preferred=level==="gr4"?basic:level==="gr5"?shuffle([...basic,...full.filter(s=>s.difficulty===2).slice(0,Math.ceil(full.length/3))]):full;
  const pool=preferred.length>=15?preferred:full;
  const mistakes=state().mistakes;
  return [...pool].sort((a,b)=>(mistakes[`sentence:${b.id}`]||0)-(mistakes[`sentence:${a.id}`]||0)||Math.random()-.5).slice(0,15);
}
function startSentenceQuiz(theme){
  const pool=quizSentencePool(theme);
  const full=sentencesFor(theme);
  const items=pool.map((q,i)=>{
    const enToNl=i%2===0;
    const distractors=shuffle(full.filter(x=>x.id!==q.id)).slice(0,3);
    return {
      key:`sentence:${q.id}`,
      question:enToNl?q.en:q.nl,
      prompt:enToNl?"Wat betekent deze zin?":"Welke Engelse zin hoort hierbij?",
      options:[enToNl?q.nl:q.en,...distractors.map(x=>enToNl?x.nl:x.en)],
      correct:enToNl?q.nl:q.en,audio:enToNl?q.en:"",theme:q.theme,scene:themeBy(q.theme).icon
    };
  });
  session={kind:"sentences",part:"sentences",title:`Zinnen · ${themeBy(theme).label}`,items:balanceAnswerPositions(items),index:0,score:0,answered:false,selected:-1,menu:"sentences"};
  renderChoiceSession();
}

function renderConversations(){
  root.innerHTML=toolbar("Gesprekavonturen","Voer een compleet gesprek in een herkenbare situatie.")+
  `<div class="english-conversation-tools">
    <button class="english-builder-banner" data-en-action="profile-open" type="button"><span>🙋</span><div><strong>Praat over jezelf</strong><small>Kies je gegevens en gebruik ze in een gesprek.</small></div></button>
    <button class="english-builder-banner" data-en-action="conversation-order" type="button"><span>🧩</span><div><strong>Bouw zelf een gesprek</strong><small>Tik de losse zinnen in de goede volgorde.</small></div></button>
  </div>
  <div class="english-level-note"><b>${LEVEL_LABEL[level]}</b><span>${level==="gr4"?"Een compleet gesprek met vier duidelijke keuzes en veel Nederlandse hulp.":level==="gr5"?"Langere gesprekken met vier keuzes en herkenbare tussenstappen.":level==="gr6"?"Natuurlijke langere gesprekken met soms meerdere goede reacties.":"Langere gesprekken met minder Nederlandse hulp en meerdere goede reacties."}</span></div>
  ${ENGLISH_THEMES.map(theme=>`<section class="english-adventure-section"><h3>${theme.icon} ${escapeHtml(theme.label)}</h3><div class="english-dialogue-grid">${ALL_DIALOGUES.filter(d=>d.theme===theme.id).map(d=>`<button class="english-dialogue-card" data-en-action="dialogue-open" data-id="${d.id}" type="button">
    <span>${theme.icon}</span><strong>${escapeHtml(d.title)}</strong><small>${escapeHtml(SCENES[d.theme]?.place||d.roles.join(" & "))} · compleet gesprek</small>
  </button>`).join("")}</div></section>`).join("")}`;
}
function levelTurns(dialogue){
  const base=FULL_DIALOGUE_OVERRIDES[dialogue.id]||dialogue.turns;
  const continuation=CONVERSATION_CONTINUATIONS[dialogue.id]||[];
  const source=FULL_DIALOGUE_OVERRIDES[dialogue.id]?base:CONTINUATION_BEFORE_LAST.has(dialogue.id)?[...base.slice(0,-1),...continuation,...base.slice(-1)]:[...base,...continuation];
  return source.map((raw,index)=>{
    const item={...raw};
    const correct=personalizeEnglish(item.correct);
    const options=(item.options||[]).map(personalizeEnglish);
    const accepted=(Array.isArray(item.accepted)?item.accepted:[item.correct]).map(personalizeEnglish);
    const followUps=Object.fromEntries(Object.entries(item.followUps||{}).map(([answer,next])=>[personalizeEnglish(answer),personalizeEnglish(next)]));
    const prompt=level==="gr7"?(index%2?"How would you respond?":"Choose a natural response."):item.prompt;
    const line=personalizeEnglish(item.line);
    return {...item,line,correct,options,accepted,followUps,prompt,question:line,audio:line,theme:dialogue.theme,scene:dialogue.icon||themeBy(dialogue.theme).icon,sceneStep:index};
  });
}
function startDialogue(id,kind="dialogue"){
  const d=ALL_DIALOGUES.find(x=>x.id===id);if(!d)return;
  session={kind,part:kind==="mission"?"missions":"conversations",title:d.title,items:balanceAnswerPositions(levelTurns(d)),index:0,score:0,answered:false,selected:-1,menu:kind==="mission"?"missions":"conversations",missionId:id,adventureId:id,history:[]};
  renderChoiceSession();
}
function renderProfile(){
  const p=state().profile;
  const groups={age:["7","8","9","10","11","12"],place:["Nederland","Utrecht","Amsterdam","Rotterdam","Vleuten","een klein dorp"],hobby:["zwemmen","voetbal","lezen","buiten spelen","tekenen","dansen","gamen","hockey"]};
  root.innerHTML=toolbar("Over mij","Kies met knoppen. Je hoeft niets te typen.","conversations")+
  `<div class="english-profile-card"><div class="english-profile-name"><span>🙋</span><div><small>Je oefent als</small><strong>${learnerName()}</strong></div></div>${Object.entries(groups).map(([key,values])=>`<fieldset><legend>${{age:"Mijn leeftijd",place:"Ik kom uit",hobby:"Mijn hobby"}[key]}</legend>
  <div>${values.map(v=>`<button class="${p[key]===v?"selected":""}" data-en-action="profile-set" data-key="${key}" data-value="${escapeHtml(v)}" type="button">${escapeHtml(v)}</button>`).join("")}</div></fieldset>`).join("")}
  <button class="button primary english-wide-button" data-en-action="profile-start" type="button">Start mijn gesprek</button></div>`;
}
function startProfileDialogue(){
  const p={...state().profile,name:learnerName()},hobby={"zwemmen":"swimming","voetbal":"football","lezen":"reading","buiten spelen":"playing outside","tekenen":"drawing","dansen":"dancing","gamen":"gaming","hockey":"hockey"}[p.hobby]||"swimming";
  const place={"Nederland":"the Netherlands","een klein dorp":"a small village"}[p.place]||p.place;
  const items=[
    {speaker:"Alex",line:"Hi! What's your name?",prompt:"Stel jezelf voor.",options:[`My name is ${p.name}.`,"I need a menu.","The bus is late.","This is too big."],correct:`My name is ${p.name}.`},
    {speaker:"Alex",line:"How old are you?",prompt:"Vertel hoe oud je bent.",options:[`I am ${p.age} years old.`,"I am at the pool.","I have a ticket.","I am very hungry."],correct:`I am ${p.age} years old.`},
    {speaker:"Alex",line:"Where are you from?",prompt:"Vertel waar je vandaan komt.",options:[`I am from ${place}.`,"I am going upstairs.","I am on the blue team.","I am looking for my bag."],correct:`I am from ${place}.`},
    {speaker:"Alex",line:"Who are you travelling with?",prompt:"Vertel met wie je reist.",options:["I am travelling with my family.","I am waiting for the bus.","I am ordering some food.","I am wearing a blue shirt."],correct:"I am travelling with my family."},
    {speaker:"Alex",line:"What do you like doing?",prompt:"Vertel over je hobby.",options:[`I like ${hobby}.`,"I like platform six.","I like this receipt.","I like the changing room."],correct:`I like ${hobby}.`},
    {speaker:"Alex",line:"Why do you like that?",prompt:"Leg kort uit waarom.",options:["Because it is fun.","Because the shop is closed.","Because the train is late.","Because I need a fork."],correct:"Because it is fun."},
    {speaker:"Alex",line:"What is your favourite food?",prompt:"Vertel wat je lekker vindt.",options:["My favourite food is pizza.","My favourite colour is platform six.","My favourite food is the bus.","My favourite team is the receipt."],correct:"My favourite food is pizza."},
    {speaker:"Alex",line:"Pizza is my favourite too. What would you like to ask me?",prompt:"Stel nu zelf een vraag.",options:["What do you like doing?","Where is my suitcase?","How much is this T-shirt?","Can I have the bill?"],correct:"What do you like doing?"},
    {speaker:"Alex",line:`I like ${hobby} too! Shall we do that later?`,prompt:"Maak een afspraak.",options:["Yes, that sounds fun!","No, the bill please.","Turn right at the station.","This costs twelve euros."],correct:"Yes, that sounds fun!"},
    {speaker:"Alex",line:"Great. See you later!",prompt:"Neem afscheid.",options:["See you later!","Can I have some water?","Where are my parents?","What size is this?"],correct:"See you later!"}
  ];
  session={kind:"dialogue",part:"conversations",title:"Mijn eigen gesprek",items:balanceAnswerPositions(items.map((x,i)=>({...x,accepted:[x.correct],question:x.line,audio:x.line,theme:"over-jezelf",scene:"🙋",sceneStep:i}))),index:0,score:0,answered:false,selected:-1,menu:"conversations",history:[],adventureId:"personal-profile"};renderChoiceSession();
}
function startConversationOrder(){
  const e=state();
  if(e.builderUsed.length>=ALL_DIALOGUES.length)e.builderUsed=[];
  const available=ALL_DIALOGUES.filter(d=>!e.builderUsed.includes(d.id));
  const dialogue=shuffle(available)[0]||ALL_DIALOGUES[0];
  e.builderUsed.push(dialogue.id);hooks.onSave();
  const turnCount=level==="gr4"?3:level==="gr5"?4:5;
  const turns=levelTurns(dialogue).slice(0,turnCount);
  const script={id:`builder-${dialogue.id}`,theme:dialogue.theme,title:dialogue.title,lines:turns.flatMap(item=>[item.question,item.correct])};
  session={kind:"order",part:"conversations",script,order:[],checked:false,score:0};
  renderConversationOrder();
}
function renderConversationOrder(){
  const s=session.script;
  if(!session.shuffled)session.shuffled=shuffle(s.lines.map((line,index)=>({line,index})));
  root.innerHTML=toolbar("Bouw een gesprek",s.title,"conversations")+
  `<div class="english-order-chosen"><strong>Jouw gesprek</strong>${session.order.length?session.order.map((x,i)=>`<span>${i+1}. ${escapeHtml(x.line)}</span>`).join(""):"<em>Tik hieronder op de eerste zin.</em>"}</div>
  <div class="english-order-pool">${session.shuffled.map((x,i)=>`<button data-en-action="order-line" data-index="${i}" class="${session.order.some(o=>o.index===x.index)?"used":""}" type="button">${escapeHtml(x.line)}</button>`).join("")}</div>
  <div class="english-card-actions"><button class="button secondary" data-en-action="order-reset" type="button">Opnieuw</button>
  <button class="button primary" data-en-action="order-check" type="button" ${session.order.length!==s.lines.length?"disabled":""}>Controleer</button></div>
  ${session.checked?`<div class="english-result ${session.score?"success":"error"}">${session.score?"✅ Goed opgebouwd!":"Probeer het nog eens. Kijk goed naar vraag en antwoord."}</div>`:""}`;
}

function renderListeningIntro(){
  root.innerHTML=toolbar("Luisteren","De Engelse zin blijft verborgen. Luister en kies snel.")+
  `<div class="english-choice-grid"><div class="english-intro-card"><span>🎧</span><h3>Luister en begrijp</h3><p>Je hoort een praktische Engelse zin en kiest de Nederlandse betekenis.</p>
  <button class="button primary" data-en-action="listening-start" type="button">Start luisteren</button></div>
  <div class="english-intro-card"><span>👆</span><h3>Luister en doe</h3><p>Tik de juiste plek, richting, bus of bestelling aan.</p>
  <button class="button primary" data-en-action="listen-do-start" type="button">Start luisteractie</button></div></div>`;
}
function startListening(){
  const mistakes=state().mistakes;
  const sentences=levelSentences();
  const selected=[...sentences].sort((a,b)=>(mistakes[`sentence:${b.id}`]||0)-(mistakes[`sentence:${a.id}`]||0)||Math.random()-.5).slice(0,15);
  const items=balanceAnswerPositions(selected.map(q=>{
    const wrong=shuffle(sentences.filter(x=>x.id!==q.id&&x.theme===q.theme)).slice(0,3);
    return {key:`sentence:${q.id}`,question:"Luister naar de Engelse zin",prompt:"Welke Nederlandse zin hoorde je?",options:[q.nl,...wrong.map(x=>x.nl)],correct:q.nl,audio:q.en,theme:q.theme,scene:"🎧"};
  }));
  session={kind:"listening",part:"listening",title:"Luisteren",items,index:0,score:0,answered:false,selected:-1,menu:"listening"};
  renderChoiceSession();setTimeout(()=>speak(session.items[0].audio),80);
}
function startListenDo(){
  const pool=[...LISTEN_DO,...LISTEN_AND_DO_V5].map((q,i)=>({...q,key:`listen-do:${i}`}));
  const mistakes=state().mistakes;
  const selected=pool.sort((a,b)=>(mistakes[b.key]||0)-(mistakes[a.key]||0)||Math.random()-.5).slice(0,15);
  const items=balanceAnswerPositions(selected.map(q=>({...q,question:"Luister en voer de opdracht uit",scene:"👆"})));
  session={kind:"listen-do",part:"listening",title:"Luister en doe",items,index:0,score:0,answered:false,selected:-1,menu:"listening"};renderChoiceSession();setTimeout(()=>speak(items[0].audio),80);
}

function renderSpeakingThemes(){
  root.innerHTML=toolbar("Spreken","Kies een thema en spreek acht zinnen na.")+
  `<button class="english-builder-banner" data-en-action="shadow-start" type="button"><span>🪜</span><div><strong>Zin in stapjes</strong><small>Luister eerst naar korte stukjes en spreek daarna de hele zin.</small></div></button>
  <div class="english-theme-grid">${themeCards("speaking-start")}</div>
  <div class="english-note">De sterren laten zien hoe goed de browser de woorden herkent. Je kunt jezelf ook beoordelen.</div>`;
}
function startShadow(){
  const candidates=shuffle(levelSentences().filter(s=>s.en.split(/\s+/).length>=4&&s.en.split(/\s+/).length<=11)).slice(0,12);
  const samples=candidates.map(s=>{const words=s.en.split(/\s+/),a=Math.max(2,Math.ceil(words.length/3)),b=Math.max(a+1,Math.ceil(words.length*2/3));return {en:s.en,nl:s.nl,steps:[words.slice(0,a).join(" "),words.slice(0,b).join(" "),s.en]};});
  session={kind:"shadow",part:"speaking",title:"Zin in stapjes",items:samples,index:0,step:0,score:0,menu:"speaking"};renderShadow();
}
function renderShadow(){
  const q=session.items[session.index];if(!q)return finishSimple("speaking","Stapjesoefening afgerond",session.score,session.items.length,"speaking");
  const phrase=q.steps[session.step];
  root.innerHTML=toolbar("Zin in stapjes",`${session.index+1} van ${session.items.length}`,"speaking")+
  `<article class="english-shadow-card"><span>🪜 Stap ${session.step+1}</span><strong>${escapeHtml(phrase)}</strong><small>${session.step===q.steps.length-1?escapeHtml(q.nl):"De zin wordt steeds iets langer."}</small>
  <button class="button warning" data-en-action="speak" data-text="${escapeHtml(phrase)}" type="button">🔊 Luister</button>
  <p>Spreek dit hardop na en tik daarna op verder.</p>
  <button class="button primary english-wide-button" data-en-action="shadow-next" type="button">${session.step===q.steps.length-1?"Hele zin gelukt":"Maak de zin langer"}</button></article>`;
}
function startSpeaking(theme){
  let pool=levelSentences().filter(s=>s.theme===theme);
  if(level==="gr4")pool=pool.filter(s=>s.difficulty===1).concat(pool.filter(s=>s.difficulty===2).slice(0,3));
  session={kind:"speaking",part:"speaking",title:`Spreken · ${themeBy(theme).label}`,items:shuffle(pool).slice(0,8),index:0,score:0,answered:false,theme,stars:0,heard:""};
  renderSpeaking();
}
function renderSpeaking(){
  if(session.index>=session.items.length)return finishSimple("speaking","Spreekoefening afgerond",session.score,session.items.length,"speaking");
  const q=session.items[session.index];
  root.innerHTML=toolbar(session.title,`${session.index+1} van ${session.items.length}`,"speaking")+
  `<div class="english-session-meter"><span style="width:${(session.index+1)/session.items.length*100}%"></span></div>
  <article class="english-speaking-card">
    <span>${themeBy(q.theme).icon}</span><p class="english-sentence-en">${escapeHtml(q.en)}</p><p class="english-sentence-nl">${escapeHtml(q.nl)}</p>
    <div class="english-card-actions">
      <button class="button warning" data-en-action="speak" data-text="${escapeHtml(q.en)}" type="button">🔊 Luister</button>
      <button class="button primary" data-en-action="speaking-mic" type="button" ${session.answered?"disabled":""}>🎤 Spreek na</button>
    </div>
    <div id="english-mic-status" class="english-mic-status">${session.heard?`Ik hoorde: “${escapeHtml(session.heard)}”`:"Druk op de microfoon en spreek rustig."}</div>
    ${session.answered?`<div class="english-stars">${"⭐".repeat(session.stars)}${"☆".repeat(3-session.stars)}</div>`:
    `<div class="english-self-rate"><small>Geen microfoon of zelf beoordelen:</small>
      <button data-en-action="speaking-rate" data-stars="1" type="button">⭐ Lastig</button>
      <button data-en-action="speaking-rate" data-stars="2" type="button">⭐⭐ Bijna</button>
      <button data-en-action="speaking-rate" data-stars="3" type="button">⭐⭐⭐ Gelukt</button>
    </div>`}
  </article>
  ${session.answered?`<button class="button primary english-wide-button" data-en-action="speaking-next" type="button">${session.index===session.items.length-1?"Afronden":"Volgende zin"}</button>`:""}`;
}
function spokenScore(expected,heard){
  const clean=v=>normalize(v).replace(/[^a-z0-9\s]/g,"").replace(/\b(i am)\b/g,"im").replace(/\b(do not)\b/g,"dont");
  const a=clean(expected).split(/\s+/).filter(Boolean),b=clean(heard).split(/\s+/).filter(Boolean);
  if(!b.length)return 1;
  const overlap=a.filter(w=>b.includes(w)).length/Math.max(a.length,b.length);
  if(clean(expected)===clean(heard)||overlap>=.82)return 3;
  if(overlap>=.55)return 2;
  return 1;
}
function startRecognition(){
  const R=window.SpeechRecognition||window.webkitSpeechRecognition;
  const status=document.getElementById("english-mic-status");
  if(!R){if(status)status.textContent="De microfoonherkenning is hier niet beschikbaar. Kies zelf 1, 2 of 3 sterren.";return;}
  const rec=new R();rec.lang="en-GB";rec.interimResults=false;rec.maxAlternatives=3;
  if(status)status.textContent="Luisteren… spreek nu.";
  rec.onresult=e=>{
    const heard=e.results?.[0]?.[0]?.transcript||"";const q=session.items[session.index],stars=spokenScore(q.en,heard);
    session.heard=heard;rateSpeaking(stars);
  };
  rec.onerror=()=>{if(status)status.textContent="Ik kon je niet goed horen. Probeer opnieuw of kies zelf sterren.";};
  rec.start();
}
function rateSpeaking(stars){
  if(session.answered)return;const q=session.items[session.index];
  session.answered=true;session.stars=stars;if(stars>=2)session.score++;
  hooks.onAnswer("speaking",q.theme,stars>=2,stars);renderSpeaking();
}

function renderSituationsIntro(){
  root.innerHTML=toolbar("Situaties","Speel drie samenhangende vakantiescènes.")+
  `<div class="english-intro-card"><span>🎮</span><h3>Echte vakantiescènes</h3><p>Per scène blijven de persoon, plek en gebeurtenis hetzelfde. Zo bouw je eerst een logisch kort gesprek op voordat een nieuwe situatie begint.</p>
  <button class="button primary" data-en-action="situations-start" type="button">Start de vakantiescènes</button></div>
  <div class="english-situation-preview">${ENGLISH_THEMES.slice(0,4).map(theme=>`<span>${theme.icon} ${escapeHtml(theme.label)}</span>`).join("")}</div>`;
}
function startSituations(){
  const chosen=shuffle(ALL_DIALOGUES).slice(0,3);
  const items=chosen.flatMap((dialogue,sceneIndex)=>levelTurns(dialogue).slice(0,5).map((item,partIndex)=>({
    ...item,key:`situation:${dialogue.id}:${partIndex}`,sceneGroup:sceneIndex+1,scenePart:partIndex+1,sceneLength:5,sceneTitle:dialogue.title,sceneStart:partIndex===0
  })));
  session={kind:"situations",part:"situations",title:"Vakantiesituaties",items:balanceAnswerPositions(items),index:0,score:0,answered:false,selected:-1,menu:"situations",history:[]};
  renderChoiceSession();
}

function renderRoleplays(){
  root.innerHTML=toolbar("Rollenspel","Kies een gesprek en bepaal welke rol jij speelt.")+
  `<div class="english-dialogue-grid">${ENGLISH_V6_ROLEPLAYS.map(r=>`<button class="english-dialogue-card" data-en-action="roleplay-open" data-id="${r.id}" type="button">
    <span>${themeBy(r.theme).icon}</span><strong>${escapeHtml(r.title)}</strong><small>${escapeHtml(r.roles.join(" & "))} · compleet rollenspel</small>
  </button>`).join("")}</div>`;
}
function openRoleplay(id){
  const source=ENGLISH_V6_ROLEPLAYS.find(r=>r.id===id);if(!source)return;
  const familyName=randomFamilyName();
  const translations=ENGLISH_V6_ROLEPLAY_TRANSLATIONS[source.id]||source.lines.map(()=>"");
  const script={...source,roles:source.roles.map(role=>personalizeEnglish(role)),
    lines:source.lines.map(line=>withFamilyName(personalizeEnglish(line),familyName)),
    translations:translations.map(line=>withFamilyName(personalizeDutch(line),familyName))};
  roleplayView={script,role:null,index:0};
  root.innerHTML=toolbar("Kies jouw rol",script.title,"roleplay")+
  `<div class="english-role-choices"><button data-en-action="roleplay-role" data-role="0" type="button"><span>👤</span><strong>${escapeHtml(script.roles[0])}</strong></button>
  <button data-en-action="roleplay-role" data-role="1" type="button"><span>🧒</span><strong>${escapeHtml(script.roles[1])}</strong></button></div>`;
}
function renderRoleplay(){
  const r=roleplayView.script,line=r.lines[roleplayView.index],translation=r.translations[roleplayView.index],speaker=r.roles[roleplayView.index%2],mine=roleplayView.index%2===roleplayView.role;
  root.innerHTML=toolbar(r.title,`Beurt ${roleplayView.index+1} van ${r.lines.length}`,"roleplay")+
  `<div class="english-roleplay-stage ${mine?"my-turn":""}">
    <span>${mine?"🗣️ Jij zegt":`👂 ${escapeHtml(speaker)} zegt`}</span>
    <p>${escapeHtml(line)}</p>
    <p class="english-roleplay-translation">${flagImage("nl","Nederlandse vertaling")}<span>${escapeHtml(translation)}</span></p>
    <button class="button warning" data-en-action="speak" data-text="${escapeHtml(line)}" type="button">🔊 Luister</button>
  </div>
  <button class="button primary english-wide-button" data-en-action="roleplay-next" type="button">${roleplayView.index===r.lines.length-1?"Rollenspel afronden":"Volgende beurt"}</button>`;
}

function renderMissions(){
  const s=state(),done=s.completedMissions.length;
  root.innerHTML=toolbar("Vakantiemissie",`${done} van 10 missies voltooid`)+
  `<div class="english-mission-hero"><span>${done===10?"🏅":"🧭"}</span><div><strong>${done===10?"Vakantieheld!":"Jouw vakantie-avontuur"}</strong>
  <small>Voltooi alle gesprekken en verdien de medaille.</small></div></div>
  <div class="english-mission-grid">${MISSION_DIALOGUES.map((d,i)=>{
    const complete=s.completedMissions.includes(d.id);
    return `<button data-en-action="mission-open" data-id="${d.id}" class="${complete?"complete":""}" type="button"><span>${complete?"✅":(d.icon||themeBy(d.theme).icon)}</span><strong>Missie ${i+1}</strong><small>${escapeHtml(d.title)}</small></button>`;
  }).join("")}</div>
  <h3 class="english-map-title">🗺️ Wereldkaart</h3>
  <div class="english-country-grid">${ENGLISH_V6_COUNTRIES.map(c=>`<button data-en-action="country-open" data-id="${c.id}" type="button">${flagImage(c.code,`Vlag van ${c.name}`,"english-country-thumb")}<strong>${escapeHtml(c.name)}</strong></button>`).join("")}</div>`;
}
function renderCountry(id){
  const c=ENGLISH_V6_COUNTRIES.find(x=>x.id===id);if(!c)return;
  root.innerHTML=toolbar(c.name,"Handige woorden en zinnen die je echt kunt gebruiken.","missions")+
  `<article class="english-country-card"><div class="english-country-flag">${flagImage(c.code,`Vlag van ${c.name}`,"english-country-large-flag")}</div>
    <h3>Handige woorden</h3><ul>${c.tips.map(t=>`<li>${escapeHtml(t)}</li>`).join("")}</ul>
    <h3>Voorbeeldzinnen</h3><div class="english-country-phrases">${c.phrases.map((phrase,index)=>`<div class="english-country-phrase"><strong>${escapeHtml(phrase)}</strong>
      <button class="button warning" data-en-action="country-listen" data-id="${c.id}" data-index="${index}" type="button">🔊 Luister</button></div>`).join("")}</div>
  </article>`;
}

function renderEnglishProgress(){
  const s=state();
  root.innerHTML=toolbar("Engelse voortgang","Resultaten per onderdeel en thema.")+
  `<div class="english-progress-summary"><span><strong>${s.favorites.length}</strong> favorieten</span>
  <span><strong>${s.learned.length}</strong> woorden herkend</span>
  <span><strong>${s.completedAdventures.length}</strong> avonturen voltooid</span></div>
  <div class="english-progress-grid">${PARTS.filter(p=>p.id!=="progress").map(p=>{
    const d=s.progress[p.id],pct=progressPercent(d);
    return `<article><span>${p.icon}</span><div><strong>${escapeHtml(p.label)}</strong><small>${d.correct} van ${d.answered} goed · ${d.sessions} sessies</small>
      <div class="english-mini-meter"><b style="width:${pct}%"></b></div></div><em>${pct}%</em></article>`;
  }).join("")}</div>
  <h3>Per thema</h3><div class="english-theme-grid">${themeCards("sentence-theme",true)}</div>`;
}

function choiceBody(q){
  if(["listening","listen-do"].includes(session.kind))return `<div class="english-listen-symbol">${session.kind==="listen-do"?"👆":"🎧"}</div><h3>${escapeHtml(q.prompt)}</h3><button class="button warning" data-en-action="choice-listen" type="button">🔊 Luister opnieuw</button>`;
  if(["dialogue","mission","situations"].includes(session.kind)){
    const visual=SCENES[q.theme]||{place:themeBy(q.theme).label,art:q.scene};
    const stepLabel=session.kind==="situations"?`Situatie ${q.sceneGroup}: ${q.sceneTitle} · stap ${q.scenePart} van ${q.sceneLength}`:`Gespreksbeurt ${session.index+1}`;
    return `<div class="english-scene-illustration theme-${escapeHtml(q.theme)}">${visual.image?`<img src="./assets/english-scenes/${escapeHtml(visual.image)}" alt="Illustratie: ${escapeHtml(visual.place)}">`:""}<small>${escapeHtml(visual.place)}</small>${visual.image?"":`<div>${escapeHtml(visual.art)}</div>`}<span>${escapeHtml(stepLabel)}</span></div><div class="english-bubble"><small>${escapeHtml(q.speaker||themeBy(q.theme).label)}</small><strong>${escapeHtml(q.question)}</strong>
    <button data-en-action="choice-listen" type="button" aria-label="Luister">🔊</button></div><h3>${escapeHtml(q.prompt||"Wat zeg jij?")}</h3>`;
  }
  if(session.kind==="sentences")return `<div class="english-scene">${q.scene}</div><small>${escapeHtml(q.prompt)}</small><h3 class="english-quiz-sentence">${escapeHtml(q.question)}</h3>${q.audio?`<button class="button warning" data-en-action="choice-listen" type="button">🔊 Luister</button>`:""}`;
  return `<h3>${escapeHtml(q.question)}</h3><button class="button warning" data-en-action="choice-listen" type="button">🔊 Luister naar het Engelse woord</button>`;
}
function renderChoiceSession(){
  const q=session.items[session.index];
  if(!q)return finishChoiceSession();
  const pct=(session.index+1)/session.items.length*100;
  const accepted=Array.isArray(q.accepted)?q.accepted:[q.correct];
  const selectedValue=q.options[session.selected];
  const isCorrect=accepted.includes(selectedValue);
  const transcript=session.history?.length?`<div class="english-transcript"><strong>Jullie gesprek</strong>${session.history.slice(-6).map(h=>`<div class="${h.mine?"mine":"theirs"}"><small>${escapeHtml(h.speaker)}</small><span>${escapeHtml(h.text)}</span></div>`).join("")}</div>`:"";
  const progressLabel=session.kind==="situations"?`${LEVEL_LABEL[level]} · situatie ${q.sceneGroup} van 3 · stap ${q.scenePart} van ${q.sceneLength}`:`${LEVEL_LABEL[level]} · vraag ${session.index+1} van ${session.items.length}`;
  root.innerHTML=toolbar(session.title,progressLabel,session.menu)+
  `<div class="english-session-meter"><span style="width:${pct}%"></span></div>
  ${transcript}<article class="english-quiz-card">${choiceBody(q)}
    <div class="english-answer-grid">${q.options.map((o,i)=>{
      let cls="";if(session.answered){if(accepted.includes(o))cls="correct";else if(i===session.selected)cls="wrong";}
      return `<button class="${cls}" data-en-action="choice-option" data-index="${i}" type="button" ${session.answered?"disabled":""}><b>${String.fromCharCode(65+i)}</b><span>${escapeHtml(o)}</span></button>`;
    }).join("")}</div>
    ${session.answered?`<div class="english-result ${isCorrect?"success":"error"}">${isCorrect?(accepted.length>1?"✅ Goede keuze! Er waren meerdere natuurlijke reacties.":"✅ Goed gedaan!"):`Een passende reactie is: <strong>${escapeHtml(q.correct)}</strong>`}</div>
    <button class="button primary english-wide-button" data-en-action="choice-next" type="button">${session.index===session.items.length-1?"Afronden":"Volgende"}</button>`:""}
  </article>`;
}
function chooseOption(index){
  if(session.answered)return;const q=session.items[session.index],value=q.options[index],accepted=Array.isArray(q.accepted)?q.accepted:[q.correct],correct=accepted.includes(value);
  session.selected=index;session.answered=true;if(correct)session.score++;
  const key=q.key||`dialogue:${session.adventureId||session.title}:${session.index}`,mistakes=state().mistakes;
  if(correct)mistakes[key]=Math.max(0,(mistakes[key]||0)-1);else mistakes[key]=(mistakes[key]||0)+2;
  if(session.kind==="sentences"&&String(q.key||"").startsWith("sentence:")){
    const sentenceId=String(q.key).slice("sentence:".length),practised=state().sentencePracticed;
    if(!practised.includes(sentenceId))practised.push(sentenceId);
  }
  if(session.history){session.history.push({speaker:q.speaker||"Ander",text:q.question,mine:false},{speaker:"Jij",text:value,mine:true});}
  hooks.onSave();
  hooks.onAnswer(session.part,q.theme||"",correct,correct?3:0);renderChoiceSession();
}
function nextChoice(){
  const previous=session.items[session.index],selected=previous?.options?.[session.selected];
  session.index++;session.answered=false;session.selected=-1;
  if(session.index>=session.items.length)return finishChoiceSession();
  if(previous?.followUps?.[selected]){session.items[session.index].question=previous.followUps[selected];session.items[session.index].audio=previous.followUps[selected];}
  if(session.kind==="situations"&&session.items[session.index].sceneStart)session.history=[];
  renderChoiceSession();
  if(["listening","listen-do"].includes(session.kind))setTimeout(()=>speak(session.items[session.index].audio),80);
}
function finishChoiceSession(){
  if(session.kind==="mission"){
    const e=state();if(!e.completedMissions.includes(session.missionId)){e.completedMissions.push(session.missionId);hooks.onSave();}
  }
  if(session.daily){const e=state();e.daily={date:new Date().toISOString().slice(0,10),completed:true};hooks.onSave();}
  if(session.adventureId){const e=state();if(!e.completedAdventures.includes(session.adventureId))e.completedAdventures.push(session.adventureId);hooks.onSave();}
  finishSimple(session.part,session.kind==="mission"?"Missie voltooid":"Oefening afgerond",session.score,session.items.length,session.menu);
}
function finishSimple(part,title,score,total,menu){
  hooks.onComplete(part,score,total);
  root.innerHTML=toolbar(title,"Goed geoefend!",menu)+`<div class="english-finish"><span>${score===total?"🏆":"⭐"}</span>
    <h3>${escapeHtml(title)}</h3><p>Je behaalde <strong>${score} van ${total}</strong>.</p>
    <button class="button primary" data-en-action="${menu}" type="button">Verder met ${escapeHtml(partBy(part).label)}</button></div>`;
}

async function handleClick(event){
  const b=event.target.closest("[data-en-action]");if(!b||!root.contains(b))return;
  const action=b.dataset.enAction;
  if(action==="home")return renderHome();
  if(action==="daily-start"){
    const day=Math.floor(Date.now()/86400000),d=ALL_DIALOGUES[day%ALL_DIALOGUES.length],turns=levelTurns(d).slice(0,4);
    session={kind:"dialogue",daily:true,part:"conversations",title:"Uitdaging van vandaag",items:balanceAnswerPositions(turns),index:0,score:0,answered:false,selected:-1,menu:"home",history:[],adventureId:d.id};return renderChoiceSession();
  }
  if(action==="part")return renderPart(b.dataset.part);
  if(PARTS.some(p=>p.id===action))return renderPart(action);
  if(action==="speak"){speak(b.dataset.text||"");return;}
  if(action==="word-quiz-start")return startWordQuiz();
  if(action==="word-cards-start")return startWordCards();
  if(action==="word-card-flip"){session.flipped=!session.flipped;return renderWordCard();}
  if(action==="word-card-rate"){
    const known=b.dataset.known==="1",q=session.items[session.index];if(known){const s=state();if(!s.learned.includes(q.id))s.learned.push(q.id);}
    hooks.onAnswer("words","",known,known?3:0);session.score+=known?1:0;session.index++;session.flipped=false;hooks.onSave();return renderWordCard();
  }
  if(action==="sentence-theme")return renderSentenceCard(b.dataset.theme,0);
  if(action==="sentence-favorites")return renderSentenceCard("favorites",0);
  if(action==="sentence-prev")return renderSentenceCard(sentenceView.theme,sentenceView.index-1);
  if(action==="sentence-next")return renderSentenceCard(sentenceView.theme,sentenceView.index+1);
  if(action==="sentence-favorite"){
    const s=state(),id=b.dataset.id,index=s.favorites.indexOf(id);index>=0?s.favorites.splice(index,1):s.favorites.push(id);hooks.onSave();return renderSentenceCard(sentenceView.theme,sentenceView.index);
  }
  if(action==="sentence-quiz-start")return startSentenceQuiz(b.dataset.theme);
  if(action==="dialogue-open")return startDialogue(b.dataset.id);
  if(action==="profile-open")return renderProfile();
  if(action==="profile-set"){const s=state();s.profile[b.dataset.key]=b.dataset.value;hooks.onSave();return renderProfile();}
  if(action==="profile-start")return startProfileDialogue();
  if(action==="conversation-order")return startConversationOrder();
  if(action==="order-line"){
    const item=session.shuffled[Number(b.dataset.index)];if(!session.order.some(x=>x.index===item.index))session.order.push(item);return renderConversationOrder();
  }
  if(action==="order-reset"){session.order=[];session.checked=false;session.score=0;return renderConversationOrder();}
  if(action==="order-check"){
    if(session.checked&&session.score)return;
    session.checked=true;session.score=session.order.every((x,i)=>x.index===i)?1:0;hooks.onAnswer("conversations",session.script.theme,!!session.score,session.score?3:0);
    if(session.score)hooks.onComplete("conversations",1,1);return renderConversationOrder();
  }
  if(action==="listening-start")return startListening();
  if(action==="listen-do-start")return startListenDo();
  if(action==="shadow-start")return startShadow();
  if(action==="shadow-next"){
    const q=session.items[session.index];
    if(session.step<q.steps.length-1){session.step++;return renderShadow();}
    session.score++;hooks.onAnswer("speaking","",true,3);session.index++;session.step=0;return renderShadow();
  }
  if(action==="speaking-start")return startSpeaking(b.dataset.theme);
  if(action==="speaking-mic")return startRecognition();
  if(action==="speaking-rate")return rateSpeaking(Number(b.dataset.stars));
  if(action==="speaking-next"){session.index++;session.answered=false;session.stars=0;session.heard="";return renderSpeaking();}
  if(action==="situations-start")return startSituations();
  if(action==="roleplay-open")return openRoleplay(b.dataset.id);
  if(action==="roleplay-role"){roleplayView.role=Number(b.dataset.role);roleplayView.index=0;return renderRoleplay();}
  if(action==="roleplay-next"){
    if(roleplayView.index===roleplayView.script.lines.length-1){hooks.onComplete("roleplay",1,1);return renderRoleplays();}
    roleplayView.index++;return renderRoleplay();
  }
  if(action==="mission-open")return startDialogue(b.dataset.id,"mission");
  if(action==="country-open")return renderCountry(b.dataset.id);
  if(action==="country-listen"){const c=ENGLISH_V6_COUNTRIES.find(x=>x.id===b.dataset.id),phrase=c?.phrases?.[Number(b.dataset.index)];if(c&&phrase)speak(phrase,c.voice);return;}
  if(action==="choice-option")return chooseOption(Number(b.dataset.index));
  if(action==="choice-next")return nextChoice();
  if(action==="choice-listen")return speak(session.items[session.index].audio);
}

export const EnglishModule={
  init(options){
    hooks=options;root=typeof options.root==="string"?document.querySelector(options.root):options.root;
    if(!root)throw new Error("Engels: hoofdvenster ontbreekt.");
    root.addEventListener("click",handleClick);state();
  },
  open(newLevel){level=newLevel||"gr4";renderHome();},
  reset(){session=null;renderHome();}
};
