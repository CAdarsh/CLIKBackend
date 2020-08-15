let edit = document.querySelector(".edit-button");
let isEditing = false;

document.querySelector(".edit-button").addEventListener("click", () => {
  isEditing = !isEditing;
  if (isEditing) {
    document.querySelector(".inp-tags").style.display = "flex";
    document.designMode = "on";
    edit.innerHTML = "Submit";
    document.querySelector(".show-upload").style.display = "grid";
  } else {
    let compName = document.querySelector(".info-name").innerHTML;
    let compDesc = document.querySelector(".info-actual-text").innerHTML;
    let compLoca = document.querySelector(".location").innerHTML;
    let compWeb = document.querySelector(".website").value;
    let compPhone = document.querySelector(".phone").value;
    let compEmail = document.querySelector(".email").value;
    let sendingObject = {
      compName,
      compDesc,
      compLoca,
      compWeb,
      compPhone,
      compEmail,
    };
    //do fetch here
    console.log(compName, compDesc, compLoca, compWeb, compPhone, compEmail);
    document.designMode = "off";
    document.querySelector(".inp-tags").style.display = "none";
    edit.innerHTML = "Edit";
    document.querySelector(".edit-feed").style.display = "grid";
    document.querySelector(".show-upload").style.display = "none";
    setTimeout(() => {
      document.querySelector(".edit-feed").style.display = "none";
    }, 3000);
  }
});
