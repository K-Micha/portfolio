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
let paused   = false;

const speed = 1000 / 60;
const step  = 2;

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
