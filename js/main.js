const iconMenu = document.querySelector(".icon-menu");
const overLay = document.querySelector(".responsive-sidebar-menu .overlay");

iconMenu.addEventListener("click", function () {
  document.querySelector(".responsive-sidebar-menu").classList.add("active");
});

overLay.addEventListener("click", function () {
  document.querySelector(".responsive-sidebar-menu").classList.remove("active");
});
