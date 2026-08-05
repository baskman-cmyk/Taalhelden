const WRONG=[
  "I need a smaller size.","The bus leaves at five.","Where is the swimming pool?",
  "I would like some water.","My bag is blue.","It is my turn now.",
  "The restaurant is closed.","I am looking for my parents.","Can I join your team?",
  "The train is on platform four.","This costs ten euros.","I am staying for two weeks."
];

function turn(speaker,line,prompt,correct,alternate="",followUps={}){
  const seed=[...line].reduce((sum,char)=>sum+char.charCodeAt(0),0)%WRONG.length;
  const distractors=[];
  for(let i=0;distractors.length<3&&i<WRONG.length;i++){
    const value=WRONG[(seed+i)%WRONG.length];
    if(value!==correct&&value!==alternate&&!distractors.includes(value))distractors.push(value);
  }
  const options=[correct,...distractors];
  if(alternate)options[3]=alternate;
  return {speaker,line,prompt,options,correct,accepted:alternate?[correct,alternate]:[correct],followUps};
}

const T=turn;

// De oorspronkelijke korte gesprekken zijn hier volledig opnieuw geordend.
// Daardoor vormt ieder gesprek één logisch verhaal van opening tot afscheid.
export const FULL_DIALOGUE_OVERRIDES={
  "d-kennismaken":[
    T("Sam","Hi! I haven't seen you here before. What's your name?","Stel jezelf voor.","My name is Liz."),
    T("Sam","Nice to meet you. How old are you?","Vertel hoe oud je bent.","I am nine years old."),
    T("Sam","Where are you from?","Vertel waar je vandaan komt.","I am from the Netherlands."),
    T("Sam","Are you here with your family?","Vertel met wie je reist.","Yes, I am here with my family."),
    T("Sam","How long are you staying at the campsite?","Je blijft twee weken.","We are staying for two weeks."),
    T("Sam","What do you like doing on holiday?","Vertel wat je leuk vindt.","I like swimming and playing outside."),
    T("Sam","I like swimming too. Have you seen the pool?","Je hebt het zwembad nog niet gezien.","No, not yet. Where is it?"),
    T("Sam","It is behind the playground. Shall I show you?","Ga op het voorstel in.","Yes, please. That would be nice."),
    T("Sam","Shall we meet there after lunch?","Spreek af.","Yes, let's meet at the pool."),
    T("Sam","Great. See you after lunch!","Neem afscheid.","See you later!")
  ],
  "d-vrienden":[
    T("Maya","Hi! Would you like to sit with us?","Je wilt graag.","Yes, thank you!"),
    T("Maya","My name is Maya. What's your name?","Stel jezelf voor.","My name is Liz."),
    T("Maya","What are you doing this afternoon?","Vertel je plan.","I am going to the beach."),
    T("Maya","Can I come with you?","Nodig haar uit.","Yes, of course!"),
    T("Maya","What would you like to do there?","Doe een voorstel.","We could build a sandcastle."),
    T("Maya","Good idea. Shall we bring a ball too?","Kies wat je wilt.","Yes, then we can play a game.","No, let's just build a sandcastle."),
    T("Maya","What time shall we meet?","Stel twee uur voor.","How about two o'clock?"),
    T("Maya","Where shall we meet?","Spreek af bij de glijbaan.","Let's meet by the slide."),
    T("Maya","I will bring some fruit. Can you bring water?","Bied aan water mee te nemen.","Yes, I can bring some water."),
    T("Maya","Perfect. See you this afternoon!","Neem afscheid.","See you later!")
  ],
  "d-spelen":[
    T("Noah","Do you want to play football with us?","Je wilt meedoen.","Yes, I would love to."),
    T("Noah","Great! Have you played this game before?","Je hebt dit spel nog niet gespeeld.","No, this is my first time."),
    T("Noah","Do you want me to explain the rules?","Vraag om uitleg.","Yes, please explain the rules."),
    T("Noah","First, choose a team.","Kies zijn team.","Can I be on your team?"),
    T("Noah","Of course. Stand behind the yellow line.","Je ziet de lijn niet.","Which line do you mean?"),
    T("Noah","That one near the tree. Then pass the ball twice.","Controleer de opdracht.","Pass the ball twice?"),
    T("Noah","Yes. After that, you may try to score.","Vraag of hij het voordoet.","Can you show me first?"),
    T("Noah","Like this. Do you understand now?","Laat weten dat je het begrijpt.","Yes, I understand now."),
    T("Noah","Good. It is your turn.","Laat weten dat je klaar bent.","Okay, I am ready!"),
    T("Noah","Nice pass! Keep going!","Moedig het team aan.","Come on, team!")
  ],
  "d-over":[
    T("Aisha","Hi! My name is Aisha. What's your name?","Stel jezelf voor.","My name is Liz."),
    T("Aisha","Where do you live?","Vertel waar je woont.","I live in the Netherlands."),
    T("Aisha","Who are you travelling with?","Vertel met wie je reist.","I am travelling with my family."),
    T("Aisha","Do you have any brothers or sisters?","Vertel over je zus.","I have one younger sister."),
    T("Aisha","What is your favourite sport?","Vertel over je sport.","My favourite sport is hockey."),
    T("Aisha","How often do you play hockey?","Je speelt twee keer per week.","I play twice a week."),
    T("Aisha","What else do you like doing?","Vertel over andere hobby's.","I like reading and playing outside."),
    T("Aisha","What is your favourite food?","Vertel wat je lekker vindt.","My favourite food is pizza."),
    T("Aisha","That sounds good! What would you like to ask me?","Stel zelf een vraag.","What do you like doing?"),
    T("Aisha","I love drawing. Maybe we can draw together later.","Reageer enthousiast.","Yes, that sounds fun!")
  ],
  "d-restaurant":[
    T("Ober","Good evening. Do you have a table?","Je zoekt een tafel voor vier.","We need a table for four, please."),
    T("Ober","Of course. Would you like to sit inside or outside?","Kies buiten.","We would like to sit outside, please."),
    T("Ober","Here are the menus. Would you like something to drink?","Bestel water.","Some water, please."),
    T("Ober","Still or sparkling water?","Kies water zonder prik.","Still water, please."),
    T("Ober","Are you ready to order?","Vraag nog even tijd.","Could we have another minute, please?"),
    T("Ober","Of course. Do you have any questions about the menu?","Vraag of de pizza glutenvrij kan.","Can the pizza be made gluten-free?"),
    T("Ober","Yes, we have a gluten-free base.","Bestel de pizza.","Then I would like the gluten-free pizza, please."),
    T("Ober","Would you like a salad with it?","Je wilt geen salade.","No, thank you. Just the pizza."),
    T("Ober","Here is your pizza. Is everything okay?","Het eten smaakt goed.","Yes, it is delicious!"),
    T("Ober","Would you like anything else?","Vraag om nog wat water.","Could I have some more water, please?"),
    T("Ober","Of course. Would you like to see the dessert menu later?","Je zit vol.","No, thank you. I am full."),
    T("Ober","No problem. Shall I bring the bill?","Vraag om de rekening.","Yes, the bill, please.")
  ],
  "d-winkel":[
    T("Winkelmedewerker","Hello. Can I help you?","Je zoekt een blauw T-shirt.","I am looking for a blue T-shirt."),
    T("Winkelmedewerker","Is it for you?","Vertel dat het voor jou is.","Yes, it is for me."),
    T("Winkelmedewerker","What size do you need?","Je weet je maat niet.","I am not sure. Can you help me?"),
    T("Winkelmedewerker","Of course. Try this one.","Vraag waar de paskamers zijn.","Where are the changing rooms?"),
    T("Winkelmedewerker","They are at the back, on the left.","Bedank de medewerker.","Thank you. I will try it on."),
    T("Winkelmedewerker","How does it fit?","Het shirt is te groot.","It is too big."),
    T("Winkelmedewerker","Would you like a smaller size?","Je wilt een kleinere maat.","Yes, please."),
    T("Winkelmedewerker","Here you are. Is this one better?","Deze past goed.","Yes, this one fits well."),
    T("Winkelmedewerker","It costs twelve euros. Would you like it?","Je wilt het kopen.","Yes, I would like to buy it."),
    T("Winkelmedewerker","Would you like a bag?","Je hebt geen tas nodig.","No, thank you."),
    T("Winkelmedewerker","Would you like to pay by cash or card?","Kies betalen met een kaart.","By card, please."),
    T("Winkelmedewerker","Here is your receipt. Have a nice day!","Bedank en neem afscheid.","Thank you. You too!")
  ],
  "d-onderweg":[
    T("Chauffeur","Hello. Where would you like to go?","Noem je bestemming.","We would like to go to the beach."),
    T("Chauffeur","You need bus number six.","Vraag waar de bus vertrekt.","Where does bus number six leave?"),
    T("Chauffeur","It leaves from the stop across the road.","Vraag wanneer de bus komt.","What time does the next bus come?"),
    T("Chauffeur","It comes in ten minutes.","Vraag hoeveel kaartjes kosten.","How much are two tickets?"),
    T("Chauffeur","They are four euros altogether.","Vraag of je met een kaart kunt betalen.","Can we pay by card?"),
    T("Chauffeur","Yes. Please tap your card here.","Vraag waar je moet uitstappen.","Could you tell us when to get off?"),
    T("Chauffeur","The beach is the fifth stop.","Controleer het aantal haltes.","Did you say the fifth stop?"),
    T("Chauffeur","Yes. It comes after Central Station.","Je verstaat het niet goed.","Sorry, can you speak more slowly?"),
    T("Chauffeur","Of course. Central Station first, then the beach.","Laat weten dat je het begrijpt.","Okay, I understand now."),
    T("Chauffeur","This is the beach stop.","Bedank en stap uit.","Thank you for your help!")
  ],
  "d-vakantie":[
    T("Receptionist","Good afternoon. How can I help you?","Je komt inchecken.","We would like to check in, please."),
    T("Receptionist","What is your family name?","Noem de familienaam.","Our family name is Janssen."),
    T("Receptionist","You are staying for three nights. Is that correct?","Bevestig de reservering.","Yes, that is correct."),
    T("Receptionist","Your camping place is number twenty-four.","Vraag waar de plek is.","Where is number twenty-four?"),
    T("Receptionist","It is next to the small playground.","Vraag om de kaart.","Can you show me on the map?"),
    T("Receptionist","Of course. You are here, and your place is there.","Vraag of het ver lopen is.","Is it far from here?"),
    T("Receptionist","No, it is a five-minute walk.","Vraag waar het zwembad is.","Where is the swimming pool?"),
    T("Receptionist","It is behind the restaurant.","Vraag wanneer het zwembad sluit.","What time does the pool close?"),
    T("Receptionist","It closes at seven o'clock.","Vraag naar de wifi.","Is there Wi-Fi at the campsite?"),
    T("Receptionist","Yes. The password is on this card.","Bedank de receptionist.","Thank you very much for your help.")
  ],
  "d-zwembad":[
    T("Mila","Do you want to go swimming?","Je wilt graag.","Yes, let's go!"),
    T("Mila","Did you bring your towel?","Je hebt je handdoek bij je.","Yes, it is in my bag."),
    T("Mila","The water is quite deep here.","Je wilt in het ondiepe deel blijven.","I would rather stay in the shallow part."),
    T("Mila","No problem. It is near the yellow flag.","Controleer welke vlag.","Do you mean that yellow flag?"),
    T("Mila","Yes. Can you swim to the other side?","Je kunt het, maar wilt samen zwemmen.","Yes, but please swim with me."),
    T("Mila","Of course. Shall I wait for you?","Je vindt dat fijn.","Yes, please wait for me."),
    T("Mila","Would you like to play with the ball first?","Kies wat je wilt.","Yes, that sounds fun!","No, I would like to practise swimming first."),
    T("Mila","Okay. We can stay near the steps.","Vraag of je mag staan.","Can I stand there?"),
    T("Mila","Yes, the water is shallow enough.","Laat weten dat je klaar bent.","Great, I am ready!"),
    T("Mila","Let's get out and find our towels.","Rond het zwemmen af.","Okay. That was fun!")
  ],
  "d-hulp":[
    T("Helper","Are you okay?","Vertel dat je je ouders kwijt bent.","I cannot find my parents."),
    T("Helper","Don't worry. I will help you. What are their names?","Noem hun namen.","Their names are Bas and Maartje."),
    T("Helper","What do they look like?","Beschrijf één van je ouders.","My dad is tall and has brown hair."),
    T("Helper","What is your name?","Stel jezelf voor.","My name is Liz."),
    T("Helper","How old are you?","Vertel hoe oud je bent.","I am nine years old."),
    T("Helper","Where did you last see your parents?","Je zag ze bij de ingang.","I saw them near the entrance."),
    T("Helper","Were you near a shop or a restaurant?","Je was bij de souvenirwinkel.","I was near the souvenir shop."),
    T("Helper","I will call them over the loudspeaker.","Vraag of de helper bij je blijft.","Please stay with me."),
    T("Helper","Of course. You are safe here.","Bedank de helper.","Thank you for helping me."),
    T("Helper","There they are, near the entrance!","Reageer opgelucht.","I can see them. Thank you so much!")
  ]
};

