
class FlowFieldColor {
    particles = [];
    isInit = false;
  
    z = 0;
  
    constructor(background = 0) {
    colorMode(HSL, 360, 100, 100);
    console.log(color(`hsl(${40}, 50%, 50%)`));
      this.colorFn = (x) => {
        let angle = round(map(x, 0, windowWidth, 180, 360));
        return color(`hsla(${angle}, 100%, 50%, 100)`)
      };
      this.background = background;
    }
  
    setup() {
      for (let index = 0; index < 2000; index++) {
        const x = random(windowWidth);
        this.particles.push({
          x: random(windowWidth),
          y: random(windowHeight),
          color: this.colorFn(x),
        });
      }
      background(this.background);
      this.isInit = true;
    }

    destroy(){
        this.particles = [];
        this.isInit = false;
    }
  
    draw() {
      if (!this.isInit) {
        this.setup();
        return;
      }
      //this.z += 0.002;
      //background(this.background);
      for (let index = 0; index < this.particles.length; index++) {
        let p = this.particles[index];
  
        const noiseVal = noise(p.x / windowWidth, p.y / windowHeight, this.z);
        const angle = map(noiseVal, 0, 1, -2 * PI, 2 * PI);
        p.x = p.x + sin(angle) + random(-0.1, 0.1);
        p.y = p.y + cos(angle) + random(-0.1, 0.1);
        stroke(this.colorFn(p.x));
        strokeWeight(1);
        line(p.x, p.y, p.x + sin(angle), p.y + cos(angle));
  
        if (p.x > windowWidth) {
            p.x = 0;
          }
          if (p.x < 0) {
            p.x = windowWidth;
          }
          if (p.y > windowHeight) {
            p.y = 0;
          }
          if (p.y < 0) {
            p.y = windowHeight;
          }
      }
    }
  }
  