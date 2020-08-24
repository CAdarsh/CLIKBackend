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
      .then((data) => {
        if (data.result == 1 || window.initialSlug == slugValue) {
          document.forms.main.token.value = token;
          if (form.csdesc.value.length > 150) {
            form.csdesc.value = form.csdesc.value.substring(0, 149) + "...";
            console.log(form.csdesc.value);
          }
          form.submit();
        } else {
          document.querySelector(".slug-feed").style.display = "block";
        }
      });
  } catch (e) {
    throw new Error(e);
  }
  return false;
};
