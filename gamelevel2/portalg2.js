let fakeDiv;
let speechRec;
let statusP;
let magicWords = [
  "please", "sorry", "excuse me", "congratulations", 
  "can i", "don't worry", "do not worry", 
  "i love you", "thank you"
];
let detected = false;

function setup() {
  noCanvas();

  // Heading
  createElement('h1', 'Magic words are always appreciated').class('heading');

  // Create the floating image container
  fakeDiv = createDiv().class('fake-div');
  let initialW = 180;
    let initialH = 180;
    fakeDiv.position((windowWidth - initialW) / 2, (windowHeight - initialH) / 2);


  let img = createImg('../imggame2/portal.png', 'portal creature').class('portal-img');
  fakeDiv.child(img);

  // Move the div away from mouse
  fakeDiv.mouseOver(() => {
    if (!detected) {
      let x = random(windowWidth - 500);
      let y = random(windowHeight - 500);
      fakeDiv.position(x, y);
    }
  });

  // Status text
  statusP = createP('').class('status-text');

  // Speech recognition
  speechRec = new p5.SpeechRec('en-US', gotSpeech);
  speechRec.continuous = true;
  speechRec.interimResults = false;
  speechRec.start();
}

function gotSpeech() {
  if (speechRec.resultValue && !detected) {
    let said = speechRec.resultString.toLowerCase();
    console.log('You said:', said);

    for (let word of magicWords) {
      if (said.includes(word)) {
        detected = true;
        statusP.html('Magic word detected! Entering portal...');
        setTimeout(() => {
          window.location.href = '../weekly_content_2/weekly_content_2_select.html';
        }, 1200);
        break;
      }
    }
  }
}
