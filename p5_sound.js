var mic;
var fft;
var amp;
var w, sw;
var a, astep;
var sas;
var strokeB, strokeAlpha;
var offsetx, offsety;
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
    w = random(100, 400);
    
    // angle
    a = 0;
    astep = random(1)-0.5;
    if(astep<0){
        sw = -astep;
    } else {
        sw = astep;
    }
    strokeWeight(sw);
    rectMode(CENTER);
    strokeAlpha = 255;
    sas = -1;
    
    // color
    strokeB = 255;
    offsetx = 0.2;
    offsety = 0.1;
    relocationx = 0;
    relocationy = 0;
    cfill = 255;
}

function draw() {
    noisa();
}

function noisa() {
    let spectrum = fft.analyze();
    let vol = mic.getLevel();
    let alpha = map(vol, 0, 1, 50, 255);
    stroke(255 - cfill, strokeAlpha / 2);
    strokeAlpha += sas;
    if (strokeAlpha <= 1 || strokeAlpha >= 254) {
        sas *= -1;
    }
    fill(cfill, alpha);
    offsetx += 0.002;
    offsety += 0.002;
    push();
    translate(width/2 + noise(offsetx, offsety), height/2 + noise(offsetx, offsety));
    rotate(a);
    a += astep;
    if (a > 1000 || a < -1000) {
        astep *= -1;
    }
//    console.log(a);
    for (var i = 0; i <= spectrum.length; i+=1) {
        let amp = spectrum[i];
        let y = map(amp, 50, 255, height / 4, 0);
        let minw;
        if (w>150) {
            minw = w/5;
        }else {
            minw = w*2;
        }
        let d = map(amp, 0, 255, minw, w);
        push();
        rotate(a);
        stroke(255-cfill);
        ellipse(-y/2 * 1.4 + i + minw, 0, d, y);
        fill(255-cfill);
        ellipse(-y/2 * 1.4 + i + minw, 0, 5, 5);
        pop();
    }
    pop();
    if (mouseIsPressed) {
        astep *= -1;
        cfill *= -1;
        a += 5;
    } else {
        a += astep;
        while (a > 1000){
            a -= 360;
        }
        while (a < -1000){
            a+=360;
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    background(0);
}