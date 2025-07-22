const startButton = document.getElementById("startButton");
const timeInput = document.getElementById("timeInput");
const timersContainer = document.getElementById("timersContainer");

startButton.addEventListener("click", () => {
    const input = timeInput.value.trim();
    const totalSeconds = parseTimeToSeconds(input);

    if (totalSeconds === null) {
        alert("Введіть чаc в форматі MM:SS");
        return;
    }

    createTimer(totalSeconds);
    timeInput.value = "";
});

window.addEventListener("DOMContentLoaded", () => {
    const defaultTime = "01:25";
    const seconds = parseTimeToSeconds(defaultTime);
    if (seconds !== null) {
        createTimer(seconds);
    }
});

function createTimer(startTime) {
    let remaining = startTime;
    let intervalId = null;

    const timerCard = document.createElement("div");
    timerCard.className = "card p-3 d-flex flex-row justify-content-between align-items-center gap-3 flex-wrap";

    const timeDisplay = document.createElement("span");
    timeDisplay.className = "fs-4";
    timeDisplay.textContent = formatTime(remaining);

    const buttonGroup = document.createElement("div");
    buttonGroup.className = "d-flex gap-2 ms-auto";

    const stopButton = document.createElement("button");
    stopButton.className = "btn btn-danger btn-sm";
    stopButton.textContent = "Stop";

    const resumeButton = document.createElement("button");
    resumeButton.className = "btn btn-success btn-sm";
    resumeButton.textContent = "Resume";
    resumeButton.disabled = true;

    const deleteButton = document.createElement("button");
    deleteButton.className = "btn btn-warning btn-sm";
    deleteButton.textContent = "Delete";

    buttonGroup.appendChild(stopButton);
    buttonGroup.appendChild(resumeButton);
    buttonGroup.appendChild(deleteButton);

    timerCard.appendChild(timeDisplay);
    timerCard.appendChild(buttonGroup);
    timersContainer.appendChild(timerCard);

    function updateTime() {
        remaining--;
        timeDisplay.textContent = formatTime(remaining);

        if (remaining <= 0) {
            clearInterval(intervalId);
            timeDisplay.textContent = "00:00";
            stopButton.disabled = true;
            resumeButton.disabled = true;
        }
    }

    function startInterval() {
        intervalId = setInterval(updateTime, 1000);
    }

    startInterval();

    stopButton.addEventListener("click", () => {
        clearInterval(intervalId);
        stopButton.disabled = true;
        resumeButton.disabled = false;
    });

    resumeButton.addEventListener("click", () => {
        startInterval();
        stopButton.disabled = false;
        resumeButton.disabled = true;
    });

    deleteButton.addEventListener("click", () => {
        clearInterval(intervalId);
        timerCard.remove();
    });
}

function formatTime(seconds) {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    return `${min}:${sec}`;
}

function parseTimeToSeconds(timeStr) {
    const match = timeStr.match(/^(\d{1,2}):(\d{2})$/);
    if (!match) return null;
    const minutes = parseInt(match[1], 10);
    const seconds = parseInt(match[2], 10);
    return minutes * 60 + seconds;
}