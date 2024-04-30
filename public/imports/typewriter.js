//All of this is pretty messy, I have no Idea how half of this works lmao, will be updated asap!
//FYI: All of the weird Unicode characters are just for the decorations.

let storyText = "This is .whiteÉ YOU./.\n.whiteÉ YOU./ are currently sitting in your .yellowÊ HOUSE./, waiting for something to happen when suddenly,\n.whiteÉ YOU./ hear a loud noise coming from outside.\n.whiteÉ YOU./ see a .redÂ MIGHTY CAT./ attacking an elderly person.\nWhat do .whiteÉ YOU./ do?\qr";
//Question 2
storyText += "After the Issues from before, .whiteÉ YOU./ decide to hike through a .dgreenÏ FOREST./.\n.whiteÉ YOU./ suddenly stumble upon a mysterious, ancient .yellowÅ ARTIFACT./ half-buried in the ground.\nWhat do .whiteÉ YOU./ do?\qr"
//Question 3
storyText += ".whiteÉ YOU./ continue your hike through the .dgreenÏ FOREST./. .whiteÉ YOU./ start to .yellowÍ WHISTLE./ some tunes.\n.whiteÉ YOU./ suddenly hear some rustling in a bush behind you. Seems like your whistling attracted.. something.\n.whiteÉ YOU./ quickly turn around to look at the bush and see some .redÈ EYES./ staring back at .whiteÉ YOU./.\qr";
//Question 4
storyText += ".whiteÉ YOU./ breathe a sigh of relief as a .dgreenharmless owl./ emerges from the bush, probably just curious about your .yellowÍ WHISTLING./.\nYou decide to leave the .dgreenÏ FOREST./ behind and head to the bustling city .yellowMARKET./.\nAs .whiteYOU./ stroll through the market stalls, .whiteYOU./ come across a mysterious shop selling .yellowÅ ANCIENT ARTIFACTS./.\nThe .dgreenSeller./ asks .whiteÉ YOU./ to buy something. What do .whiteÉ YOU./ pick?\qr";
//Question 5
storyText += ".whiteÉ YOU./ continue to walk through the .yellowmarket./, marveling at the colorful array of goods on display.\nSuddenly, .whiteÉ YOU./ hear a commotion nearby and see a group of .dgreenSTREET PERFORMERS./ entertaining a crowd.\nAs .whiteÉ YOU./ approach, .whiteÉ YOU./ notice they're offering a chance to participate in their act.\nWhat do .whiteÉ YOU./ do?\qr"
//Question 6
storyText += ".whiteÉ YOU./ had a lot of fun at the market. The sun is slowly setting, casting a golden glow over everything.\nAs the day winds down, you think about the best way to spend your evening.\nWhat do .whiteÉ YOU./ decide to do?";
// Answers for each personality:"
storyText = storyText.replace(/\.lime-shadow/g, '<span class="lime-shadow">').replace(/\.red/g, '<span class="red">').replace(/\.yellow/g, '<span class="yellow">').replace(/\.white/g, '<span class="white">').replace(/\.dgreen/g, '<span class="dark-green">').replace(/\.\//g, '</span>');

let sections = storyText.split("\qr");
let currentSection = 0;
let container = document.getElementById("eightbit");

let buttonSound = new Audio('../sounds/button-124476.mp3');

let personalities = ["Explorer", "Strategist", "Visionary", "Guardian"];
let tally = personalities.reduce((acc, personality) => ({...acc, [personality]: 0}), {});

let answers = [
    {1: ".whiteI./ will rush outside to investigate the commotion and offer help, driven by curiosity and courage.", 2: ".whiteI./ quickly devise a plan to distract the .redÂ MIGHTY CAT./ and safely rescue the person, using my surroundings for that!", 3: ".whiteI./ envision a creative way to calm the .redÂ MIGHTY CAT./, trying to turn it into a .dgreenÂ PEACEFUL CAT./ instead!", 4: ".whiteI./ immediately step in to protect the elderly person, placing myself between her and the .redÂ MIGHTY CAT./."},
    {1: ".whiteI./ think .yellowIt./ looks shiny! Taking it for myself wouldn't hurt.", 2: ".whiteI./ think the best way to handle this without .redDAMAGING./ it would be calling someone who knows about this stuff?", 3: ".whiteI./ wonder about what stories this .yellowÅ ARTIFACT./ could tell. It's like finding a piece of a lost world!", 4: ".whiteI./ will leave it there, maybe hiding it under some more dirt to keep it .dgreenSAFE./."},
    {1: ".whiteI./ walk towards the bush, curious about who's checking out my awesome whistling skills. Hopefully it's a fan and not a .redcritic./!", 2: ".whiteI./ keep my cool and think about whether I should introduce myself or play it .dgreensafe./ and slowly back away.", 3: ".whiteI./ get .yellowexcited./, wondering if my music skills might have called forth a magical creature. Time for a .yellowduet./, perhaps?", 4:".whiteI./ decide that maybe whistling wasn't such a great idea. Time to make a .dgreenstrategic retreat./ and leave my audience wanting more."},
    {1: "Wow, look at all these artifacts! .whiteI'll./ check out that .reddusty old map./ first. Who knows what secrets it might hold?", 2: "Hmm, interesting. .white.I'll./ start by observing the .dgreenshopkeeper./ and the .yellowcustomers./. Maybe .whiteI./ can learn something useful before making a move.'", 3: "'Intriguing! That .yellowornate necklace./ is calling to me. .whiteI./ can feel its history and untold stories whispering my name.'", 4: "'I'll keep an eye on that .yellowsturdy-looking shield./. It looks like it's been through a lot, and it might need someone to look after it .dgreenproperly./.'"},
    {1: ".whiteI./ eagerly join the performers, ready to showcase my hidden talents and add some .yellowexcitement./ to the show!", 2: ".whiteI./ observe the .yellowperformers./ closely, analyzing their routine and looking for the .dgreenperfect./ moment to seamlessly integrate myself into the act.", 3: ".whiteI./ envision myself as the .yellowstar of the show./, dazzling the audience with my .yellowcharisma./ and leaving them in awe of my performance!", 4: ".whiteI./ opt to watch from the sidelines, ensuring the .yellowperformers./ and .dgreenaudience./ stay safe while silently cheering them on."},
    {1: ".whiteI./ decide to go on a spontaneous .redMINI-ADVENTURE./! Maybe a quick hike up the nearest hill to watch the .yellowSUNSET./?", 2: ".whiteI./ plan to find a .yellowCOZY CAFE./ where I can relax and .dgreenSTRATEGIZE./ my plans for the next day over a hot cup of coffee.", 3: ".whiteI./ choose to spend the evening at a local .yellowPOETRY./ reading, soaking in the .dgreencreative vibes./ and perhaps even sharing some of my own .yellowINSPIRED./ verses.", 4: ".whiteI./ opt to head back .yellowÊ HOME./ early, ensuring Im .dgreenWELL-RESTED./ for whatever challenges tomorrow might bring."}
];

answers = answers.map(answer => {
    let newAnswer = {};
    for (let key in answer) {
        newAnswer[key] = answer[key].replace(/\.lime-shadow/g, '<span class="lime-shadow">').replace(/\.red/g, '<span class="red">').replace(/\.yellow/g, '<span class="yellow">').replace(/\.white/g, '<span class="white">').replace(/\.dgreen/g, '<span class="dark-green">').replace(/\.\//g, '</span>');
    }
    return newAnswer;
});

let isTyping = false;

function typewriterEffect(text, container, cssClass, callback) { //I HAVE NO IDEAA HOW THIS WORKS, but it works
    isTyping = true;
    container.innerHTML = '';
    let i = 0;
    let audio = new Audio('../sounds/click.wav');
    let typingSpeed = text.length > 450 ? 50 : (text.length > 400 ? 65 : 90);
    let inSpan = false;
    let spanClass = '';

    function type() {
        if (i < text.length) {
            if (text.substring(i, i+6) === '<span ') {
                let endOfSpan = text.indexOf('>', i) + 1;
                spanClass = text.substring(i+13, endOfSpan-2);
                i = endOfSpan;
                inSpan = true;
            } else if (text.substring(i, i+7) === '</span>') {
                inSpan = false;
                spanClass = '';
                i += 7;
            } else {
                let span = document.createElement('span');
                span.className = inSpan ? spanClass : cssClass;
                span.innerHTML = text.charAt(i);
                container.appendChild(span);
                i++;
            }
            audio.currentTime = 0;
            audio.play();
            setTimeout(type, typingSpeed);
        } else {
            isTyping = false;
            if (callback) callback();
        }
    }
    type();
}

function handleKeypress(event) {
    if (isTyping) return; // TODO: Skip function maybe?

    let option = event.key;
    if (["1", "2", "3", "4"].includes(option)) {
        // Play the preloaded audio file
        buttonSound.play();

        tally[personalities[option - 1]]++;
        currentSection++;
        if (currentSection < sections.length) {
            container.innerHTML = '';
            typewriterEffect(sections[currentSection], container, 'lime-shadow', displayAnswers);
        } else {
            let maxTally = Math.max(...Object.values(tally));
            let winningPersonalities = personalities.filter(personality => tally[personality] === maxTally);
            let winningPersonality = winningPersonalities.length > 1 ? "Allrounder" : winningPersonalities[0];
            container.innerHTML = "Your personality type is: " + winningPersonality;
            window.removeEventListener("keypress", handleKeypress);
        }
    }
}

function displayAnswers() {
    let answerText = Object.entries(answers[currentSection]).map(([key, value]) => `${key}> ${value}`).join('<br>');
    container.innerHTML += '<br><br>' + answerText;
}

function startQuiz() {
    window.addEventListener("keypress", handleKeypress);
    typewriterEffect(sections[0], container, 'lime-shadow', displayAnswers);
}

startQuiz();