let formSubmit = document.querySelector(".subm");


formSubmit.addEventListener("click",(e)=>{
    e.preventDefault();
    let data = {
        email: document.querySelector(".text-inp-email").value,
        name: document.querySelector(".text-inp-name").value,
        buisnessName: document.querySelector(".text-inp-bname").value,
        phone: document.querySelector(".text-inp-phone").value,
        password: document.querySelector(".text-inp-password").value,
        slug: document.querySelector(".text-inp-route").value
    }
fetch("/admin/register",{
        method: "POST",
        body: JSON.stringify(data),
        headers: {
            "Content-Type" : "application/json"
        },
        mode: "cors"
    }).then(data=>data.text())
    .then(token=>{
           console.log("token");
           console.log(token);
           sessionStorage.setItem("token",`${token}`);
       })
       .catch(err=>console.log(err));

})