export const CONVERSATION_CONTINUATIONS={
  "v5-meet-beach":[
    T("Alex","Should we make towers or a bridge?","Kies wat jullie bouwen.","Let's make two towers and a bridge."),
    T("Alex","Good idea. Can you get some water?","Bied aan water te halen.","Yes, I can get a bucket of water."),
    T("Alex","This sandcastle looks great! Can I take a picture?","Geef toestemming.","Yes, of course."),
    T("Alex","Thanks. Shall we show it to our families?","Rond het gesprek af.","Yes, let's show them!")
  ],
  "v5-meet-trip":[
    T("Maya","Would you like to sit by the window?","Kies wat je wilt.","Yes, please. I would like that.","No, thank you. You can sit there."),
    T("Maya","The guide says we may see dolphins.","Reageer enthousiast.","That would be amazing!"),
    T("Maya","Do you have a camera with you?","Je hebt een camera bij je.","Yes, I have a small camera."),
    T("Maya","Great. Let's go to the boat together.","Ga samen naar de boot.","Okay, let's go!")
  ],
  "v5-friends-icecream":[
    T("Sam","Would you like one scoop or two?","Kies één bolletje.","One scoop, please."),
    T("Sam","Do you want a cone or a cup?","Kies een hoorntje.","A cone, please."),
    T("Sam","Shall we eat our ice creams outside?","Ga op het voorstel in.","Yes, let's sit outside."),
    T("Sam","This was fun. Shall we play afterwards?","Spreek af om te spelen.","Yes, good idea!")
  ],
  "v5-friends-plans":[
    T("Mila","Should we ask your sister to come too?","Kies wat je wilt.","Yes, I will ask her.","Maybe this time we can go together."),
    T("Mila","Do we need towels for the beach?","Bevestig dat.","Yes, we should bring towels."),
    T("Mila","What will you wear if it rains?","Je neemt een jas mee.","I will bring a raincoat."),
    T("Mila","Then we are ready. See you at reception!","Neem afscheid.","See you tomorrow at ten!")
  ],
  "v5-play-rules":[
    T("Noah","Remember: the ball must stay inside the lines.","Herhaal de regel.","The ball has to stay inside the lines."),
    T("Noah","Exactly. Would you like to practise once?","Je wilt oefenen.","Yes, let's practise first."),
    T("Noah","Nice try! Do you want to start the real game?","Laat weten dat je klaar bent.","Yes, I am ready now."),
    T("Noah","Great. You are on the blue team.","Moedig je team aan.","Come on, blue team!")
  ],
  "v5-play-team":[
    T("Ava","Please stand next to Noah.","Controleer je plek.","Next to Noah?"),
    T("Ava","Yes. Pass the ball when he calls your name.","Laat weten dat je het begrijpt.","Okay, I understand."),
    T("Ava","The other team is ready. Are you?","Laat weten dat je klaar bent.","Yes, we are ready!"),
    T("Ava","Then let's begin. Good luck!","Wens iedereen succes.","Good luck, everyone!")
  ],
  "v5-self-school":[
    T("Ben","What time does your school start?","Je school begint om half negen.","School starts at half past eight."),
    T("Ben","Do you have homework every day?","Niet iedere dag.","No, not every day."),
    T("Ben","What do you do during the break?","Vertel over de pauze.","I play outside with my friends."),
    T("Ben","Your school sounds interesting. Shall we talk again tomorrow?","Spreek af voor morgen.","Yes, see you tomorrow!")
  ],
  "v5-self-family":[
    T("Aisha","How old is your sister?","Je zus is zeven.","She is seven years old."),
    T("Aisha","Does your whole family like travelling?","Vertel dat jullie reizen leuk vinden.","Yes, we all like travelling."),
    T("Aisha","Which place did you like best?","Kies een plek.","I liked the beach best."),
    T("Aisha","I would like to meet your sister later.","Spreek af.","I will introduce you to her.")
  ],
  "v5-food-icecream":[
    T("Verkoper","Here is a spoon. Would you like a napkin too?","Vraag om een servet.","Yes, please."),
    T("Verkoper","Your card payment has worked.","Vraag om het bonnetje.","Can I have the receipt, please?"),
    T("Verkoper","Of course. Is that everything?","Je hebt alles.","Yes, that is everything."),
    T("Verkoper","Enjoy your ice cream!","Bedank en neem afscheid.","Thank you. Goodbye!")
  ],
  "v5-food-problem":[
    T("Ober","Would you like something to drink with that?","Bestel water.","Some water, please."),
    T("Ober","Here is your meal. Is everything all right?","Controleer nogmaals of het veilig is.","Is this definitely gluten-free?"),
    T("Ober","Yes. It was prepared separately.","Bedank en proef het eten.","Thank you. It looks delicious."),
    T("Ober","Would you like anything else?","Vraag om de rekening.","No, thank you. The bill, please.")
  ],
  "v5-shop-souvenir":[
    T("Medewerker","Would you like me to wrap it as a present?","Laat het cadeau inpakken.","Yes, please. That would be nice."),
    T("Medewerker","Which paper would you like, blue or red?","Kies blauw papier.","The blue paper, please."),
    T("Medewerker","Would you like to pay by cash or card?","Kies betalen met een kaart.","By card, please."),
    T("Medewerker","The payment is complete. Have a nice day!","Bedank en neem afscheid.","Thank you. You too!")
  ],
  "v5-shop-return":[
    T("Medewerker","Please check that the new toy works.","Controleer het speelgoed.","Yes, this one works."),
    T("Medewerker","Would you like me to put it in a bag?","Je wilt graag een tas.","Yes, please."),
    T("Medewerker","Here is your old receipt and the new receipt.","Bedank voor de bonnetjes.","Thank you for the receipts."),
    T("Medewerker","Is there anything else I can help with?","Je hebt verder niets nodig.","No, that is all. Goodbye!")
  ],
  "v5-travel-directions":[
    T("Voorbijganger","You will see a large clock outside the station.","Controleer het herkenningspunt.","A large clock outside?"),
    T("Voorbijganger","Yes. You cannot miss it.","Vraag of je een weg moet oversteken.","Do I have to cross the road?"),
    T("Voorbijganger","Only once, at the traffic lights.","Laat weten dat je het begrijpt.","Okay, at the traffic lights."),
    T("Voorbijganger","Exactly. Have a good journey!","Bedank en neem afscheid.","Thank you. Goodbye!")
  ],
  "v5-travel-ticket":[
    T("Medewerker","The return train leaves at five thirty.","Controleer de terugreistijd.","Does the return train leave at five thirty?"),
    T("Medewerker","Yes. Keep both tickets with you.","Vraag hoeveel het kost.","How much is it altogether?"),
    T("Medewerker","It is twelve euros.","Betaal met een kaart.","Can I pay by card?"),
    T("Medewerker","Yes. Here are your tickets and receipt.","Bedank en neem afscheid.","Thank you for your help!")
  ],
  "v5-holiday-bike":[
    T("Verhuurder","These are the two bikes. Are the seats high enough?","Eén zadel is te hoog.","This seat is too high for me."),
    T("Verhuurder","I can lower it. Is this better?","Het zadel staat nu goed.","Yes, this is much better."),
    T("Verhuurder","Here is a lock and a map of the cycle paths.","Vraag welke route makkelijk is.","Which route is easy for children?"),
    T("Verhuurder","The green route is easy and safe.","Controleer de kleur.","The green route?"),
    T("Verhuurder","Yes. It takes about one hour.","Vraag wat je bij pech moet doen.","What should we do if a bike breaks down?"),
    T("Verhuurder","Call the number on the map and we will help.","Bedank en vertrek.","Thank you. We are ready to go!")
  ],
  "v5-holiday-room":[
    T("Receptionist","Please try the new key before you go upstairs.","Je probeert de sleutel.","Okay, I will try it here."),
    T("Receptionist","The green light means it works.","Het lampje wordt groen.","Yes, the light is green."),
    T("Receptionist","Is there anything else wrong with the room?","Er ontbreken handdoeken.","Yes, we need two clean towels."),
    T("Receptionist","I will send them to your room.","Vraag wanneer ze komen.","When will they arrive?"),
    T("Receptionist","In about ten minutes.","Laat weten dat dat goed is.","That is fine. Thank you."),
    T("Receptionist","You are welcome. Enjoy your stay!","Neem afscheid.","Good night!")
  ],
  "v5-pool-lifeguard":[
    T("Badmeester","The life jackets are beside the steps.","Vraag welke maat je nodig hebt.","Which size do I need?"),
    T("Badmeester","Try the yellow one first.","Je probeert het gele vest.","Okay, I will try the yellow one."),
    T("Badmeester","Does it feel comfortable?","Het vest zit goed.","Yes, it fits well."),
    T("Badmeester","Good. Stay where your parent can see you.","Beloof in de buurt te blijven.","I will stay nearby.")
  ],
  "v5-pool-game":[
    T("Luca","You go first and I will follow.","Controleer wie begint.","Do I go first?"),
    T("Luca","Yes. Remember to keep the ball above the water.","Herhaal de regel.","Keep the ball above the water."),
    T("Luca","Exactly. We reached the basket!","Reageer enthousiast.","We did it!"),
    T("Luca","Would you like to play another round?","Kies wat je wilt.","Yes, let's play again!","No, thank you. I need a rest.")
  ],
  "v5-help-hurt":[
    T("Helper","I found the phone number. I will call now.","Bedank de helper.","Thank you for calling."),
    T("Helper","Your parent is coming. Shall I get some ice for your knee?","Je wilt graag ijs.","Yes, please."),
    T("Helper","Keep the ice on your knee and do not walk yet.","Laat weten dat je blijft zitten.","Okay, I will stay here."),
    T("Helper","Your parent is here now.","Bedank de helper nogmaals.","Thank you very much for helping me.")
  ],
  "v5-help-lost-item":[
    T("Medewerker","Please check that everything is still inside.","Controleer de inhoud.","Yes, my things are all here."),
    T("Medewerker","Would you like a label for your name?","Je wilt graag een naamlabel.","Yes, that is a good idea."),
    T("Medewerker","Write your name on this label.","Je zult het label gebruiken.","Okay, I will put it on my bag."),
    T("Medewerker","Good. Try not to lose it again.","Bedank en neem afscheid.","I will. Thank you. Goodbye!")
  ]
};

