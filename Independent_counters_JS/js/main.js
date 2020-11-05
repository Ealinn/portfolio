var $square = document.querySelectorAll(".square");
$square.forEach(function (item) {
  var $buttonPlus = item.querySelector(".button-plus");
  var $buttonMinus = item.querySelector(".button-minus");
  var $counter = item.querySelector(".counter");
  $buttonPlus.addEventListener("click", function () {
    $counter.textContent++;
  });
  $buttonMinus.addEventListener("click", function () {
    $counter.textContent--;
  });
});
