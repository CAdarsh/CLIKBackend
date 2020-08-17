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
    let title = document.querySelector(".info-name").innerHTML;
    let content = document.querySelector(".info-actual-text").innerHTML;
    let location = document.querySelector(".location").innerHTML;
    let website = document.querySelector(".website").value;
    let bPhone = document.querySelector(".phone").value;
    let bEmail = document.querySelector(".email").value;
    let slug = document.querySelector(".slug").value;
    let imageFile = document.querySelector(".image-file-up");
    let sendingObject = {
      slug,
      content,
      bEmail,
      bPhone,
      website,
      title,
      location,
    };

    let token = sessionStorage.getItem("token");
    let formData = new FormData();
    formData.append("myImage", imageFile.files[0]);

    if (token && token != "undefined") {
      console.log("yes" + token);
      var myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);
      myHeaders.append("contents", JSON.stringify(sendingObject));
      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: formData,
      };
      delete requestOptions.headers["Content-Type"];
      fetch("/member/details", requestOptions)
        .then((response) => response.json())
        .then((result) => {
          ChangeData(result);
        })
        .then(() => {
          window.location = "/member/edit";
        })
        .catch((error) => console.log("error", error));
    } else {
      window.location = "/member";
    }
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