export const ENGLISH_V6_EXTRA_ADVENTURES=[
  {id:"v6-meet-neighbours",theme:"kennismaken",title:"Nieuwe buren op de camping",roles:["Jamie","Jij"],turns:[
    T("Jamie","Hi! We are staying in the tent next to yours.","Begroet je nieuwe buur.","Hello! Nice to meet you."),
    T("Jamie","My name is Jamie. What's your name?","Stel jezelf voor.","My name is Liz."),
    T("Jamie","Where are you from?","Vertel waar je vandaan komt.","I am from the Netherlands."),
    T("Jamie","Is this your first day here?","Je bent gisteren aangekomen.","No, we arrived yesterday."),
    T("Jamie","Have you found the playground yet?","Je hebt hem nog niet gevonden.","No, not yet. Where is it?"),
    T("Jamie","It is behind the little shop.","Controleer of je het begrijpt.","Do you mean the shop near reception?"),
    T("Jamie","Yes, that one. I can show you later.","Ga op het aanbod in.","Yes, please. That would be helpful."),
    T("Jamie","Do you have a bike with you?","Je hebt een fiets gehuurd.","Yes, I rented one this morning."),
    T("Jamie","Great! Shall we cycle there at three?","Spreek om drie uur af.","Yes, let's meet here at three."),
    T("Jamie","Perfect. See you this afternoon!","Neem vriendelijk afscheid.","See you later!")
  ]},
  {id:"v6-friends-minidisco",theme:"vrienden",title:"Samen naar de minidisco",roles:["Olivia","Jij"],turns:[
    T("Olivia","Are you going to the mini disco tonight?","Je weet het nog niet.","I am not sure yet."),
    T("Olivia","It starts at seven near the stage.","Vraag hoe lang het duurt.","What time does it finish?"),
    T("Olivia","It finishes at eight thirty.","Vraag of zij met vrienden gaat.","Are you going with your friends?"),
    T("Olivia","Yes, but you can come with us.","Ga op de uitnodiging in.","That would be fun, thank you!"),
    T("Olivia","Do you like dancing?","Je vindt dansen leuk.","Yes, I love dancing."),
    T("Olivia","There is also a music quiz.","Reageer enthousiast.","Great! I like music quizzes too."),
    T("Olivia","Shall we meet before it starts?","Stel kwart voor zeven voor.","How about quarter to seven?"),
    T("Olivia","Good idea. Where shall we meet?","Kies de ingang.","Let's meet by the entrance."),
    T("Olivia","Will your sister come too?","Je gaat het haar vragen.","Maybe. I will ask her."),
    T("Olivia","Okay. See you tonight!","Neem afscheid.","See you at quarter to seven!")
  ]},
  {id:"v6-play-minigolf",theme:"spelen",title:"Een ronde minigolf spelen",roles:["Ethan","Jij"],turns:[
    T("Ethan","Would you like to play mini golf with us?","Je wilt graag meedoen.","Yes, I would love to."),
    T("Ethan","Have you played before?","Je hebt het één keer gedaan.","Yes, but only once."),
    T("Ethan","Choose a club and a ball.","Vraag welke club je nodig hebt.","Which club should I take?"),
    T("Ethan","Try this shorter one.","Vraag om de blauwe bal.","Can I use the blue ball?"),
    T("Ethan","Of course. You can go first.","Je wilt liever dat hij begint.","Could you go first and show me?"),
    T("Ethan","Sure. Try to hit the ball gently.","Herhaal de tip.","Okay, I will hit it gently."),
    T("Ethan","Nice shot! How many hits was that?","Het waren er drie.","That was three hits."),
    T("Ethan","Write down three points.","Vraag waar het scorekaartje is.","Where is the scorecard?"),
    T("Ethan","Here it is. Ready for the next hole?","Je bent klaar.","Yes, I am ready."),
    T("Ethan","Great. It is your turn again.","Begin de volgende ronde.","Okay, let's keep playing!")
  ]},
  {id:"v6-self-pets",theme:"over-jezelf",title:"Vertellen over thuis en huisdieren",roles:["Ruby","Jij"],turns:[
    T("Ruby","What is your home town like?","Vertel dat je in een rustige plaats woont.","I live in a quiet town."),
    T("Ruby","Do you live in a house or a flat?","Je woont in een huis.","I live in a house."),
    T("Ruby","Do you have a garden?","Je hebt een kleine tuin.","Yes, we have a small garden."),
    T("Ruby","Have you got any pets?","Je hebt een hond.","Yes, I have a dog."),
    T("Ruby","What is your dog's name?","Je hond heet Max.","My dog's name is Max."),
    T("Ruby","What does Max look like?","Max is klein en bruin.","He is small and brown."),
    T("Ruby","What do you like doing together?","Je wandelt graag met hem.","I like going for walks with him."),
    T("Ruby","Who looks after him while you are away?","Je opa en oma passen op.","My grandparents look after him."),
    T("Ruby","Do you miss him?","Je mist hem een beetje.","Yes, I miss him a little."),
    T("Ruby","I understand. I miss my cat too.","Reageer vriendelijk.","Maybe we can show each other pictures later.")
  ]},
  {id:"v6-restaurant-breakfast",theme:"restaurant",title:"Ontbijten in het hotel",roles:["Medewerker","Jij"],turns:[
    T("Medewerker","Good morning. What is your room number?","Je kamer is nummer twaalf.","We are in room twelve."),
    T("Medewerker","Thank you. You can choose a table.","Vraag of je buiten mag zitten.","Can we sit outside, please?"),
    T("Medewerker","Yes. Would you like tea or juice?","Bestel sinaasappelsap.","Orange juice, please."),
    T("Medewerker","The glasses are beside the fruit.","Je kunt de glazen niet vinden.","Sorry, where is the fruit?"),
    T("Medewerker","It is on the table near the window.","Bedank de medewerker.","Thank you. I can see it now."),
    T("Medewerker","Would you like some toast?","Je wilt graag twee sneetjes.","Yes, two slices, please."),
    T("Medewerker","White or brown bread?","Kies bruin brood.","Brown bread, please."),
    T("Medewerker","Would you like butter or jam?","Kies aardbeienjam.","Strawberry jam, please."),
    T("Medewerker","Is there anything else you need?","Vraag om een lepel.","Could I have a spoon, please?"),
    T("Medewerker","Of course. Enjoy your breakfast!","Bedank en sluit af.","Thank you very much!")
  ]},
  {id:"v6-shop-sunscreen",theme:"winkel",title:"Zonnebrand en een zonnebril kopen",roles:["Winkelmedewerker","Jij"],turns:[
    T("Winkelmedewerker","Hello. Can I help you find something?","Je zoekt zonnebrand.","Yes, I am looking for sunscreen."),
    T("Winkelmedewerker","Do you need it for children?","Je zoekt zonnebrand voor kinderen.","Yes, it is for children."),
    T("Winkelmedewerker","This one is factor fifty.","Vraag hoeveel het kost.","How much does it cost?"),
    T("Winkelmedewerker","It is twelve euros.","Vraag of er een kleinere fles is.","Do you have a smaller bottle?"),
    T("Winkelmedewerker","Yes, this bottle is eight euros.","Kies de kleine fles.","I will take the small bottle, please."),
    T("Winkelmedewerker","Do you need anything else?","Je zoekt ook een zonnebril.","Yes, I also need sunglasses."),
    T("Winkelmedewerker","The children's sunglasses are over here.","Vraag of je de blauwe mag passen.","Can I try on the blue pair?"),
    T("Winkelmedewerker","Of course. Do they fit?","Ze zitten goed.","Yes, they fit well."),
    T("Winkelmedewerker","Would you like to buy them too?","Je wilt ze ook kopen.","Yes, I will take them too."),
    T("Winkelmedewerker","That is fifteen euros altogether.","Vraag of je met een kaart mag betalen.","Can I pay by card, please?")
  ]},
  {id:"v6-travel-shuttle",theme:"onderweg",title:"De pendelbus naar het vliegveld",roles:["Hotelmedewerker","Jij"],turns:[
    T("Hotelmedewerker","Hello. Where do you need to go?","Je moet naar het vliegveld.","We need to go to the airport."),
    T("Hotelmedewerker","You can take the hotel shuttle.","Vraag waar die vertrekt.","Where does the shuttle leave?"),
    T("Hotelmedewerker","It leaves from the main entrance.","Vraag hoe laat hij vertrekt.","What time does it leave?"),
    T("Hotelmedewerker","The next shuttle leaves at ten thirty.","Vraag hoe lang de rit duurt.","How long does the journey take?"),
    T("Hotelmedewerker","It takes about twenty minutes.","Vraag of je moet reserveren.","Do we need to book seats?"),
    T("Hotelmedewerker","Yes. How many people are travelling?","Jullie reizen met vier personen.","There are four of us."),
    T("Hotelmedewerker","Do you have much luggage?","Jullie hebben twee koffers.","We have two suitcases."),
    T("Hotelmedewerker","That is fine. Please be there ten minutes early.","Controleer de tijd.","So we should be there at ten twenty?"),
    T("Hotelmedewerker","Yes, exactly. I will book four seats.","Bedank de medewerker.","Thank you for arranging that."),
    T("Hotelmedewerker","You're welcome. Have a good journey!","Neem afscheid.","Thank you. Goodbye!")
  ]},
  {id:"v6-holiday-excursion",theme:"vakantie",title:"Een boottocht reserveren",roles:["Receptionist","Jij"],turns:[
    T("Receptionist","Good morning. How can I help?","Je wilt informatie over de boottocht.","I would like information about the boat trip."),
    T("Receptionist","It visits three small islands.","Vraag hoe laat de tocht begint.","What time does it start?"),
    T("Receptionist","It starts at nine in the morning.","Vraag hoe laat je terug bent.","What time do we come back?"),
    T("Receptionist","You will be back at four o'clock.","Vraag of lunch is inbegrepen.","Is lunch included?"),
    T("Receptionist","Yes, lunch and drinks are included.","Vraag of je kunt zwemmen.","Can we swim during the trip?"),
    T("Receptionist","Yes, so bring your swimming things.","Vraag of je een handdoek nodig hebt.","Do we need to bring towels?"),
    T("Receptionist","Yes, please bring your own towels.","Vraag wat het voor kinderen kost.","How much is it for children?"),
    T("Receptionist","It is twenty euros per child.","Boek voor twee kinderen.","We would like two children's tickets, please."),
    T("Receptionist","Certainly. What is your family name?","Noem de familienaam.","Our family name is Janssen."),
    T("Receptionist","You are booked. Please be here at eight forty-five.","Bedank en bevestig de tijd.","Thank you. We will be here at eight forty-five.")
  ]},
  {id:"v6-pool-slide",theme:"zwembad",title:"Van de waterglijbaan",roles:["Badmeester","Jij"],turns:[
    T("Badmeester","Hello. Would you like to use the water slide?","Je wilt graag.","Yes, please."),
    T("Badmeester","Can you swim without help?","Je kunt zelf zwemmen.","Yes, I can swim by myself."),
    T("Badmeester","Good. Please leave your goggles here.","Vraag waarom dat moet.","Why do I have to leave them here?"),
    T("Badmeester","They could fall off on the slide.","Laat weten dat je het begrijpt.","Okay, I understand."),
    T("Badmeester","Wait until the green light comes on.","Controleer de regel.","Do I go when the light is green?"),
    T("Badmeester","Yes. Sit down and keep your feet first.","Herhaal wat je moet doen.","I should sit down with my feet first."),
    T("Badmeester","Exactly. Do not stand up on the slide.","Beloof dat je blijft zitten.","I will stay seated."),
    T("Badmeester","The pool at the bottom is quite deep.","Vraag waar je eruit moet.","Where should I get out?"),
    T("Badmeester","Use the steps on the left.","Laat weten dat je klaar bent.","Okay, I am ready now."),
    T("Badmeester","The light is green. Have fun!","Reageer enthousiast.","Thank you. Here I go!")
  ]},
  {id:"v6-help-pharmacy",theme:"hulp",title:"Hulp vragen bij de apotheek",roles:["Apotheker","Jij"],turns:[
    T("Apotheker","Hello. How can I help you?","Je hebt veel jeuk van muggenbeten.","I have itchy mosquito bites."),
    T("Apotheker","Where are the bites?","Ze zitten op je armen.","They are on my arms."),
    T("Apotheker","Are they painful too?","Ze doen geen pijn.","No, they are not painful."),
    T("Apotheker","Do you feel ill or have a fever?","Je voelt je verder goed.","No, I feel fine."),
    T("Apotheker","This cooling gel should help.","Vraag hoe je hem gebruikt.","How should I use it?"),
    T("Apotheker","Put a little gel on each bite.","Vraag hoe vaak dat mag.","How often can I use it?"),
    T("Apotheker","You can use it three times a day.","Controleer of je het ook vanavond mag gebruiken.","Can I use it again this evening?"),
    T("Apotheker","Yes. Stop using it if your skin hurts.","Laat weten dat je het begrijpt.","Okay, I understand."),
    T("Apotheker","Would you also like mosquito spray?","Je hebt al muggenspray.","No, thank you. We already have some."),
    T("Apotheker","All right. I hope you feel better soon.","Bedank en neem afscheid.","Thank you for your help. Goodbye!")
  ]}
];

