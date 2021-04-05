
class FlowFieldActive {
    particles = [];
    isInit = false;
  
    z = 0;
  
    constructor(colorFn, background = 255) {
      this.colorFn = colorFn;
      this.background = background;
    }
  
    setup() {
      for (let index = 0; index < 3000; index++) {
        this.particles.push({
          x: random(windowWidth),
          y: random(windowHeight),
          color: this.colorFn(),
        });
      }
      background(this.background);
      this.isInit = true;
    }
  
    draw() {
      if (!this.isInit) {
        this.setup();
        return;
      }
      this.z += 0.001;
      for (let index = 0; index < this.particles.length; index++) {
        let p = this.particles[index];
  
        const noiseVal = noise(p.x / windowWidth, p.y / windowHeight, this.z);
        const angle = map(noiseVal, 0, 1, -2 * PI, 2 * PI);
        p.x = p.x + sin(angle) + random(-0.1, 0.1);
        p.y = p.y + cos(angle) + random(-0.1, 0.1);
        stroke(p.color);
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
  