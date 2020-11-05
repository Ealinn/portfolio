var sec = 0;
var timerSetInt;
var stopwatchText = document.getElementById("stopwatch").childNodes[0];
var startActive = false;

var buttonStart = document.querySelector(".start");

buttonStart.addEventListener("click", function () {
  if (startActive === false) {
    timerSetInt = setInterval(function () {
      sec++;
      stopwatchText.nodeValue = sec;
    }, 1000);
    startActive = true;
  }
});

var buttonStop = document.querySelector(".stop");
buttonStop.addEventListener("click", function () {
  clearInterval(timerSetInt);
  startActive = false;
});

var buttonClear = document.querySelector(".clear");
buttonClear.addEventListener("click", function () {
  clearInterval(timerSetInt);
  sec = 0;
  stopwatchText.nodeValue = sec;
  startActive = false;
});
