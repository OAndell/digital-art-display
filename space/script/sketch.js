
const CANVAS_HEIGHT = 600;
const CANVAS_WIDTH = 600;

const BASE_H = 15;
const BASE_S = 10;
const BASE_B = 1;

function setup() {
  createCanvas(CANVAS_WIDTH, CANVAS_HEIGHT);
  colorMode(HSB, 100);
  noLoop();
  background(BASE_H, BASE_S, BASE_B);
  texturize(30000);
  new Planet(200, 150, 400, {h: 360, s: 100, b: 50})
  fill(0)
  rect(0, 405, CANVAS_WIDTH, 600);
  drawOcean();
  //rect(0, 400, CANVAS_WIDTH, 600);

  drawShips(410,470);
  drawShips(400,520);
  drawShips(300,500);

}

function draw() {

}


let texturize = (density) => {
  for(let i = 0; i < density; i++) {
    stroke(
      BASE_H,
      BASE_S + Math.random() * 5,
      BASE_B + Math.random() * 8,
      Math.random() * 10 + 75
    );

    let x1 = Math.random() * CANVAS_WIDTH;
    let y1 = Math.random() * CANVAS_HEIGHT;
    let theta = Math.random() * 2 * Math.PI;
    let segmentLength = Math.random() * 5 + 2;
    let x2 = Math.cos(theta) * segmentLength + x1;
    let y2 = Math.sin(theta) * segmentLength + y1;
    line(x1, y1, x2, y2);
  }
};


class Planet {
  constructor(x, y, w , c ){
    push()
    fill(c.h, c.s, c.b);
    ellipse(x,y,w);
    translate(x,y)
    this.texturize(x,y,w,c);
    pop()
  }

  texturize(x,y,w,c){
    const r = w/2
    for(let i = 0; i < 30000; i++) {
      stroke(
        c.h,
        c.s - Math.random() * 5,
        c.b - Math.random() * 8,
        Math.random() * 10 + 75
      );
  
      let x1 = random(-r,r);
      let y1 =random(-r,r);
      let theta = Math.random() * 2 * Math.PI;
      let segmentLength = Math.random() * 5 + 2;
      let x2 = Math.cos(theta) * segmentLength + x1;
      let y2 = Math.sin(theta) * segmentLength + y1;

      if(Math.pow(x2,2) + Math.pow(y2,2) < Math.pow(r, 2)){
        line(x1, y1, x2, y2);
      }
    }
 }
}





function drawOcean() {
  push();
  const particles = [];
  const horizonY = 400;
  const sunBrigeX = 50;
  const sunBridgeWidth = 360;


  for (let yIndex = horizonY; yIndex < CANVAS_HEIGHT; yIndex+= 10) {
    for (let xIndex = 0; xIndex < CANVAS_WIDTH; xIndex+= 10) {
      particles.push({
        x: xIndex,
        y: yIndex,
      });
      
    }
    
  }

  strokeWeight(1);
  fill(360, 100, 60, 30);
  const getColor = (x,y) => {
    const yValue1 = map(y, horizonY, 600, 1, 3)
    const yValue2 = map(y, horizonY, 600, 1, 1.5)
    if( sunBrigeX / yValue1 < x + random(10) && x+ random(50) < (sunBridgeWidth + sunBrigeX) * yValue2 ){
      return color(360, 100, 60, 30)
    }
    return color(1, 23, 15, 25)
  }

  for (let it = 0; it < 200; it++) {
    for (let index = 0; index < particles.length; index++) {

      let p = particles[index];
  
      const noiseVal = noise(p.x / windowWidth, p.y / windowHeight) * 0.5;
      const angle = map(noiseVal, 0, 1, -2 * PI, 2 * PI);
      p.x = p.x + sin(angle);
      p.y = p.y + cos(angle);
      stroke(getColor(p.x, p.y));
      line(p.x, p.y, p.x + sin(angle), p.y + cos(angle));
  
      if (p.x > CANVAS_WIDTH || p.x < 0 || p.y > CANVAS_HEIGHT + 300 || p.y < horizonY - random(100)) {
        p.x = random(CANVAS_WIDTH);
        p.y = random(horizonY, CANVAS_HEIGHT);
      }
    }
  }


  pop();
}


function drawShips(x, y) {
  push()
  beginShape();
  noStroke()
  fill(2)
  triangle(x, y, x+20, y-20, x+20, y);
  triangle(x+ 22, y, x+22, y-15, x+32, y);

  strokeWeight(2)
  stroke(2);
  rect(x +1,y, 34, 3);
  noStroke();
  fill(0);


  quad(x, y + 4, x+36, y, x+40, y+6, x+4, y+6);

  triangle(x, y +1, x+55, y+40, x+18, y);
  triangle(x+20, y + 1, x+50, y+30, x+32, y);
  pop();
}
