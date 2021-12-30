function getWord() {

    var voice_id = document.getElementById("voice").selectedIndex;
    
    fetch('https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/words.txt')
        .then(response => response.text())
        .then(data => {

            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }

            var wordList = data.split("\n");
            var wordsLeft = [];
            var wordsRight = [];

            for (var i = 0; i < wordList.length; i++) {
                var words = wordList[i].split("-");
                wordsLeft[i] = words[0];
                wordsRight[i] = words[1];
                var wordIndex1 = getRandomInt(wordList.length);
                var wordIndex2 = getRandomInt(wordList.length);
                var word = wordsLeft[wordIndex1] + '-' + wordsRight[wordIndex2];

            }

            console.log(wordIndex1, wordIndex2);
            var el = document.getElementById('word');
            el.innerText = word;
            el.dataset.word1 = wordIndex1;
            el.dataset.word2 = wordIndex2;
            say(word);

        });
}

function populate_voices() {
    var voices = window.speechSynthesis.getVoices();
    var option_index = 0;

    voices.forEach(function (voice) {
        var x = voice.voiceURI;
        var voice_dropdown = document.getElementById("voice");
        var option = document.createElement("option");
        option.text = voice.voiceURI+" ("+voice.lang+")";
        option.value = option_index;
        voice_dropdown.add(option);
        option_index++;
    });
}

function say(m) {
    var voice_id = document.getElementById("voice").selectedIndex;
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
    var textToCopy = document.querySelector('h1').innerText;

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