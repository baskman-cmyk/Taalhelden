// Taalhelden 5.0 – extra, doorlopende gesprekavonturen zonder typopdrachten.
const WRONG=[
  "I would like the bill, please.","Where is platform two?","This T-shirt is too small.","I am from the Netherlands.",
  "Please call my parents.","The swimming pool closes at six.","I need a clean fork.","It is my turn now.",
  "The bus is ten minutes late.","My favourite colour is blue.","I cannot eat nuts.","We are staying for two weeks."
];

function turn(speaker,line,prompt,correct,alternate="",next={}){
  const seed=[...line].reduce((n,c)=>n+c.charCodeAt(0),0)%WRONG.length;
  const wrong=[];
  for(let i=0;wrong.length<3&&i<WRONG.length;i++){
    const value=WRONG[(seed+i)%WRONG.length];
    if(value!==correct&&value!==alternate&&!wrong.includes(value))wrong.push(value);
  }
  const options=[correct,...wrong];
  if(alternate)options[3]=alternate;
  return {speaker,line,prompt,options,correct,accepted:alternate?[correct,alternate]:[correct],followUps:next};
}

const A=(id,theme,title,roles,scene,turns)=>({id,theme,title,roles,scene,turns});

export const ENGLISH_V5_ADVENTURES=[
  A("v5-meet-beach","kennismaken","Kennismaken op het strand",["Alex","Jij"],"beach",[
    turn("Alex","Hi! Is this spot free?","Kies wat in jouw situatie past.","Yes, you can sit here.","Sorry, my family is sitting here.",{"Yes, you can sit here.":"Thanks! My name is Alex. What's your name?","Sorry, my family is sitting here.":"No problem. I'm Alex, by the way. What's your name?"}),
    turn("Alex","What's your name?","Stel jezelf voor.","My name is Liz. What's your name?"),
    turn("Alex","Where are you from?","Vertel waar je vandaan komt.","I am from the Netherlands."),
    turn("Alex","Do you like building sandcastles?","Geef je eigen voorkeur.","Yes, I love it!","Not really, but I like swimming."),
    turn("Alex","Shall we do something together?","Doe een voorstel.","Let's build a big sandcastle."),
    turn("Alex","Great! Let's start.","Reageer enthousiast.","Yes, let's go!")
  ]),
  A("v5-meet-trip","kennismaken","Kennismaken tijdens een excursie",["Gidskind","Jij"],"trip",[
    turn("Maya","Hello! Are you joining the boat trip?","Je gaat ook mee.","Yes, I am."),
    turn("Maya","My name is Maya. What's your name?","Stel jezelf voor.","I am Isa. Nice to meet you."),
    turn("Maya","Have you been on a boat before?","Vertel dat dit de eerste keer is.","No, this is my first time."),
    turn("Maya","Don't worry. It is not scary.","Bedank haar.","Thanks, that is kind of you."),
    turn("Maya","Would you like to sit together?","Kies wat je wilt.","Yes, that would be nice.","Maybe later. I am sitting with my sister."),
    turn("Maya","Okay, see you on the boat!","Neem afscheid.","See you in a minute!")
  ]),
  A("v5-friends-icecream","vrienden","Samen een ijsje halen",["Vakantievriend","Jij"],"icecream",[
    turn("Sam","I am going to get an ice cream. Do you want to come?","Kies wat je wilt.","Yes, I would love to come.","Maybe later. I am not hungry."),
    turn("Sam","What flavour do you like?","Kies een smaak.","I like strawberry best."),
    turn("Sam","I like chocolate. Do you have any money?","Je hebt geld bij je.","Yes, I have some money."),
    turn("Sam","The ice-cream shop is near the entrance.","Je weet niet waar de ingang is.","Can you show me where it is?"),
    turn("Sam","Of course. Follow me.","Bedank hem.","Thank you!"),
    turn("Sam","Here we are. Which one would you like?","Bestel je ijsje.","A strawberry ice cream, please.")
  ]),
  A("v5-friends-plans","vrienden","Plannen maken voor morgen",["Mila","Jij"],"plans",[
    turn("Mila","What are you doing tomorrow?","Je hebt nog geen plannen.","I don't know yet."),
    turn("Mila","Would you like to go to the beach?","Kies wat je wilt.","Yes, that sounds great!","I would rather go to the swimming pool."),
    turn("Mila","What time shall we meet?","Stel tien uur voor.","How about ten o'clock?"),
    turn("Mila","Where shall we meet?","Kies de receptie.","Let's meet at reception."),
    turn("Mila","Should we bring something to eat?","Bied aan fruit mee te nemen.","I can bring some fruit."),
    turn("Mila","Perfect. See you tomorrow!","Neem afscheid.","See you tomorrow!")
  ]),
  A("v5-play-rules","spelen","Een nieuw spel leren",["Noah","Jij"],"game",[
    turn("Noah","Would you like to play this game with us?","Kies wat je wilt.","Yes, but I don't know the rules.","Not now, but maybe later."),
    turn("Noah","First, choose a team.","Kies zijn team.","Can I be on your team?"),
    turn("Noah","Yes. Stand behind the yellow line.","Je ziet de lijn niet.","Which line do you mean?"),
    turn("Noah","That line over there.","Vraag of hij het voordoet.","Can you show me what to do?"),
    turn("Noah","Of course. Throw the ball like this.","Je denkt dat je het begrijpt.","Okay, I understand now."),
    turn("Noah","Great. You can start!","Laat weten dat je klaar bent.","I am ready!")
  ]),
  A("v5-play-team","spelen","Een extra speler zoeken",["Teamcaptain","Jij"],"team",[
    turn("Ava","We need one more player. Can you join us?","Kies wat je wilt.","Yes, I can play.","Sorry, I have to go now."),
    turn("Ava","Which position do you like?","Je speelt graag voorin.","I like playing in front."),
    turn("Ava","Do you have sports shoes?","Je hebt alleen sandalen.","No, I only have sandals."),
    turn("Ava","That is okay. Please be careful.","Zeg dat je voorzichtig zult zijn.","Okay, I will be careful."),
    turn("Ava","The blue shirts are on your team.","Controleer je team.","Am I on the blue team?"),
    turn("Ava","Yes. The game starts now!","Moedig je team aan.","Come on, let's play!")
  ]),
  A("v5-self-school","over-jezelf","Vertellen over school",["Nieuwe vriend","Jij"],"school",[
    turn("Ben","What year are you in at school?","Vertel in welke groep je zit.","I am in year six."),
    turn("Ben","What is your favourite subject?","Kies een schoolvak.","My favourite subject is art."),
    turn("Ben","Why do you like art?","Leg kort uit waarom.","Because I like drawing."),
    turn("Ben","Is English easy for you?","Geef een eerlijk antwoord.","Sometimes, but I am still learning.","Yes, I understand quite a lot."),
    turn("Ben","Your English is very good!","Reageer op het compliment.","Thank you. That is nice of you."),
    turn("Ben","Shall we practise together?","Ga op het voorstel in.","Yes, good idea!")
  ]),
  A("v5-self-family","over-jezelf","Vertellen over je familie",["Aisha","Jij"],"family",[
    turn("Aisha","Who are you travelling with?","Vertel met wie je reist.","I am travelling with my family."),
    turn("Aisha","Do you have any brothers or sisters?","Vertel over je zus.","Yes, I have one sister."),
    turn("Aisha","Is she older or younger?","Je zus is jonger.","She is younger than me."),
    turn("Aisha","What does she like doing?","Vertel wat ze leuk vindt.","She likes swimming and drawing."),
    turn("Aisha","Would she like to play with us too?","Kies wat je denkt.","Yes, I think she would.","Maybe, I will ask her."),
    turn("Aisha","Great. Bring her with you later.","Reageer vriendelijk.","Okay, see you later!")
  ]),
  A("v5-food-icecream","restaurant","Een ijsje bestellen",["Verkoper","Jij"],"icecream-shop",[
    turn("Verkoper","Hello. What would you like?","Bestel een ijsje.","A chocolate ice cream, please."),
    turn("Verkoper","One scoop or two?","Kies één bolletje.","One scoop, please."),
    turn("Verkoper","Would you like it in a cone or a cup?","Kies een bakje.","In a cup, please."),
    turn("Verkoper","Would you like sprinkles on top?","Kies wat je wilt.","Yes, please.","No, thank you."),
    turn("Verkoper","That is three euros.","Vraag of je met een kaart kunt betalen.","Can I pay by card?"),
    turn("Verkoper","Yes, you can. Here is your ice cream.","Bedank de verkoper.","Thank you very much!")
  ]),
  A("v5-food-problem","restaurant","Iets uitleggen in een restaurant",["Ober","Jij"],"food-help",[
    turn("Ober","Are you ready to order?","Je hebt een vraag over het eten.","I have a question about the food."),
    turn("Ober","Of course. What would you like to know?","Vraag of het gerecht gluten bevat.","Does this have gluten in it?"),
    turn("Ober","Yes, it does. Would you like something else?","Je wilt graag iets anders.","Yes, what can I eat?"),
    turn("Ober","The rice and chicken are gluten-free.","Je verstaat het niet helemaal.","Sorry, can you say that again?"),
    turn("Ober","The rice and chicken are safe for you.","Bestel het gerecht.","Then I would like the rice and chicken."),
    turn("Ober","No problem. I will bring it soon.","Bedank de ober.","Thank you for helping me.")
  ]),
  A("v5-shop-souvenir","winkel","Een souvenir kopen",["Medewerker","Jij"],"souvenir",[
    turn("Medewerker","Hello. Are you looking for something?","Je zoekt een cadeautje.","Yes, I am looking for a small present."),
    turn("Medewerker","Who is it for?","Het is voor je opa.","It is for my grandfather."),
    turn("Medewerker","How about this key ring?","Vraag hoeveel die kost.","How much is it?"),
    turn("Medewerker","It is six dollars.","Je vindt dat goed.","That is fine. I will take it.","That is a bit expensive. Do you have a cheaper one?"),
    turn("Medewerker","Would you like a bag?","Je hebt geen tasje nodig.","No, thank you."),
    turn("Medewerker","Here is your receipt.","Bedank en neem afscheid.","Thank you. Goodbye!")
  ]),
  A("v5-shop-return","winkel","Iets ruilen in een winkel",["Medewerker","Jij"],"return",[
    turn("Medewerker","Hello. How can I help you?","Leg uit dat het speelgoed kapot is.","This toy is broken."),
    turn("Medewerker","I am sorry. Do you have the receipt?","Je hebt de bon bij je.","Yes, here it is."),
    turn("Medewerker","Would you like a new one or your money back?","Kies wat je wilt.","I would like a new one, please.","I would like my money back, please."),
    turn("Medewerker","That is no problem. Which colour would you like?","Kies blauw.","The blue one, please."),
    turn("Medewerker","Please wait here for a moment.","Zeg dat dat goed is.","Okay, I will wait here."),
    turn("Medewerker","Here you are. This one is new.","Bedank de medewerker.","Thank you for your help.")
  ]),
  A("v5-travel-directions","onderweg","De weg naar het station vragen",["Voorbijganger","Jij"],"directions",[
    turn("Voorbijganger","Hello. Do you need help?","Vraag waar het station is.","Yes, where is the train station?"),
    turn("Voorbijganger","Go straight and turn right at the bank.","Je verstaat de richting niet.","Sorry, can you speak more slowly?"),
    turn("Voorbijganger","Go straight. Then turn right.","Controleer de richting.","Right at the bank?"),
    turn("Voorbijganger","Yes. The station is next to the supermarket.","Vraag hoe lang het lopen is.","How long does it take to walk there?"),
    turn("Voorbijganger","It takes about ten minutes.","Vraag of je op de kaart mag kijken.","Can you show me on the map?"),
    turn("Voorbijganger","Of course. You are here.","Bedank de voorbijganger.","Thank you very much.")
  ]),
  A("v5-travel-ticket","onderweg","Een treinkaartje kopen",["Medewerker","Jij"],"ticket",[
    turn("Medewerker","Hello. Where are you travelling to?","Noem je bestemming.","I am going to the city centre."),
    turn("Medewerker","One ticket or two?","Je hebt twee kaartjes nodig.","Two tickets, please."),
    turn("Medewerker","Single or return?","Je wilt heen en terug.","Return tickets, please."),
    turn("Medewerker","The next train leaves at eleven fifteen.","Je verstaat de tijd niet.","Did you say eleven fifteen?"),
    turn("Medewerker","Yes. It leaves from platform four.","Controleer het perron.","Which platform do we need?"),
    turn("Medewerker","Platform four. Have a good trip!","Bedank de medewerker.","Thank you!")
  ]),
  A("v5-holiday-bike","vakantie","Fietsen huren",["Verhuurder","Jij"],"bike",[
    turn("Verhuurder","Hello. Would you like to rent a bike?","Je wilt twee fietsen huren.","Yes, we need two bikes."),
    turn("Verhuurder","Are they both for children?","Eén fiets is voor een volwassene.","No, one is for an adult."),
    turn("Verhuurder","How long do you need them?","Je wilt ze één dag huren.","We need them for one day."),
    turn("Verhuurder","Would you like helmets too?","Je wilt helmen.","Yes, please. We need two helmets."),
    turn("Verhuurder","Please bring the bikes back before six.","Controleer de tijd.","Before six o'clock?"),
    turn("Verhuurder","Yes. Have fun!","Bedank de verhuurder.","Thank you. We will!")
  ]),
  A("v5-holiday-room","vakantie","Een probleem met de kamer",["Receptionist","Jij"],"room",[
    turn("Receptionist","Good evening. How can I help?","Leg uit dat de sleutel niet werkt.","Our room key does not work."),
    turn("Receptionist","What is your room number?","Noem kamernummer twaalf.","We are in room twelve."),
    turn("Receptionist","Can I see the key, please?","Geef de sleutel.","Yes, here it is."),
    turn("Receptionist","I will make a new key for you.","Vraag hoe lang het duurt.","How long will it take?"),
    turn("Receptionist","Only one minute. Please wait here.","Zeg dat dat goed is.","Okay, no problem."),
    turn("Receptionist","Here is your new key.","Bedank de receptionist.","Thank you for your help.")
  ]),
  A("v5-pool-lifeguard","zwembad","Praten met de badmeester",["Badmeester","Jij"],"lifeguard",[
    turn("Badmeester","Hello. Can you swim?","Geef een eerlijk antwoord.","Yes, but I am still learning.","Not very well yet."),
    turn("Badmeester","Please stay in the shallow part.","Je weet niet waar dat is.","Where is the shallow part?"),
    turn("Badmeester","It is near the yellow flag.","Controleer welke vlag.","Do you mean that yellow flag?"),
    turn("Badmeester","Yes. Do not run beside the pool.","Zeg dat je zult lopen.","Okay, I will walk."),
    turn("Badmeester","Would you like a life jacket?","Kies wat je wilt.","Yes, please.","No, thank you. My parent is with me."),
    turn("Badmeester","Have fun and be careful!","Bedank de badmeester.","Thank you. I will!")
  ]),
  A("v5-pool-game","zwembad","Een spel doen in het zwembad",["Vakantievriend","Jij"],"pool-game",[
    turn("Luca","We are playing a water game. Do you want to join?","Kies wat je wilt.","Yes, what do I have to do?","Maybe later. I want to swim first."),
    turn("Luca","You have to bring the ball to the other side.","Je begrijpt het nog niet.","Can you show me?"),
    turn("Luca","Swim there and put the ball in the basket.","Controleer de opdracht.","In that blue basket?"),
    turn("Luca","Yes. You can swim with a partner.","Vraag of hij je partner wil zijn.","Will you be my partner?"),
    turn("Luca","Of course. Are you ready?","Laat weten dat je klaar bent.","Yes, I am ready!"),
    turn("Luca","Three, two, one, go!","Moedig jullie aan.","Come on, let's go!")
  ]),
  A("v5-help-hurt","hulp","Hulp vragen bij een val",["Helper","Jij"],"first-aid",[
    turn("Helper","Are you okay?","Je knie doet pijn.","My knee hurts."),
    turn("Helper","Can you stand up?","Je kunt niet goed staan.","No, it hurts too much."),
    turn("Helper","I will get someone to help.","Vraag of je ouder gebeld kan worden.","Can you call my parent, please?"),
    turn("Helper","Of course. What is their phone number?","Je kent het nummer niet uit je hoofd.","I don't know it by heart."),
    turn("Helper","That is okay. Is it in your bag?","Het nummer zit in je tas.","Yes, it is in my bag."),
    turn("Helper","Stay here. Help is coming.","Bedank en blijf rustig.","Okay. Thank you for staying with me.")
  ]),
  A("v5-help-lost-item","hulp","Een verloren tas zoeken",["Medewerker","Jij"],"lost-bag",[
    turn("Medewerker","Hello. What have you lost?","Je bent je rugzak kwijt.","I have lost my backpack."),
    turn("Medewerker","What colour is it?","De tas is groen.","It is green."),
    turn("Medewerker","What is inside it?","Beschrijf de inhoud.","My water bottle and hat are inside."),
    turn("Medewerker","Where did you last have it?","Je had hem bij de speeltuin.","I had it near the playground."),
    turn("Medewerker","Is this your backpack?","Controleer de tas.","Yes, that is mine!","No, mine is a darker green."),
    turn("Medewerker","Here you are. Keep it safe.","Bedank de medewerker.","Thank you so much!")
  ])
];

