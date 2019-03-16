let LENGTH = 80;
const SPEED = 1;    //update per frames

let LINE_WIDTH;
let LINE_HEIGHT_STEP;

let arr = new Array(LENGTH);
let arrCopy = new Array(LENGTH);
let rendezve = false;
let actionsB = [];
let actionsJ = [];
let btn;
let cnv;
let p;
let slider;
let col;
let pColor;
let loopB;
let loop = false;
let randColB;
let randCol = false;
let timeP;




function setup() {
  cnv = createCanvas(800, 400);
  cnv.mousePressed(mousePrsd);
  frameRate(60);

  p = createP("Click on the canvas to sort with TODO SORT");
  timeP = createP("Real time of sorting (in milliseconds): ");
  p2 = createP("Length of array: " + LENGTH);
  slider = createSlider(10, width, 80);
  slider.position(8, p2.y + p2.height + 60);
  col = createInput('#ffffff', 'color');
  col.position(slider.x + slider.width + 10, slider.y);
  btn = createButton("Reset");
  btn.position(col.x + col.width + 10, col.y);
  btn.mousePressed(btnPressed);
  loopB = createButton("Loop: OFF");
  loopB.position(btn.x + btn.width + 10, btn.y);
  loopB.mousePressed(loopToggle);
  randColB = createButton("Random Color: OFF");
  randColB.position(loopB.x + loopB.width + 10, loopB.y);
  randColB.mousePressed(colorToggle);

  LINE_WIDTH = width / LENGTH;
  LINE_HEIGHT_STEP = height / LENGTH;

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = i + 1;
  }

  shuffle(arr, true);

  for (let i = 0; i < LENGTH; i++) {
    arrCopy[i] = arr[i];
  }
}

function draw() {
  background (0);

  LENGTH = slider.value();
  p2.html("Length of array: " + LENGTH);

  pColor = col.value();

  for (let i = 0; i < arr.length; i++) {
    if (randCol) {
      let rc = color(random(255), random(255), random(255));
      fill(rc);
      stroke(rc);
    } else {
      fill(pColor);
      stroke(pColor);
    }
    strokeWeight(0);
    rect(i * LINE_WIDTH, height - (arrCopy[i] * LINE_HEIGHT_STEP), LINE_WIDTH, arrCopy[i] * LINE_HEIGHT_STEP);
  }

  if (rendezve && frameCount % SPEED == 0) {
    nextStep();
  }
}

function mousePrsd() {
  if (!rendezve) {
    let timeBefore = performance.now();

    //TODO Sorting Algorithm------------------------------------------------------------------------------------

    let timeAfter = performance.now();

    let diff = timeAfter - timeBefore;
    timeP.html("Real time of sorting (in milliseconds): " + diff);

    rendezve = true;
  }
}

function btnPressed() {
  rendezve = false;
  actionsB = [];
  actionsJ = [];
  arr = [];
  arrCopy = [];

  LINE_WIDTH = width / LENGTH;
  LINE_HEIGHT_STEP = height / LENGTH;

  //print(LINE_WIDTH, " ", LINE_HEIGHT_STEP);

  for (let i = 0; i < LENGTH; i++) {
    arr[i] = i + 1;
  }

  shuffle(arr, true);

  for (let i = 0; i < LENGTH; i++) {
    arrCopy[i] = arr[i];
  }
}

function loopToggle() {
  loop = !loop;
  if (loop) {
    loopB.html("Loop: ON");
  } else {
    loopB.html("Loop: OFF");
  }
}

function colorToggle() {
  randCol = !randCol;
  if (randCol) {
    randColB.html("Random Color: ON");
  } else {
    randColB.html("Random Color: OFF");
  }
}




function csere(array, egyik, masik) {
  let tmp = array[egyik];
  array[egyik] = array[masik];
  array[masik] = tmp;
}

function tarol(b, j) {
  actionsB.push(b);
  actionsJ.push(j);
}

//TODO Sorting Algorithm---------------------------------------------------------------------------------------

function nextStep() {
  let bal = actionsB.shift();
  let jobb = actionsJ.shift();
  csere(arrCopy, bal, jobb);
  if (bal == null || jobb == null) {
    //print("null");
    rendezve = false;
    if (loop) {
      btnPressed();
      mousePrsd();
    }
  }
}
