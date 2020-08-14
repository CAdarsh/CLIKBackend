document.querySelector(".new-entry").addEventListener("click", () => {
  document.querySelector(".new-entry-modal-cont").style.display = "grid";
});
document.querySelector(".new-entry-cross").addEventListener("click", () => {
  document.querySelector(".new-entry-modal-cont").style.display = "none";
});
document
  .querySelector(".new-entry-modal-cont")
  .addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      document.querySelector(".new-entry-modal-cont").style.display = "none";
    }
  });
