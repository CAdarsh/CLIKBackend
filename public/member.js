// let edit = document.querySelector(".edit-button");
// let isEditing = false;

// document.querySelector(".edit-button").addEventListener("click", async () => {
//   isEditing = !isEditing;
//   if (isEditing) {
//     document.querySelector(".inp-tags").style.display = "flex";
//     document.designMode = "on";
//     edit.innerHTML = "Submit";
//     document.querySelector(".show-upload").style.display = "grid";
//   } else {
//     document.querySelector(".slug-feed").style.display = "none";
//     let initialSlug = document
//       .querySelector(".slug")
//       .getAttribute("data-dslug");
//     let title = document.querySelector(".info-name").innerHTML;
//     let content = document.querySelector(".info-actual-text").innerHTML;
//     let location = document.querySelector(".location").innerHTML;
//     let website = document.querySelector(".website").value;
//     let bPhone = document.querySelector(".phone").value;
//     let bEmail = document.querySelector(".email").value;
//     let slug = document.querySelector(".slug").value;
//     let imageFile = document.querySelector(".image-file-up");
//     if (slug !== initialSlug) {
//       let fResult = await fetch(`/member/slug/${slug}`);
//       let resp = await fResult.json();

//       if (resp.result === 0) {
//         document.querySelector(".slug-feed").style.display = "block";
//         return;
//       }
//     }
//     // return;
//     let sendingObject = {
//       slug,
//       content,
//       bEmail,
//       bPhone,
//       website,
//       title,
//       location,
//     };

//     let token = sessionStorage.getItem("token");
//     let formData = new FormData();
//     formData.append("myImage", imageFile.files[0]);

//     if (token && token != "undefined") {
//       console.log("yes" + token);
//       var myHeaders = new Headers();
//       myHeaders.append("Authorization", `Bearer ${token}`);
//       myHeaders.append("contents", JSON.stringify(sendingObject));
//       var requestOptions = {
//         method: "POST",
//         headers: myHeaders,
//         body: formData,
//       };
//       delete requestOptions.headers["Content-Type"];
//       fetch("/member/details", requestOptions)
//         .then((response) => response.json())
//         .then((result) => {
//           ChangeData(result);
//         })
//         .then(() => {
//           window.location = "/member/edit";
//         })
//         .catch((error) => console.log("error", error));
//     } else {
//       window.location = "/member";
//     }
//     document.designMode = "off";
//     document.querySelector(".inp-tags").style.display = "none";
//     edit.innerHTML = "Edit";
//     document.querySelector(".edit-feed").style.display = "grid";
//     document.querySelector(".show-upload").style.display = "none";
//     setTimeout(() => {
//       document.querySelector(".edit-feed").style.display = "none";
//     }, 3000);
//   }
// });

const abt = document.querySelector(".about");
const pro = document.querySelector(".products");
const con = document.querySelector(".contact");
function resetColor() {
  document.querySelector(".btn-abt").style.backgroundColor = "transparent";
  document.querySelector(".btn-abt").style.color = "white";
  document.querySelector(".btn-pro").style.backgroundColor = "transparent";
  document.querySelector(".btn-pro").style.color = "white";
  document.querySelector(".btn-con").style.backgroundColor = "transparent";
  document.querySelector(".btn-con").style.color = "white";
}
document.querySelector(".btn-abt").addEventListener("click", () => {
  abt.style.display = "block";
  pro.style.display = "none";
  con.style.display = "none";
  resetColor();
  document.querySelector(".btn-abt").style.backgroundColor = "white";
  document.querySelector(".btn-abt").style.color = "var(--dark-violet)";
});
document.querySelector(".btn-pro").addEventListener("click", () => {
  abt.style.display = "none";
  pro.style.display = "grid";
  con.style.display = "none";
  resetColor();
  document.querySelector(".btn-pro").style.backgroundColor = "white";
  document.querySelector(".btn-pro").style.color = "var(--dark-violet)";
});
document.querySelector(".btn-con").addEventListener("click", () => {
  abt.style.display = "none";
  pro.style.display = "none";
  con.style.display = "grid";
  resetColor();
  document.querySelector(".btn-con").style.backgroundColor = "white";
  document.querySelector(".btn-con").style.color = "var(--dark-violet)";
});

const edit = document.querySelector(".company-edit");
const isEditing = false;

edit.addEventListener("click", () => {
  window.location = "/member/edit";
});

document.querySelector(".add-product-btn").addEventListener("click", () => {
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
  let productName = document.querySelector(".pn").value;
  let productPrice = document.querySelector(".pp").value;

  let sendingObject = {
    productName,
    productPrice,
  };

  //fetch sendingObject
});

var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener("change", function (e) {
    var fileName = "";
    // if( this.files && this.files.length > 1 )
    // 	fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    // else
    fileName = e.target.value.split("\\").pop();

    if (fileName) label.innerText = fileName;
    else label.innerHTML = labelVal;
  });
});
