var $openPopup = document.querySelectorAll(".open-popup");
var $wrapper = document.querySelectorAll(".wrapper");
var $popup = document.querySelectorAll(".popup");
var $openButtonOne = document.querySelector("#open-button-one");
var $openButtonTwo = document.querySelector("#open-button-two");
var $popupOne = document.querySelector("#popup-one");
var $popupTwo = document.querySelector("#popup-two");

function popupToggle(popupId) {
  if (popupId.classList.contains("show-wrapper")) {
    popupId.classList.remove("show-wrapper");
  } else {
    popupId.classList.add("show-wrapper");
  }
}

$openButtonOne.addEventListener("click", function () {
  popupToggle($popupOne);
});

$openButtonTwo.addEventListener("click", function () {
  popupToggle($popupTwo);
});

for (let elem of $wrapper) {
  elem.addEventListener("click", function () {
    popupToggle(this);
  });
  elem.firstElementChild.firstElementChild.firstElementChild.addEventListener(
    "click",
    function () {
      popupToggle(elem);
    }
  );
  for (let item of $popup) {
    item.addEventListener("click", function () {
      event.stopPropagation();
    });
  }
}
