const artWorks = [];
let active;
let activeIndex = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  /*artWorks.push(new FlowField(() => color(random(255), 0, 0)));
  artWorks.push(new FlowField(() => color(0, 10), 255));
  artWorks.push(new FlowFieldActive(() => color(0, 5), 255));
  artWorks.push(new FlowFieldActive(() => color(255, 5), 0));
  artWorks.push(new FlowFieldActive(() => color(random(255), 0, 0, 20), 0));
  artWorks.push(new FlowField(() => color(0, random(255), 0)));
  artWorks.push(new FlowField(() => color(0, 0, random(255))));*/
  artWorks.push(new FlowFieldColor());



  active = artWorks[activeIndex];
  setInterval(()=> {
	change();
  }, 1000000 * 60 * 3);
}

function draw() {
  active.draw();
}

function mouseClicked() {
	change();
}

function change() {
	active.destroy();
	activeIndex += 1;
	if(activeIndex === artWorks.length){
		activeIndex = 0;
	}
	active = artWorks[activeIndex];
}