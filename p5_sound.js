var mic;
var fft;
var amp;
var w, sw;
var a, astep;
var sas;
var strokeR, strokeG, strokeB, strokeAlpha;
var offset;
var relocationx, relocationy;
var cfill;

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    angleMode(DEGREES);
    mic = new p5.AudioIn();
    mic.start();
    amp = new p5.Amplitude();
    fft = new p5.FFT(0.9, 64);
    fft.setInput(mic);
    w = width / 32;
    // angle
    a = 0;
    astep = 0.2;
    sw = random(1);
    strokeWeight(sw);
    rectMode(CENTER);
    strokeAlpha = 255;
    sas = -1;
    // color
    strokeB = 255;
    offset = 0.1;
    relocationx = 0;
    relocationy = 0;
    cfill = 255;
    
     noisoIndex = 0;
}

function draw() {
    if(keyIsDown(DOWN_ARROW)) {
        noisb();
    } else if(keyIsDown(UP_ARROW)) {
        noisc ();
    }
    
    else{
    noisa();
    }
}

function noisa() {
    var spectrum = fft.analyze();
    var vol = mic.getLevel();
    var alpha = map(vol, 0, 1, 50, 255);
    stroke(255 - cfill, strokeAlpha / 2);
    strokeAlpha += sas;
    if (strokeAlpha <= 0) {
        sas *= -1;
    }
    fill(cfill, alpha);
    offset += 0.002;
    push();
    translate(width * noise(offset), height * noise(offset));
    rotate(a);
    a += astep;
    if (a >= 360) {
        a = 0;
    }
    for (var i = 0; i <= spectrum.length; i++) {
        var amp = spectrum[i];
        var y = map(amp, 0, 255, height / 3, 0);
        var d = map(a, 0, 360, 0, w);
        push();
        rotate(a);
        rect(-y / 2 * 1.4 + w / 2 + i * random(1) + w, 0, d * noise(a), y);
        stroke(cfill);
        rect(-y / 2 * 1.4 + w / 2 + i * random(1) + w, 0, y * noise(a) * 2, 1);
        //        line(- y*1.4 + w / 2 + i * random(1) + w, d * noise(a));
        pop();
    }
    pop();
    if (mouseIsPressed) {
        astep *= -1;
        cfill *= -1;
        //    strokeG = random(255);
        //    strokeB = random(255);
    }
}

function noisb() {
    var spectrum = fft.analyze();
    var vol = mic.getLevel();
    var alpha = map(vol, 0, 1, 50, 255);
    stroke(0, strokeAlpha);
    strokeAlpha += sas;
    if (strokeAlpha <= 0) {
        sas *= -1;
    }
    fill(255 - strokeR, 255 - strokeG, 255 - strokeB, alpha);
    offset += 0.002;
    push();
    translate(width * noise(offset), height * noise(offset));
    rotate(a);
    a += astep;
    if (a >= 360) {
        a = 0;
    }
    for (var i = 0; i <= spectrum.length; i++) {
        var amp = spectrum[i];
        var y = map(amp, 0, 255, 0, height / 2);
        var d = map(a, 0, 360, 0, w);
        push();
        rotate(a);
        rect(-y + w / 2 + i * random(1) + w, 0, d * noise(a) + sw, y);
        pop();
    }
    pop();
    if (mouseIsPressed) {
        astep *= -1;
        //    strokeG = random(255);
        //    strokeB = random(255);
    }
}

function noisc() {
    var spectrum = fft.analyze();
    var vol = mic.getLevel();
    var alpha = map(vol, 0, 1, 50, 255);
    stroke(0, strokeAlpha);
    strokeAlpha += sas;
    if (strokeAlpha <= 0) {
        sas *= -1;
    }
    fill(255 - strokeR, 255 - strokeG, 255 - strokeB, alpha);
    offset += 0.002;
    push();
    translate(width / 2 * noise(offset), height / 2 * noise(offset));
    rotate(a);
    a += astep;
    if (a >= 360) {
        a = 0;
    }

    for (var i = 0; i <= spectrum.length; i++) {
        var amp = spectrum[i];
        var y = map(amp, 0, 255, 0, height / 2);
        var d = map(a, 0, 360, 0, w);

        push();
        rotate(a);
        rect(- y + w / 2 + i * random(10) + w, 0, d * noise(a) + sw*2, y);
        pop();
    }
    pop();
}


function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}