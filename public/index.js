document.querySelector(".ham").addEventListener("click", () => {
  document.querySelector(".side").style.left = "0px";
});
document.querySelector(".close-side").addEventListener("click", () => {
  document.querySelector(".side").style.left = "-100%";
});
