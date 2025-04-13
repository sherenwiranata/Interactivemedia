let bgAudio;

function preload(){
    bgAudio = loadSound('/sound/sonicsound.mp3');
}
function setup (){
    bgAudio.setVolume(0.1);
    bgAudio.loop();  
}