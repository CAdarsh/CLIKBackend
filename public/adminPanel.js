let modalOpen = false;
document.querySelector(".add-btn").addEventListener("click", () => {
  modalOpen = !modalOpen;
  if (modalOpen) {
  } else {
  }
});

document.querySelector(".add-btn").addEventListener("click", () => {
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
  document.querySelector(".slug-feed").style.display = "none";
  let companyName = document.querySelector(".cn").value;
  let name = document.querySelector(".nm").value;
  let location = document.querySelector(".ln").value;
  let slug = document.querySelector(".sl").value;
  let address = document.querySelector(".ad").value;
  let email = document.querySelector(".em").value;
  let sendingObject = {
    companyName,
    name,
    location,
    slug,
    address,
    email,
  };
  //check slug already exists
  //document.querySelector('.slug-feed').style.display='block';
  //fetch sendingObject
});
