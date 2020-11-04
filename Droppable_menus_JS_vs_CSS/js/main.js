const $lis = document.querySelectorAll(".menu-item-js");

$lis.forEach((el) => {
  el.addEventListener("click", () => {
    const $submenu = el.querySelector(".submenu-wrapper");

    $lis.forEach((item) => {
      if (el !== item) {
        item
          .querySelector(".submenu-wrapper")
          .classList.remove("show-submenu-js");
      }
    });
    $submenu.classList.toggle("show-submenu-js");
  });
});
