let bgAudio;

function preload(){
    bgAudio = loadSound('/sound/sonicsound.mp3');
}
function setup (){
    bgAudio.loop();  
}