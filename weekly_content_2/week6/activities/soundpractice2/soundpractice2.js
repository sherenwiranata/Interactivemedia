var song, string, analyzer, mic;
function preload(){
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  mic = new p5.AudioIn();
  mic.start();
  analyzer= new p5.Amplitude();
  background("yellow");
  string='';
  textAlign(CENTER, CENTER);
}

function draw() {
  let micVolume = mic.getLevel();
  let mappedVol = map(micVolume, 0, 0.01, 10, 150);
  background("yellow");
  textSize(mappedVol);
  text(string, width/2, height/2);
}

function mousePressed() {
  getAudioContext().resume();
 /* if(song.isPlaying()==true){
    song.stop();
  }
  else{
    song.play();
  }*/
}

function keyPressed(){
  if (key=="s"){
    background("pink");
    //song.play();
  }
  string+=key;
}