export const ENGLISH_V6_ROLEPLAYS=[
  {id:"r-kennismaken",theme:"kennismaken",title:"Kennismaken op de camping",roles:["Nieuw kind","Jij"],lines:["Hello! I haven't seen you here before.","Hi! We arrived yesterday.","What's your name?","My name is Liz. What's your name?","My name is Sam. How old are you?","I am nine years old.","Where are you from?","I am from the Netherlands.","What do you like doing?","I like swimming and playing outside.","Shall we go to the pool later?","Yes, that sounds fun!"]},
  {id:"r-vrienden",theme:"vrienden",title:"Afspreken met een vakantievriend",roles:["Vakantievriend","Jij"],lines:["What are you doing this afternoon?","I am going to the beach.","Can I come with you?","Yes, of course!","What would you like to do there?","We could build a sandcastle.","Shall we bring a ball too?","Yes, good idea.","What time shall we meet?","How about two o'clock?","Let's meet by the playground.","Okay, see you there!"]},
  {id:"r-spelen",theme:"spelen",title:"Een nieuw spel leren",roles:["Speler","Jij"],lines:["Do you want to play with us?","Yes, please!","Have you played this game before?","No, this is my first time.","First, choose a team.","Can I be on your team?","Yes. Stand behind the yellow line.","Which line do you mean?","That one near the tree.","Can you show me what to do?","Of course. Are you ready now?","Yes, I am ready!"]},
  {id:"r-over",theme:"over-jezelf",title:"Over jezelf vertellen",roles:["Vakantievriend","Jij"],lines:["What's your name?","My name is Liz.","Where are you from?","I am from the Netherlands.","Do you have any brothers or sisters?","Yes, I have one younger sister.","What is your favourite sport?","My favourite sport is hockey.","What else do you like doing?","I like reading and playing outside.","Maybe we can play together later.","Yes, that would be fun!"]},
  {id:"r-restaurant",theme:"restaurant",title:"Een compleet restaurantbezoek",roles:["Ober","Klant"],lines:["Good evening. Do you need a table?","Yes, a table for four, please.","Would you like to sit inside or outside?","Outside, please.","What would you like to drink?","Some still water, please.","Are you ready to order?","Yes. Can the pizza be made gluten-free?","Yes, we have a gluten-free base.","Then I would like that pizza, please.","Is everything okay with your meal?","Yes, it is delicious.","Would you like a dessert?","No, thank you. I am full. The bill, please."]},
  {id:"r-winkel",theme:"winkel",title:"Een T-shirt passen en kopen",roles:["Medewerker","Klant"],lines:["Hello. Can I help you?","Yes, I am looking for a blue T-shirt.","What size do you need?","I am not sure. Can you help me?","Try this one. The changing rooms are at the back.","Thank you. I will try it on.","How does it fit?","It is too big.","Would you like a smaller size?","Yes, please.","Does this one fit better?","Yes, this one fits well.","Would you like to buy it?","Yes, please. Can I pay by card?"]},
  {id:"r-onderweg",theme:"onderweg",title:"Met de bus naar het strand",roles:["Chauffeur","Reiziger"],lines:["Hello. Where would you like to go?","We would like to go to the beach.","You need bus number six.","Where does that bus leave?","From the stop across the road.","When does the next bus come?","In about ten minutes.","How much are two tickets?","They are four euros.","Could you tell us when to get off?","Yes. The beach is the fifth stop.","Thank you for your help!"]},
  {id:"r-vakantie",theme:"vakantie",title:"Inchecken bij de receptie",roles:["Receptionist","Gast"],lines:["Good afternoon. How can I help?","We would like to check in, please.","What is your family name?","Our family name is Janssen.","Your place is number twenty-four.","Can you show me on the map?","Of course. It is next to the playground.","Is it far from here?","No, it is a five-minute walk.","Where is the swimming pool?","It is behind the restaurant.","Thank you very much."]},
  {id:"r-zwembad",theme:"zwembad",title:"Veilig zwemmen",roles:["Badmeester","Zwemmer"],lines:["Hello. Can you swim?","Yes, but I am still learning.","Please stay in the shallow part.","Where is the shallow part?","It is near the yellow flag.","Do you mean that flag over there?","Yes. Please do not run beside the pool.","Okay, I will walk.","Would you like a life jacket?","Yes, please.","Try this yellow one.","Thank you. It fits well."]},
  {id:"r-hulp",theme:"hulp",title:"Je ouders terugvinden",roles:["Helper","Kind"],lines:["Are you okay?","No, I cannot find my parents.","Don't worry. What are their names?","Their names are Bas and Maartje.","What do they look like?","My dad is tall and has brown hair.","Where did you last see them?","Near the entrance.","I will call them over the loudspeaker.","Thank you. Please stay with me.","Of course. Look, they are coming now.","I can see them. Thank you so much!"]}
];

