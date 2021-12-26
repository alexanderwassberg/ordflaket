const btnVoice = document.querySelector('.btn-voice');
const btnVoiceClose = document.querySelector('.btn-voice-close');
const voiceChanger = document.querySelector('.voice-changer');

// Toggle Voice Setup with onClick Event
function toggleVoices() {
    voiceChanger.classList.toggle('active');
    btnVoice.innerHTML = "<i class='fa fa-times-circle'></i>";

    if(!voiceChanger.classList.contains('active')){
        btnVoice.innerHTML = "<i class='fa fa-cog'></i>";
    }
}