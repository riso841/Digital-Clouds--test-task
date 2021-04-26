const movableElement = document.querySelector("#mainBlock");

var active = false;
var currentX;
var currentY;
var initialX;
var initialY;
var xOffset = 0;
var yOffset = 0;


const minTimeDelayMs = 110;
const maxTimeDelayMs = 140;

/* 
  When the user first starts dragging the shape,
  the lag time is minimal, but it increases
  as the user drags.
*/

var currentTimeDalay = minTimeDelayMs;


document.addEventListener("touchstart", dragStart, false);
document.addEventListener("touchend", dragEnd, false);
document.addEventListener("touchmove", drag, false);

document.addEventListener("mousedown", dragStart, false);
document.addEventListener("mouseup", dragEnd, false);
document.addEventListener("mousemove", drag, false);

function dragStart(event) {
  if (event.type === "touchstart") {
    initialX = e.touches[0].clientX - xOffset;
    initialY = e.touches[0].clientY - yOffset;
  }
  else if (event.type === "mousedown"){
    initialX = event.clientX - xOffset;
    initialY = event.clientY - yOffset;
  }

  if (event.target === movableElement) {
    active = true;
  }
}

function dragEnd(event) {
  initialX = currentX;
  initialY = currentY;

  active = false;
  setTimeout(resetDalay, currentTimeDalay);
}

function drag(event) {
  if (active) {
      
    event.preventDefault();

    if (event.type === "touchmove") {
      currentX = e.touches[0].clientX - initialX;
      currentY = e.touches[0].clientY - initialY;
    } 
    else if (event.type === "mousemove"){
      currentX = event.clientX - initialX;
      currentY = event.clientY - initialY;
    }

    xOffset = currentX;
    yOffset = currentY;

    setTimeout(setTranslate, currentTimeDalay, currentX, currentY, movableElement);
    setTimeout(increaseDalay, currentTimeDalay);

  }
}

function increaseDalay() {
    if (currentTimeDalay != maxTimeDelayMs) {
        currentTimeDalay += 1;
    }
}

/*
  A function that resets the current delay 
  to a minimum. Used when the user has 
  released the object.
*/

function resetDalay() {
    currentTimeDalay = minTimeDelayMs;
}

function setTranslate(xPos, yPos, el) {
  el.style.transform = "translate3d(" + xPos + "px, " + yPos + "px, 0)";
}