export const ENGLISH_V6_ROLEPLAY_TRANSLATIONS={
  "r-kennismaken":["Hallo! Ik heb je hier nog niet eerder gezien.","Hoi! We zijn gisteren aangekomen.","Hoe heet je?","Ik heet Liz. Hoe heet jij?","Ik heet Sam. Hoe oud ben je?","Ik ben negen jaar oud.","Waar kom je vandaan?","Ik kom uit Nederland.","Wat vind je leuk om te doen?","Ik houd van zwemmen en buiten spelen.","Zullen we later naar het zwembad gaan?","Ja, dat klinkt leuk!"],
  "r-vrienden":["Wat ga je vanmiddag doen?","Ik ga naar het strand.","Mag ik met je mee?","Ja, natuurlijk!","Wat zou je daar willen doen?","We kunnen een zandkasteel bouwen.","Zullen we ook een bal meenemen?","Ja, goed idee.","Hoe laat zullen we afspreken?","Wat dacht je van twee uur?","Laten we bij de speeltuin afspreken.","Oké, tot daar!"],
  "r-spelen":["Wil je met ons meespelen?","Ja, graag!","Heb je dit spel eerder gespeeld?","Nee, dit is mijn eerste keer.","Kies eerst een team.","Mag ik bij jouw team?","Ja. Ga achter de gele lijn staan.","Welke lijn bedoel je?","Die daar bij de boom.","Kun je me laten zien wat ik moet doen?","Natuurlijk. Ben je nu klaar?","Ja, ik ben klaar!"],
  "r-over":["Hoe heet je?","Ik heet Liz.","Waar kom je vandaan?","Ik kom uit Nederland.","Heb je broers of zussen?","Ja, ik heb één jongere zus.","Wat is je favoriete sport?","Mijn favoriete sport is hockey.","Wat vind je nog meer leuk om te doen?","Ik houd van lezen en buiten spelen.","Misschien kunnen we later samen spelen.","Ja, dat lijkt me leuk!"],
  "r-restaurant":["Goedenavond. Hebt u een tafel nodig?","Ja, een tafel voor vier alstublieft.","Wilt u binnen of buiten zitten?","Buiten, alstublieft.","Wat wilt u drinken?","Wat plat water, alstublieft.","Bent u klaar om te bestellen?","Ja. Kan de pizza glutenvrij worden gemaakt?","Ja, we hebben een glutenvrije bodem.","Dan wil ik graag die pizza.","Is alles naar wens met uw eten?","Ja, het is heerlijk.","Wilt u een dessert?","Nee, dank u. Ik zit vol. De rekening, alstublieft."],
  "r-winkel":["Hallo. Kan ik je helpen?","Ja, ik zoek een blauw T-shirt.","Welke maat heb je nodig?","Ik weet het niet zeker. Kunt u me helpen?","Probeer deze. De paskamers zijn achterin.","Dank u. Ik ga hem passen.","Hoe zit hij?","Hij is te groot.","Wil je een kleinere maat?","Ja, graag.","Past deze beter?","Ja, deze past goed.","Wil je hem kopen?","Ja, graag. Kan ik met een kaart betalen?"],
  "r-onderweg":["Hallo. Waar wilt u naartoe?","We willen graag naar het strand.","U hebt bus nummer zes nodig.","Waar vertrekt die bus?","Bij de halte aan de overkant.","Wanneer komt de volgende bus?","Over ongeveer tien minuten.","Hoeveel kosten twee kaartjes?","Ze kosten vier euro.","Kunt u zeggen wanneer we moeten uitstappen?","Ja. Het strand is de vijfde halte.","Bedankt voor uw hulp!"],
  "r-vakantie":["Goedemiddag. Hoe kan ik u helpen?","We willen graag inchecken.","Wat is uw familienaam?","Onze familienaam is Janssen.","Uw plek is nummer vierentwintig.","Kunt u het op de kaart laten zien?","Natuurlijk. Het is naast de speeltuin.","Is het ver van hier?","Nee, het is vijf minuten lopen.","Waar is het zwembad?","Het is achter het restaurant.","Hartelijk dank."],
  "r-zwembad":["Hallo. Kun je zwemmen?","Ja, maar ik ben het nog aan het leren.","Blijf alsjeblieft in het ondiepe gedeelte.","Waar is het ondiepe gedeelte?","Het is bij de gele vlag.","Bedoel je die vlag daar?","Ja. Ren alsjeblieft niet langs het zwembad.","Oké, ik zal lopen.","Wil je een reddingsvest?","Ja, graag.","Probeer deze gele.","Dank u. Hij past goed."],
  "r-hulp":["Gaat het goed met je?","Nee, ik kan mijn ouders niet vinden.","Maak je geen zorgen. Hoe heten ze?","Ze heten Bas en Maartje.","Hoe zien ze eruit?","Mijn vader is lang en heeft bruin haar.","Waar heb je ze voor het laatst gezien?","Bij de ingang.","Ik zal ze omroepen.","Dank u. Blijf alstublieft bij me.","Natuurlijk. Kijk, ze komen er nu aan.","Ik zie ze. Heel erg bedankt!"]
};

