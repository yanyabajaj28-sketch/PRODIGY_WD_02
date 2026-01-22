let startTime = 0;
let elapsed = 0;
let timer = null;
let running = false;

const display = document.getElementById("display");
const lapsContainer = document.getElementById("laps");

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  const centiseconds = Math.floor((ms % 1000) / 10);

  return (
    String(minutes).padStart(2, "0") + ":" +
    String(seconds).padStart(2, "0") + ":" +
    String(centiseconds).padStart(2, "0")
  );
}

function updateTime() {
  elapsed = Date.now() - startTime;
  display.textContent = formatTime(elapsed);
}

// START
document.getElementById("start").addEventListener("click", () => {
  if (!running) {
    startTime = Date.now() - elapsed;
    timer = setInterval(updateTime, 10);
    running = true;
  }
});

// PAUSE
document.getElementById("pause").addEventListener("click", () => {
  if (running) {
    clearInterval(timer);
    running = false;
  }
});

// LAP
document.getElementById("lap").addEventListener("click", () => {
  if (running) {
    const lap = document.createElement("div");
    lap.textContent = "Lap – " + formatTime(elapsed);
    lapsContainer.prepend(lap);
  }
});

// RESET
document.getElementById("reset").addEventListener("click", () => {
  clearInterval(timer);
  elapsed = 0;
  running = false;
  display.textContent = "00:00:00";
  lapsContainer.innerHTML = "";
});