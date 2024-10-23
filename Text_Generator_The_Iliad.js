let charRNN;
let textInput;
let loaded;

function setup() {
  createCanvas(400,400);
  
  input = createInput();
  input.position(20,65);
  
  button = createButton('submit');
  button.position(input.x + input.width, 65);
  button.mousePressed(generateText);
  loaded = true;
  charRNN = ml5.charRNN('https://raw.githubusercontent.com/wrightybnature/ml5js_textGen_uni/main/200_epochs', modelReady);
  
  background('white');
  text("Training",10,20);
}

function modelReady() {
  loaded = false;
  background("white");
  text("Ready",10,20)
}

function generateText() {
  const original = input.value();
  const txt = original.toLowerCase();

  if(!loaded && txt.length > 0) {
    const data = {
      seed: txt,
      temperature: 0.5,
      length: 20,
    };

    charRNN.generate(data, gotData);
  }
}

function gotData(err, result) {
  if (err){
    console.error(err);
    return;
  }
  background('white');
  text(input.value().toLowerCase() + result.sample, 10, 40);
}