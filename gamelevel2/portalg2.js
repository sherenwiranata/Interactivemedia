let fakeDiv;
let speechRec;
let statusP;
let hintText;
let hintText2
let giveUpButton;
let magicWords = [
  "please", "sorry", "excuse me", "alkazam", 
  "presto", "open sesame", "abracadabra", 
  "i love you", "thank you", "shazam", "alohomora", "zimzalabim"
];
let detected = false;

function setup() {
  noCanvas();

  // Heading
  let heading = createElement('h1', 'Three gems you have paid, yet coin is not all');
  heading.class('heading');
  let headingLine2 = createElement('h2', 'A Spell must rise, or you shall fall');
  headingLine2.class('heading1');
  let headingLine3 = createElement('h2', 'shout the spell, and you may pass');
  headingLine3.class('heading1');
  
  // Hint Text 1
  hintText = createElement('p', 'abracadabra');
  hintText.class('hint-text');

  // Hint Text 2
  hintText2 = createElement('p', 'open sesame');
  hintText2.class('hint-text2');

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

  // Give Up Button
  giveUpButton = createButton('Give Up');
  giveUpButton.position(windowWidth - 120, windowHeight - 60);
  giveUpButton.mousePressed(giveUp);
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
          window.location.href = '../weekly_content_2/landing/weekly_content_2_select.html';
        }, 1200);
        break;
      }
    }
  }
}

// Give Up Function (transports to a different page)
function giveUp() {
  window.location.href = '../weekly_content_2/landing/weekly_content_2_select.html';
}
