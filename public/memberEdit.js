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
  } = data;
  document.querySelector('.info-name').innerHTML = title;
  // document.querySelector(".slug").value = slug;
  // document.querySelector(".slug").setAttribute("data-dslug", slug);
  document.querySelector('.location').innerHTML = location;
  document.querySelector('.contact-email').href = `mailto:${bEmail}`;
  document.querySelector('.contact-website').href = website;
  document.querySelector('.contact-phone').href = `tel:+${bPhone}`;
  document.querySelector('.about-text').innerHTML = content;
  console.log(data);
}
const token = sessionStorage.getItem('token');
if (token && token != 'undefined') {
  const myHeaders = new Headers();
  myHeaders.append('Authorization', `Bearer ${token}`);

  const raw = '';

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow',
  };

  fetch('/member/details', requestOptions)
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      ChangeData(result);
    })
    .catch((error) => console.log('error', error));
} else {
  window.location = '/member';
}

const abt = document.querySelector('.about');
const pro = document.querySelector('.products');
const con = document.querySelector('.contact');
function resetColor() {
  document.querySelector('.company-nav-button .btn-abt').style.backgroundColor = 'transparent';
  document.querySelector('.company-nav-button .btn-abt').style.color = 'white';
  document.querySelector('.btn-pro').style.backgroundColor = 'transparent';
  document.querySelector('.btn-pro').style.color = 'white';
  document.querySelector('.btn-con').style.backgroundColor = 'transparent';
  document.querySelector('.btn-con').style.color = 'white';
}
console.log(document.querySelector('.btn-abt'));
document.querySelector('.btn-abt').addEventListener('click', () => {
  abt.style.display = 'block';
  pro.style.display = 'none';
  con.style.display = 'none';
  resetColor();
  document.querySelector('.btn-abt').style.backgroundColor = 'white';
  document.querySelector('.btn-abt').style.color = 'var(--dark-violet)';
});
document.querySelector('.btn-pro').addEventListener('click', () => {
  abt.style.display = 'none';
  pro.style.display = 'grid';
  con.style.display = 'none';
  resetColor();
  document.querySelector('.btn-pro').style.backgroundColor = 'white';
  document.querySelector('.btn-pro').style.color = 'var(--dark-violet)';
});
document.querySelector('.btn-con').addEventListener('click', () => {
  abt.style.display = 'none';
  pro.style.display = 'none';
  con.style.display = 'grid';
  resetColor();
  document.querySelector('.btn-con').style.backgroundColor = 'white';
  document.querySelector('.btn-con').style.color = 'var(--dark-violet)';
});

const edit = document.querySelector('.company-edit');

edit.addEventListener('click', () => {
  const inputArea = document.querySelector('.about-text-n');
  inputArea.classList.toggle('show');
});
// window.location = '/member/edit';
//   isEditing = !isEditing;
//   if (isEditing) {
//     // document.querySelector(".inp-tags").style.display = "flex";
//     document.designMode = 'on';
//     edit.innerHTML = 'Submit';
//     // document.querySelector(".show-upload").style.display = "grid";
//   } else {
//     const compName = document.querySelector('.company-name').innerHTML;
//     const compDesc = document.querySelector('.about-text').innerHTML;
//     const compLoca = document.querySelector('.company-loc').innerHTML;
//     const compAddress = document.querySelector('.contact-address').innerHTML;
//     const compPhone = document.querySelector('.contact-phone').innerText;
//     const compWeb = document.querySelector('.contact-website').innerText;
//     const compEmail = document.querySelector('.contact-email').innerText;
//     const sendingObject = {
//       compName,
//       compDesc,
//       compLoca,
//       compAddress,
//       compWeb,
//       compPhone,
//       compEmail,
//     };
//     // do fetch here
//     document.designMode = 'off';
//     edit.innerHTML = 'Edit';
//     document.querySelector('.edit-feedback').style.display = 'block';
//     console.log(document.querySelector('.edit-feedback').style.display);
//     setTimeout(() => {
//       document.querySelector('.edit-feedback').style.display = 'none';
//     }, 3000);
//   }
// });

const lp = document.querySelector('.last-prod');
lp.addEventListener('click', () => {});
