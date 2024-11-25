
addEventListener("DOMContentLoaded", () => {
    const hoursInput = document.getElementById("hours");
    const minutesInput = document.getElementById("minutes");
    const secondsInput = document.getElementById("seconds");
    const startButton = document.getElementById("start-button");
    const pauseButton = document.getElementById("pause-button");
    const resetButton = document.getElementById("reset-button");
    const countdown = document.getElementById("countdown");
    let currentTimeout, hours, minutes, seconds;
    let pauseCounter = { hours: 0, minutes: 0, seconds: 0 };
    let hasBeenPaused = false;

    pauseButton.style.display = "none";
    resetButton.style.display = "none";

    startButton.addEventListener("click", () => {

        hours = parseInt(hoursInput.value) || 0;
        minutes = parseInt(minutesInput.value) || 0;
        seconds = parseInt(secondsInput.value) || 0;

        console.log("hours:", hours, "minutes:", minutes, "seconds:", seconds);
        console.log("pauseCounter:", pauseCounter);

        if (hasBeenPaused) {
            hours = pauseCounter.hours;
            minutes = pauseCounter.minutes;
            seconds = pauseCounter.seconds;

            console.log("seconds:", seconds);
            console.log("pauseCounter:", pauseCounter);
            hasBeenPaused = false;
        }

        hoursInput.style.display = "none";
        minutesInput.style.display = "none";
        secondsInput.style.display = "none";
        startButton.style.display = "none";
        pauseButton.style.display = "block";
        resetButton.style.display = "block";

        clearInterval(currentTimeout);

        currentTimeout = setInterval(() => {

            if (hours === 0 && minutes === 0 && seconds === 0) {
                countdown.innerHTML = "Finished.";
                clearInterval(currentTimeout);
                return;
            }
            console.log("seconds variable type:", typeof seconds);

            if (seconds === 0) { // Counts down the seconds. 
                if (minutes > 0) { // 0:1:0
                    minutes--;
                    seconds = 59;

                } else if (hours > 0) { // 2:2:0
                    hours--;
                    minutes = 59;
                    seconds = 59;
                }

            } else {
                seconds--;
            }

            if (seconds >= 60) {
                minutes = minutes + Math.floor(seconds / 60);
                seconds = seconds % 60;
            }

            if (minutes >= 60) {
                hours = hours + Math.floor(minutes / 60);
                minutes = minutes % 60;
            }

            countdown.innerHTML = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

        }, 1000);

    });


    pauseButton.addEventListener("click", () => {
        startButton.style.display = "block";
        pauseButton.style.display = "none";
        hasBeenPaused = true;

        clearInterval(currentTimeout);
        pauseCounter = { hours, minutes, seconds };

    })

    resetButton.addEventListener("click", () => {
        location.reload();
    })


});
