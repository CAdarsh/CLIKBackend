let modalOpen = false;
fetch("/member/all")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(".spinner").style.display = "none";
    let addData = data.map((member) => {
      return `<div class="firm-row">
      <div class="one">${member.title}</div>
      <div class="two">${member.location}</div>
      <div class="three">${member.bEmail}</div>
      </div>`;
    });
    document.querySelector(".newContent").innerHTML += addData;
    console.log(document.querySelector(".newContent").innerHTML);
  });
document.querySelector(".add-btn").addEventListener("click", () => {
  // console.log("show iv");
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

document
  .querySelector(".new-entry-submit")
  .addEventListener("click", async () => {
    document.querySelector(".slug-feed").style.display = "none";
    let companyName = document.querySelector(".cn").value;
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
    fetch(`/member/slug/${slug}`)
      .then((x) => {
        return x.json();
      })
      .then((y) => {
        if (y.result === 0) {
          document.querySelector(".slug-feed").style.display = "block";
          return;
        }
        //fetch sendingObject
      });
  });
