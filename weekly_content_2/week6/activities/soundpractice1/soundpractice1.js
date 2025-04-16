var song, string, analyzer;
function preload(){
  song = loadSound("./sound/subwooferlullaby.mp3");
}
function setup() {
   createCanvas(windowWidth, windowHeight);
  getAudioContext().suspend();
  analyzer= new p5.Amplitude();
  background("green");
  string='';
  textAlign(CENTER, CENTER);
}

function draw() {
  let volume = analyzer.getLevel();
  let mappedVol = map(volume,0,0.1,10,200);
  background("green");
  textSize(mappedVol);
  text(string, width/2, height/2);
 console.log(volume);
}

function mousePressed() {
  getAudioContext().resume();
  if(song.isPlaying()==true){
    song.stop();
  }
  else{
    song.play();
  }
}
function keyPressed(){
  if (key=="s"){
    background("pink");
    song.play();
  }
  string+=key
}