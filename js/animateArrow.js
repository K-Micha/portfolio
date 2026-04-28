/** 
*Margin offset to delay arrow animation trigger. 
*/
const ARROW_MARGIN = '0px 0px -120px 0px';

/** 
*Initializes all arrow dividers on the page. 
*/
function initArrowDividers() {
  const dividers = document.getElementsByClassName('section-divider');

  for (let i = 0; i < dividers.length; i++) {
    initArrowDivider(dividers[i]);
  }
}

/** 
*Sets up a single divider arrow animation. 
*/
function initArrowDivider(divider) {
  const parts = getArrowParts(divider);
  if (!parts) return;

  observeArrow(divider, parts);
}

/** 
*Returns arrow and tail elements from a divider. 
*/
function getArrowParts(divider) {
  const arrow = getFirst(divider, 'arrow');
  const tail = getFirst(divider, 'tail');

  if (!arrow || !tail) return null;

  return { arrow, tail };
}

/** 
*Returns the first element by class name from a parent. 
*/
function getFirst(parent, className) {
  return parent.getElementsByClassName(className)[0];
}

/** 
*Observes divider visibility to trigger animation once. 
*/
function observeArrow(divider, parts) {
  let hasRun = false;

  const observer = new IntersectionObserver(function (entries) {
    hasRun = runArrowOnce(entries[0], hasRun, observer, divider, parts);
  }, getObserverOptions());

  observer.observe(divider);
}

/**
*Runs arrow animation once when element is visible. 
*/
function runArrowOnce(entry, hasRun, observer, divider, parts) {
  if (!entry.isIntersecting || hasRun) return hasRun;

  parts.arrow.classList.add('arrow-active');
  parts.tail.classList.add('arrow-active');
  observer.unobserve(divider);

  return true;
}

/** 
*Returns IntersectionObserver configuration options. 
*/
function getObserverOptions() {
  return {
    threshold: 0,
    rootMargin: ARROW_MARGIN
  };
}

initArrowDividers();