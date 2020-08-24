let modalOpen = false;
fetch("/member/all")
  .then((res) => res.json())
  .then((data) => {
    document.querySelector(".spinner").style.display = "none";
    data.forEach((member) => {
      let a = `<div class="firm-row">
      <div class="one">${member.title}</div>
      <div class="two">${member.location}</div>
      <div class="three">${member.bEmail}</div>
      </div>`;
      document.querySelector(".newContent").innerHTML += a;
    });
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
    let buisnessName = document.querySelector(".cn").value;
    let slug = document.querySelector(".sl").value;
    let phone = document.querySelector(".pn").value;
    let email = document.querySelector(".em").value;
    let password = document.querySelector(".pa").value;
    let sendingObject = {
      buisnessName,
      password,
      slug,
      phone,
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

        let adminToken = sessionStorage.getItem("adminToken");
        if (adminToken) {
          var myHeaders = new Headers();
          myHeaders.append("Authorization", `Bearer ${adminToken}`);
          myHeaders.append("Content-Type", "application/json");

          var raw = JSON.stringify(sendingObject);

          var requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
            redirect: "follow",
          };

          fetch("/admin/register", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .then(() => {
              window.location = "/admin";
            })
            .catch((error) => console.log("error", error));
        } else {
          window.location = "/admin";
        }
      });
  });
