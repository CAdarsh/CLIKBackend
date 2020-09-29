let changeClicked = false;
window.onload = () => {
  console.log(document.querySelector(".change-button"));
  document.querySelector(".change-p").addEventListener("click", (e) => {
    e.preventDefault();
    document.querySelectorAll(".ty").forEach((x) => {
      x.style.transform = "none";
    });
    changeClicked = true;
    document.querySelectorAll(".c-pass-before").forEach((x) => {
      x.style.display = "block";
    });
    document.querySelectorAll(".c-pass-visible").forEach((x) => {
      x.style.display = "none";
    });
  });
  document.querySelector(".ipassword").addEventListener("focus", (e) => {
    e.preventDefault();
    document.querySelectorAll(".ty").forEach((x) => {
      x.style.transform = "none";
    });
    changeClicked = true;
    document.querySelectorAll(".c-pass-before").forEach((x) => {
      x.style.display = "block";
    });
    document.querySelectorAll(".c-pass-visible").forEach((x) => {
      x.style.display = "none";
    });
  });
  document.querySelector(".submit-but").addEventListener("click", (e) => {
    if (changeClicked) {
      e.preventDefault();

      let currPass = document.querySelector(".cpassword").value;
      let newPass = document.querySelector(".npassword").value;
      let currEmail = document.querySelector(".cemail").value;
      console.log(currPass, newPass);
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      var urlencoded = new URLSearchParams();
      urlencoded.append("email", currEmail);
      urlencoded.append("password", currPass);
      urlencoded.append("newPassword", newPass);

      var requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: urlencoded,
        redirect: "follow",
      };
      fetch("/member/changePassword", requestOptions)
        .then((response) => response.text())
        .then((result) => {
          if (result === "true") {
            document.querySelector("form").submit();
            window.location = "/member/page";
          } else {
            alert("Password Incorrect");
          }
        })
        .catch((error) => console.log("error", error));
    }
  });
};

function ChangeData(data) {
  const {
    content,
    bEmail,
    bPhone,
    website,
    title,
    location,
    slug,
    image,
    tagline,
  } = data;
  document.querySelector(".cname").value = title;
  document.querySelector(".cloc").value = location;
  document.querySelector(".caddress").value = location;
  document.querySelector(".csdesc").value = tagline;
  document.querySelector(".cdesc").value = content;
  document.querySelector(".cphone").value = bPhone;
  document.querySelector(".cemail").value = bEmail;
  document.querySelector(".cwebsite").value = website;
  document.querySelector(".cslug").value = slug;

  document.querySelector(".show-upload").style.backgroundImage = `url('${
    image.split("\\")[1]
  }/${image.split("\\")[2]}')`;
  return slug;
}

const token = sessionStorage.getItem("token");
if (token && token != "undefined") {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${token}`);

  const raw = "";

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  fetch("/member/details", requestOptions)
    .then((response) => response.json())
    .then((result) => {
      document.querySelector(".spinner").style.display = "none";
      window.initialSlug = ChangeData(result);
    })
    .catch((error) => console.log("error", error));
} else {
  window.location = "/member";
}

const slugUnique = async (event, form) => {
  event.preventDefault();
  document.querySelector(".slug-feed").style.display = "none";
  try {
    const slugValue = document.forms.main.cslug.value;
    fetch(`/member/slug/${slugValue}`)
      .then((data) => data.json())
      .then(async (data) => {
        if (data.result == 1 || window.initialSlug == slugValue) {
          if (document.querySelector("#image-upload").files[0]) {
            const image = await AddFile(
              document.querySelector("#image-upload").files[0]
            );
            if (image != undefined) {
              document.forms.main.token.value = token;
              document.forms.main.image.value = image;
              document.forms.main.imageRef.value = window.fileName;
              if (form.csdesc.value.length > 130) {
                form.csdesc.value = `${form.csdesc.value.substring(0, 130)}...`;
              }
              form.submit();
            } else {
              console.log("Hey");
            }
          } else {
            document.forms.main.token.value = token;
            form.submit();
          }
        } else {
          document.querySelector(".slug-feed").style.display = "block";
        }
      });
  } catch (e) {
    throw new Error(e);
  }
  return false;
};
