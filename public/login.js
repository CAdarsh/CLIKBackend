let formButton = document.querySelector(".subm");

formButton.addEventListener("click",(e)=>{
    e.preventDefault();
    let data = {
        email: document.querySelector(".text-inp-email").value,
        password: document.querySelector(".text-inp-pass").value
    };
    var requestOptions = {
        method: 'post',
        headers: {
            "Content-Type": "application/json"
        },
        redirect: 'follow',
        body: JSON.stringify(data)
  };
    fetch('/member/login',requestOptions)
        .then(response => response.json())
        .then(data => {
            if(data.code == 403){
                console.log("Bad request")
            }
            else{
                sessionStorage.setItem("token",data.token);
                console.log("Hellso")
                window.location = "http://localhost:5000/member/edit";
            }
        })

})