export const ENGLISH_V6_COUNTRIES=[
  {id:"usa",code:"us",name:"Amerika",voice:"en-US",tips:["restroom = toilet","fries = friet","soccer = voetbal","elevator = lift","vacation = vakantie","gas station = benzinestation","candy = snoep","check = rekening"],phrases:["Where is the restroom?","Can I have some fries, please?","Do you want to play soccer?","Which floor does the elevator go to?","Could we have the check, please?"]},
  {id:"australia",code:"au",name:"Australië",voice:"en-AU",tips:["G'day = hallo","No worries = geen probleem","mate = vriend of maat","thongs = slippers","bathers = zwemkleding","brekkie = ontbijt","barbie = barbecue","servo = benzinestation","arvo = middag","esky = koelbox","footy = voetbalvariant","bushwalk = wandeling in de natuur"],phrases:["G'day! How are you?","No worries, mate.","Do I need my bathers?","Shall we have a barbie this evening?","Where is the nearest servo?","Would you like to go for a bushwalk this arvo?"]},
  {id:"new-zealand",code:"nz",name:"Nieuw-Zeeland",voice:"en-NZ",tips:["Kia ora = hallo of bedankt","dairy = kleine buurtwinkel","tramping = lange wandeling","togs = zwemkleding","jandals = slippers","bach = eenvoudig vakantiehuis","sweet as = prima of heel goed","chilly bin = koelbox","track = wandelpad","DOC site = eenvoudige natuurcamping","kiwi = inwoner van Nieuw-Zeeland","takeaways = afhaaleten"],phrases:["Kia ora! Nice to meet you.","Is there a dairy nearby?","Do I need my togs and jandals?","Which track leads to the waterfall?","We are staying at a DOC campsite.","That was a great walk — sweet as!"]},
  {id:"thailand",code:"th",name:"Thailand",voice:"en-GB",tips:["spicy = pittig","not spicy = niet pittig","long-tail boat = traditionele boot","night market = avondmarkt","temple = tempel","mosquito spray = muggenspray","life jacket = reddingsvest","snorkelling trip = snorkeltocht"],phrases:["I would like something that is not spicy.","How much is the long-tail boat?","What time does the night market open?","Do we need life jackets?","Is this snorkelling trip suitable for children?"]},
  {id:"tanzania",code:"tz",name:"Tanzania",voice:"en-GB",tips:["safari = reis","pole pole = rustig aan","asante = bedankt","karibu = welkom","game drive = safaririt","ranger = parkwachter","binoculars = verrekijker","mosquito net = klamboe"],phrases:["Could you please speak more slowly?","What time does the game drive start?","May I borrow the binoculars?","Is there a mosquito net in the room?","Asante. Thank you very much!"]}
];
