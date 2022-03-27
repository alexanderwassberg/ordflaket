window.onload = () => {
    'use strict';
  
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('./sw.js');
    }

    getWord();

}

var popup = document.querySelector('.copied-container');

function getWord() {
    var voice_id = document.getElementById("voice").selectedIndex;
    
    fetch('https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/words.txt')
        .then(response => response.text())
        .then(data => {
            wordGen(data);
        });

    if (window.location.href.indexOf("#business") > -1) { getName() }
}

function getName() {

    fetch('https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/names.txt')
        .then(response => response.text())
        .then(data => {
            nameGen(data);
        });
}

function nameGen(names) {
    var name = names.toString().split('\n');
    var randomName = name[Math.floor(Math.random() * name.length)];
    var nameEl = document.getElementById('name');

    if(!randomName.endsWith('s')){ nameEl.innerText = randomName + 's ';
    } else { nameEl.innerText = randomName + ' '; }

}

function wordGen(data) {
    // Hides popup when generating new word
    popup.classList.remove('active');

    var wordList = data.split("\n");
    document.querySelector('.combos').innerText = (Math.pow(wordList.length, 2)).toLocaleString('en') + ' möjliga kombinationer';

    // Word Arrays (left-right)
    var wordsLeft = [];
    var wordsRight = [];

    // Takes two random numbers for the arrays
    var wordIndex1 = getRandomInt(wordList.length);
    var wordIndex2 = getRandomInt(wordList.length);

    for (var i = 0; i < wordList.length; i++) {
        var words = wordList[i].split("-");
        wordsLeft[i] = words[0];
        wordsRight[i] = words[1];
    }

    // Character between word depending on url (#business)
    if (window.location.href.indexOf("#business") > -1) {
        var word = wordsLeft[wordIndex1] + ' & ' + wordsRight[wordIndex2];
    }

    var word = wordsLeft[wordIndex1] + '-' + wordsRight[wordIndex2];
    var el = document.getElementById('word');

    el.innerText = word;
    el.dataset.word1 = wordIndex1;
    el.dataset.word2 = wordIndex2;

    // Speech!
    say(word);
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function say(m) {
    var volumeSlide = document.getElementById("volume").value;
    var pitchSlide = document.getElementById("pitch").value;
    var rateSlide = document.getElementById("rate").value;
    var msg = new SpeechSynthesisUtterance();
    var voices = window.speechSynthesis.getVoices();

    msg.voice = voices[4];
    msg.voiceURI = "native";
    msg.volume = volumeSlide;
    msg.rate = rateSlide;
    msg.pitch = pitchSlide;
    msg.text = m;
    msg.lang = 'sv-SE';
    speechSynthesis.speak(msg);
}

function copyWord() {

    var textToCopy = document.getElementById('word').innerText;
    popup.classList.add('active');

    if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(textToCopy);
    } else {
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;

        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        return new Promise((res, rej) => {
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}