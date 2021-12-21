getWord();

function getWord() {
  fetch('https://raw.githubusercontent.com/alexanderwassberg/ordflaket/master/words.txt')
  .then(response => response.text())
  .then(data => {
    var wordList = data.split("\n");
    var word = wordList[Math.floor(Math.random() * wordList.length)];
    var el = document.getElementById('word');
    el.innerText = word;
    say(word);
  });
}

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