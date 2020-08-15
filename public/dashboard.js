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

document.querySelector(".new-entry-submit").addEventListener("click", () => {
  let companyName = document.querySelector(".cn").value;
  let name = document.querySelector(".nm").value;
  let location = document.querySelector(".ln").value;
  let slug = document.querySelector(".sl").value;
  let activeSince = document.querySelector(".as").value;
  let email = document.querySelector(".em").value;
  let sendingObject = {
    companyName,
    name,
    location,
    slug,
    activeSince,
    email,
  };
  //fetch sendingObject
});
