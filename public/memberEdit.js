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

  document.querySelector(
    ".show-upload"
  ).style.backgroundImage = `url('${image}')`;

  console.log(data);
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
      console.log(result);
      ChangeData(result);
    })
    .catch((error) => console.log("error", error));
} else {
  window.location = "/member";
}

document.querySelector(".submit-but").addEventListener("click", async () => {
  document.querySelectorAll(".feed-text").forEach((x) => {
    x.display = "none";
  });
  let name = document.querySelector(".cname").value;
  let location = document.querySelector(".cloc").value;
  let address = document.querySelector(".caddress").value;
  let sdesc = document.querySelector(".csdesc").value;
  let desc = document.querySelector(".cdesc").value;
  let phone = document.querySelector(".cphone").value;
  let emial = document.querySelector(".cemail").value;
  let website = document.querySelector(".cwebsite").value;
  let slug = document.querySelector(".cslug").value;
  let fResult = await fetch(`/member/slug/${slug}`);
  console.log(fResult);
  let resp = await fResult.json();
  if (resp.result === 0) {
    document.querySelector(".slug-feed").display = "block";
    return;
  }
});
