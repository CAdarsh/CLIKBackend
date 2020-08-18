let formSubmit = document.querySelector(".subm");
formSubmit.addEventListener("click", async (e) => {
  document.querySelectorAll(".feed-text").forEach((x) => {
    x.innerHTML = "";
  });
  e.preventDefault();
  console.log("click");
  let data = {
    email: document.querySelector(".text-inp-email").value,
    name: document.querySelector(".text-inp-name").value,
    buisnessName: document.querySelector(".text-inp-bname").value,
    title: document.querySelector(".text-inp-bname").value,
    phone: document.querySelector(".text-inp-phone").value,
    password: document.querySelector(".text-inp-password").value,
    cpassword: document.querySelector(".text-inp-cpassword").value,
    slug: document.querySelector(".text-inp-route").value,
  };
  if (
    !data.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    document.querySelector(".em-text .feed-text").innerHTML =
      "Enter a valid email address";
    return;
  }
  console.log("cleared 1");
  if (data.buisnessName === "") {
    document.querySelector(".bn-text .feed-text").innerHTML =
      "This field is required";
    return;
  }
  if (data.name === "") {
    document.querySelector(".n-text .feed-text").innerHTML =
      "This field is required";
    return;
  }
  if (data.slug === "") {
    document.querySelector(".sl-text .feed-text").innerHTML =
      "This field is required";
    return;
  }
  let fResult = await fetch(`/member/slug/${data.slug}`);
  let resp = await fResult.json();
  console.log(resp.result);
  if (resp.result === 0) {
    document.querySelector(".sl-text .feed-text").innerHTML =
      "This slug is already taken";
    return;
  }
  if (data.password === "") {
    document.querySelector(".p-text .feed-text").innerHTML =
      "This field is required";
    return;
  }
  if (!data.phone.match(/^\d+$/)) {
    document.querySelector(".ph-text .feed-text").innerHTML =
      "This field should contain only digits";
    console.log("phone");
    return;
  }
  if (data.password !== data.cpassword) {
    document.querySelector(".cp-text .feed-text").innerHTML =
      "Password doesn't match";
    return;
  }
  console.log("cleared feedback");
  if (token) {
    fetch("/admin/register", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      mode: "cors",
    })
      .then((data) => data.text())
      .then((token) => {
        console.log(token);
        //    sessionStorage.setItem("token",`${token}`);
        window.location = "/admin";
      })
      .catch((err) => console.log(err));
  }
});