export const LISTEN_AND_DO_V5=[
  ["Tap the child with the red hat.","Welk kind wordt bedoeld?","🧒 Rode pet",["👧 Blauwe pet","🧒 Groene pet","👦 Geen pet"],"kennismaken"],
  ["Meet me beside the big slide.","Waar spreken jullie af?","🛝 Grote glijbaan",["🌳 Grote boom","🏊 Zwembad","⛺ Tent"],"vrienden"],
  ["Put the yellow ball in the blue basket.","Welke combinatie klopt?","🟡 Bal → 🔵 mand",["🔵 Bal → 🟡 mand","🔴 Bal → 🟢 mand","🟢 Bal → 🔴 mand"],"spelen"],
  ["Choose the girl who likes reading.","Wie wordt bedoeld?","👧📚 Leest graag",["👧🏊 Zwemt graag","🧒⚽ Voetbalt graag","🧒🎨 Tekent graag"],"over-jezelf"],
  ["I would like soup and water.","Welke bestelling klopt?","🥣 + 💧",["🍕 + 🥤","🍔 + 🧃","🥗 + 🥛"],"restaurant"],
  ["Tap the smallest blue T-shirt.","Welk shirt wordt bedoeld?","👕 Klein blauw",["👕 Groot blauw","👚 Klein rood","🧥 Blauwe jas"],"winkel"],
  ["Take bus number eight to the museum.","Welke bus neem je?","🚌 8 → museum",["🚌 6 → strand","🚌 4 → station","🚌 2 → hotel"],"onderweg"],
  ["Our tent is between the shop and the playground.","Waar staat de tent?","🛒 ⛺ 🛝",["⛺ 🛒 🛝","🛒 🛝 ⛺","🛝 ⛺ 🛒"],"vakantie"],
  ["Stay in the shallow part near the yellow flag.","Waar moet je blijven?","🟡 Ondiep water",["🔴 Diep water","🟢 Duikplank","🔵 Glijbaan"],"zwembad"],
  ["Wait next to the information desk, not at the entrance.","Waar moet je wachten?","ℹ️ Informatiebalie",["🚪 Ingang","🚻 Toilet","🎟️ Kassa"],"hulp"],
  ["First turn left, then walk straight ahead.","Welke route hoor je?","⬅️ daarna ⬆️",["➡️ daarna ⬆️","⬆️ daarna ⬅️","↩️ daarna ➡️"],"onderweg"],
  ["Bring two towels and one bottle of water.","Wat moet je meenemen?","🧺🧺 + 💧",["🧺 + 💧💧","🧺🧺 + 🥤🥤","🧢🧢 + 💧"],"zwembad"],
  ["The red suitcase belongs to the tall man.","Welke koffer hoort bij hem?","🧳 Rood",["🧳 Blauw","🎒 Groen","👜 Geel"],"hulp"],
  ["Breakfast is after swimming and before the boat trip.","Wat is de goede volgorde?","🏊 → 🍳 → 🚤",["🍳 → 🏊 → 🚤","🚤 → 🍳 → 🏊","🏊 → 🚤 → 🍳"],"vakantie"],
  ["The changing rooms are behind the shoe department.","Waar zijn de paskamers?","👟 vóór 🚪",["🚪 vóór 👟","👕 naast 🚪","🛒 achter 🚪"],"winkel"],
  ["Give the menu to the woman in the green shirt.","Wie krijgt de menukaart?","👩🟢",["👨🔵","👧🔴","🧒🟡"],"restaurant"],
  ["The football match starts at half past three.","Hoe laat begint de wedstrijd?","🕞 3:30",["🕒 3:00","🕓 4:00","🕟 4:30"],"spelen"],
  ["Maya is older than Sam but younger than Liz.","Welke volgorde is goed?","Liz → Maya → Sam",["Maya → Liz → Sam","Sam → Maya → Liz","Liz → Sam → Maya"],"over-jezelf"],
  ["Sit opposite the child with the striped shirt.","Waar ga je zitten?","↔️ Tegenover",["➡️ Ernaast","⬅️ Links ervan","⬆️ Ervoor"],"vrienden"],
  ["Walk past the café and stop at the second tent.","Waar stop je?","⛺ Tweede tent",["☕ Café","⛺ Eerste tent","⛺ Derde tent"],"kennismaken"],
  ["Choose the plate without nuts.","Welk bord kies je?","🍽️ Zonder noten",["🍽️ Met noten","🥜 Los bakje","🍰 Met noten"],"restaurant"],
  ["The train leaves before the bus arrives.","Wat gebeurt eerst?","🚆 Trein vertrekt",["🚌 Bus komt","🚆 en 🚌 tegelijk","🏖️ Strandbezoek"],"onderweg"],
  ["Put the life jacket on before you get into the boat.","Wat doe je eerst?","🦺 Reddingsvest aan",["🚤 In de boot","🏊 Zwemmen","🎒 Tas pakken"],"hulp"],
  ["Point to the room above reception.","Welke kamer wordt bedoeld?","⬆️ Boven receptie",["⬇️ Onder receptie","➡️ Naast receptie","↔️ Tegenover receptie"],"vakantie"]
].map(([audio,prompt,correct,wrong,theme])=>({audio,prompt,correct,options:[correct,...wrong],theme}));
