function getWord() {

    var voice_id = document.getElementById("voice").selectedIndex;

    // Fetching Raw Github Repo text file for faster maintaining
    fetch('https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/words.txt')
    .then(response => response.text())
    .then(data => {
        // Split (on row) text file into a array
        var wordList = data.split("\n");

        // Creating two new arrays for each side of the "-" mark
        var wordsLeft = [];
        var wordsRight = [];

        for (var i = 0; i < wordList.length; i++) {
            var words = wordList[i].split("-");
            wordsLeft[i] = words[0];
            wordsRight[i] = words[1];
            var word = wordsLeft[getRandomInt(wordList.length)] + '-' + wordsRight[getRandomInt(wordList.length)];
        }

        // Targets the H1-element for pushing the word
        var el = document.getElementById('word');
        el.innerText = word;
        say(word);

    });
}

// Randomize function
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Let's the user change the voice
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

// Voice Over functionality
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

// Copies the generated word the the Clipboard by clicking the text of the word
function copyWord() {
    var textToCopy = document.querySelector('h1').innerText;

    if (navigator.clipboard && window.isSecureContext) {
        // navigator clipboard api method'
        return navigator.clipboard.writeText(textToCopy);
    } else {
        // text area method
        let textArea = document.createElement("textarea");
        textArea.value = textToCopy;
        // make the textarea out of viewport
        textArea.style.position = "fixed";
        textArea.style.left = "-999999px";
        textArea.style.top = "-999999px";
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        return new Promise((res, rej) => {
            // here the magic happens
            document.execCommand('copy') ? res() : rej();
            textArea.remove();
        });
    }
}