const abt = document.querySelector('.about');
const pro = document.querySelector('.products');
const con = document.querySelector('.contact');

async function formSubmit(form, thisForm) {
  form.preventDefault();
  const image = document.querySelector('#file');
  if (image.files[0]) {
    const uploadImage = await AddFile(image.files[0]);
    if (uploadImage) {
      document.forms.addProduct.image.value = uploadImage;
      document.forms.addProduct.imageRef.value = window.imageRef;
      if (document.querySelector('.pd').value.length > 170) {
        alert('Product description should be below 170 characters');
      } else {
        thisForm.submit();
      }
    }
  } else {
    alert('Please upload an Image');
  }
  return false;
}
async function formSubmitEdit(form, thisForm) {
  let uploadImage = false;
  form.preventDefault();
  const image = document.querySelector('#fileEdit');
  if (image.files[0]) {
    uploadImage = await AddFile(image.files[0]);
  }
  if (true) {
    if (uploadImage) {
      document.forms.editProduct.image.value = uploadImage;
      document.forms.editProduct.imageRef.value = window.imageRef;
    }

    if (document.querySelector('.pd').value.length > 170) {
      alert('Product description should be below 170 characters');
    } else {
      thisForm.submit();
    }
  }

  return false;
}

function resetColor() {
  document.querySelector('.btn-abt').style.backgroundColor = 'transparent';
  document.querySelector('.btn-abt').style.color = 'white';
  document.querySelector('.btn-pro').style.backgroundColor = 'transparent';
  document.querySelector('.btn-pro').style.color = 'white';
  document.querySelector('.btn-con').style.backgroundColor = 'transparent';
  document.querySelector('.btn-con').style.color = 'white';
}
document.querySelector('.btn-abt').addEventListener('click', () => {
  document.location.hash = '';
  abt.style.display = 'block';
  pro.style.display = 'none';
  con.style.display = 'none';
  resetColor();
  document.querySelector('.btn-abt').style.backgroundColor = 'white';
  document.querySelector('.btn-abt').style.color = 'var(--dark-violet)';
});
document.querySelector('.btn-pro').addEventListener('click', () => {
  document.location.hash = 'products';
  abt.style.display = 'none';
  pro.style.display = 'grid';
  con.style.display = 'none';
  resetColor();
  document.querySelector('.btn-pro').style.backgroundColor = 'white';
  document.querySelector('.btn-pro').style.color = 'var(--dark-violet)';
});
document.querySelector('.btn-con').addEventListener('click', () => {
  document.location.hash = 'contact';
  abt.style.display = 'none';
  pro.style.display = 'none';
  con.style.display = 'grid';
  resetColor();
  document.querySelector('.btn-con').style.backgroundColor = 'white';
  document.querySelector('.btn-con').style.color = 'var(--dark-violet)';
});

const edit = document.querySelector('.company-edit');
const isEditing = false;

edit.addEventListener('click', () => {
  window.location = '/member/edit';
});

document.querySelector('.new-entry-cross').addEventListener('click', () => {
  document.querySelector('.new-entry-modal-cont').style.display = 'none';
});
document
  .querySelector('.new-entry-modal-cont')
  .addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      document.querySelector('.new-entry-modal-cont').style.display = 'none';
    }
  });
document.querySelector('.new-entry-submit').addEventListener('click', () => {
  const productName = document.querySelector('.pn').value;
  const productPrice = document.querySelector('.pp').value;

  // fetch sendingObject
});

document
  .querySelector('.new-edit .new-entry-cross')
  .addEventListener('click', () => {
    document.querySelector('.new-edit.new-entry-modal-cont').style.display = 'none';
  });
document
  .querySelector('.new-edit.new-entry-modal-cont')
  .addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      document.querySelector('.new-edit.new-entry-modal-cont').style.display = 'none';
    }
  });

const inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, (input) => {
  const label = input.nextElementSibling;
  const labelVal = label.innerHTML;

  input.addEventListener('change', (e) => {
    let fileName = '';
    // if( this.files && this.files.length > 1 )
    // fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    // else
    fileName = e.target.value.split('\\').pop();

    if (fileName) {
      label.innerHTML = fileName;
    }
  });
});
const inputs2 = document.querySelectorAll('.inp2');
Array.prototype.forEach.call(inputs2, (input) => {
  const label = input.nextElementSibling;
  const labelVal = label.innerHTML;

  input.addEventListener('change', (e) => {
    let fileName = '';
    // if( this.files && this.files.length > 1 )
    // 	fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    // else
    fileName = e.target.value.split('\\').pop();

    if (fileName) {
      label.innerText = fileName;
    }
  });
});

if (window.location.href.split('#')[1] === 'contact') {
  resetColor();
  abt.style.display = 'none';
  pro.style.display = 'none';
  con.style.display = 'grid';
  resetColor();
  document.querySelector('.btn-con').style.backgroundColor = 'white';
  document.querySelector('.btn-con').style.color = 'var(--dark-violet)';
} else if (window.location.href.split('#')[1] === 'products') {
  resetColor();
  document.querySelector('.btn-pro').addEventListener('click', () => {
    abt.style.display = 'none';
    pro.style.display = 'grid';
    con.style.display = 'none';
    resetColor();
    document.querySelector('.btn-pro').style.backgroundColor = 'white';
    document.querySelector('.btn-pro').style.color = 'var(--dark-violet)';
  });
}

document.querySelector('.cp-link-button').addEventListener('click', () => {
  // console.log("show iv");
  document.querySelector('.change-p-modal-cont').style.display = 'grid';
});

document.querySelector('.change-p-cross').addEventListener('click', () => {
  document.querySelectorAll('.feed-text').forEach((x) => {
    x.innerHTML = '';
  });
  document.querySelector('.change-p-modal-cont').style.display = 'none';
});
document
  .querySelector('.change-p-modal-cont')
  .addEventListener('click', (event) => {
    if (event.target === event.currentTarget) {
      document.querySelectorAll('.feed-text').forEach((x) => {
        x.innerHTML = '';
      });
      document.querySelector('.change-p-modal-cont').style.display = 'none';
    }
  });
document.querySelector('.change-p-submit').addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.text-inp-cont').forEach((x) => {
    x.querySelector('.feed-text').innerHTML = '';
  });
  const currPass = document.querySelector('.curp').value;
  const newPass = document.querySelector('.newp').value;
  const currEmail = userEmail;
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/x-www-form-urlencoded');

  const urlencoded = new URLSearchParams();
  urlencoded.append('email', currEmail);
  urlencoded.append('password', currPass);
  urlencoded.append('newPassword', newPass);
  const data = {
    email: currEmail,
    password: currPass,
    newPassword: newPass
  };

  const requestOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  };
  fetch('/member/updatePassword', requestOptions)
    .then((response) => response.text())
    .then((result) => {
      if (result === 'true') {
        document.querySelector('.change-p-modal-cont').style.display = 'none';
      } else {
        document.querySelector('.curp-cont .feed-text').innerHTML = 'Incorrect Password';
      }
    })
    .catch((error) => console.log('error', error));
});
