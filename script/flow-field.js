
class FlowField {
    particles = [];
    isInit = false;
  
    constructor(colorFn, backgroundColor = 0) {
      this.colorFn = colorFn;
      this.backgroundColor = backgroundColor;
    }
  
    setup() {
      for (let index = 0; index < 3000; index++) {
        this.particles.push({
          x: random(windowWidth),
          y: random(windowHeight),
          color: this.colorFn(),
        });
      }
      background(this.backgroundColor);
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
      for (let index = 0; index < this.particles.length; index++) {
        let p = this.particles[index];
  
        const noiseVal = noise(p.x / windowWidth, p.y / windowHeight);
        const angle = map(noiseVal, 0, 1, -2 * PI, 2 * PI);
        p.x = p.x + sin(angle);
        p.y = p.y + cos(angle);
        stroke(p.color);
        line(p.x, p.y, p.x + sin(angle), p.y + cos(angle));
  
        if (p.x > windowWidth || p.x < 0 || p.y > windowHeight || p.y < 0) {
          p.x = random(windowWidth);
          p.y = random(windowHeight);
        }
      }
    }
  }