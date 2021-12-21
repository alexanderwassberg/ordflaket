// Generates the first word when visiting ordlflaket
getWord();


function getWord() {
  // Fetching text file
  fetch('../words.txt')
  .then(response => response.text())
  .then(data => {
    var wordList = data.split("\n");
    var wordsLeft = [];
    var wordsRight = [];

    for (var i = 0; i < wordList.length; i++) {
      var words = wordList[i].split("-");
      wordsLeft[i] = words[0];
      wordsRight[i] = words[1];
      var word = wordsLeft[getRandomInt(wordList.length)]+"-"+wordsRight[getRandomInt(wordList.length)];
    }

    var el = document.getElementById('word');
    el.innerText = word;
    say(word);


  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Adds the voices that reads the generated word
function say(m) {
  var msg = new SpeechSynthesisUtterance();
  var voices = window.speechSynthesis.getVoices();
  msg.voice = voices[9];
  msg.voiceURI = "native";
  msg.volume = 1;
  msg.rate = 1.2;
  msg.pitch = 1;
  msg.text = m;
  msg.lang = 'sv-SE';
  speechSynthesis.speak(msg);
}