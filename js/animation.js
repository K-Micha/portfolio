const frames = [
  '/assets/animation/arrow-icons/Frame0.png',
  '/assets/animation/arrow-icons/Frame1.svg',
  '/assets/animation/arrow-icons/Frame2.svg',
  '/assets/animation/arrow-icons/Frame3.svg',
  '/assets/animation/arrow-icons/Frame4.svg',
  '/assets/animation/arrow-icons/Frame5.svg',
  '/assets/animation/arrow-icons/Frame0.png'
];

const arrow = document.getElementById('scroll-arrow');

let progress = 0;
let paused = false;

const speed = 1000 / 60;
const step = 2;

/**
* Updates the current frame based on progress.
*/
function updateAnimation() {
  const index = Math.floor(progress / (100 / frames.length));
  arrow.src = frames[index];
}

/**
* Advances progress and triggers pause at the end of the cycle.
*/
function advanceProgress() {
  progress += step;

  if (progress >= 100) {
    paused = true;
    progress = 0;

    setTimeout(() => {
      paused = false;
    }, 600);
  }
}

/**
* Runs one animation tick unless paused.
*/
function tick() {
  if (paused) return;

  updateAnimation();
  advanceProgress();
}

setInterval(tick, speed);

const menu = document.getElementById('menu');
const topL = document.getElementById('top');
const midL = document.getElementById('mid');
const botL = document.getElementById('bot');

let open = false;
let isAnimating = false;
const FRAME_DELAY = 50;

/**
* Returns initial burger state.
*/
function frame1() {
  return {
    top: { w: 40, x: 0, y: -14, r: 0 },
    mid: { w: 40, x: 0, y: 0, r: 0 },
    bot: { w: 40, x: 0, y: 14, r: 0 }
  };
}

/**
* Returns shortened outer lines state.
*/
function frame2() {
  return {
    top: { w: 20, x: 0, y: -14, r: 0 },
    mid: { w: 40, x: 0, y: 0, r: 0 },
    bot: { w: 20, x: 0, y: 14, r: 0 }
  };
}

/**
* Returns shifted outer lines state.
*/
function frame3() {
  return {
    top: { w: 20, x: 10, y: -14, r: 0 },
    mid: { w: 40, x: 0, y: 0, r: 0 },
    bot: { w: 20, x: -10, y: 14, r: 0 }
  };
}

/**
* Returns open X transition state.
*/
function frame4() {
  return {
    top: { w: 20, x: 10, y: -10, r: -45 },
    mid: { w: 40, x: 0, y: 0, r: 45 },
    bot: { w: 20, x: -10, y: 10, r: -45 }
  };
}

/**
* Returns final closed X state.
*/
function frame5() {
  return {
    top: { w: 40, x: 0, y: 0, r: -45 },
    mid: { w: 40, x: 0, y: 0, r: 45 },
    bot: { w: 0, x: 0, y: 0, r: 0 }
  };
}

const framesOpen = [frame1, frame2, frame3, frame4, frame5];
const framesClose = [...framesOpen].reverse();

/**
* Applies a frame to all lines.
*/
function applyFrame(f) {
  applyLine(topL, f.top);
  applyLine(midL, f.mid);
  applyLine(botL, f.bot);
}

/**
* Applies style to a single line.
*/
function applyLine(line, f) {
  line.style.width = f.w + "px";
  line.style.transformOrigin = "center center";
  line.style.transform =
    `translate(-50%, -50%)
    translate(${f.x}px, ${f.y}px)
    rotate(${f.r}deg)`;
}

/**
* Runs frame-by-frame animation.
*/
function animate(frames) {
  let i = 0;
  isAnimating = true;

  function step() {
    applyFrame(frames[i]());
    i++;

    if (i < frames.length) {
      setTimeout(step, FRAME_DELAY);
      return;
    }

    isAnimating = false;
  }

  step();
}

/**
* Toggles burger animation on click.
*/
menu.addEventListener('click', () => {
  if (isAnimating) return;

  animate(open ? framesClose : framesOpen);
  open = !open;
});

applyFrame(frame1());

