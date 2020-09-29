const modalOpen = false;
function deleteUser(id) {
  const adminToken = sessionStorage.getItem('adminToken');
  if (adminToken) {
    const myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${adminToken}`);
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({ id });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('/admin/deleteMember', requestOptions)
      .then((response) => response.text())
      .then((result) => console.log(result))
      .then(() => (window.location = '/admin'))
      .catch((error) => console.log('error', error));
  }
}

fetch('/member/all')
  .then((res) => res.json())
  .then((data) => {
    document.querySelector('.spinner').style.display = 'none';
    data.forEach((member) => {
      const a = `<div class="firm-row">
      <div class="one">${member.title}</div>
      <div class="two">${member.location}</div>
      <div class="three">${member.bEmail}</div>
      <div class="vpnd">
        <div class="viewp" data-password="${member.password}">
          (View Password)
        </div>
        <img onclick="deleteUser('${member._id}')" src="/images/delete.svg" alt="delete" class="delete-member"/>
      </div>
      </div>`;
      document.querySelector('.newContent').innerHTML += a;
    });
    console.log(document.querySelector('.newContent').innerHTML);
  })
  .then(() => {
    document.querySelectorAll('.viewp').forEach((x) => {
      x.addEventListener('click', () => {
        const password = x.getAttribute('data-password');
        x.innerHTML = password;
        x.style.textAlign = 'center';
        x.style.color = 'black';
      });
    });
  });
document.querySelector('.add-btn').addEventListener('click', () => {
  // console.log("show iv");
  document.querySelector('.new-entry-modal-cont').style.display = 'grid';
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

document
  .querySelector('.new-entry-submit')
  .addEventListener('click', async (e) => {
    e.preventDefault();
    document.querySelectorAll('.text-inp-cont').forEach((x) => {
      x.querySelector('.feed-text').innerHTML = '';
    });
    const buisnessName = document.querySelector('.cn').value;
    const slug = document.querySelector('.sl').value;
    const phone = document.querySelector('.pn').value;
    const email = document.querySelector('.em').value;
    const password = document.querySelector('.pa').value;
    if (
      buisnessName === ''
      || slug === ''
      || phone === ''
      || email === ''
      || password === ''
    ) {
      return;
    }
    const sendingObject = {
      buisnessName,
      password,
      slug,
      phone,
      email,
    };
    fetch(`/member/slug/${slug}`)
      .then((x) => x.json())
      .then((y) => {
        if (y.result === 0) {
          document.querySelector('.slug-inp-cont .feed-text').innerHTML = 'This Slug is taken';
          return;
        }
        // fetch sendingObject

        const adminToken = sessionStorage.getItem('adminToken');
        if (adminToken) {
          const myHeaders = new Headers();
          myHeaders.append('Authorization', `Bearer ${adminToken}`);
          myHeaders.append('Content-Type', 'application/json');

          const raw = JSON.stringify(sendingObject);

          const requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
          };

          fetch('/admin/register', requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .then(() => {
              window.location = '/admin';
            })
            .catch((error) => console.log('error', error));
        } else {
          window.location = '/admin';
        }
      });
  });

document.querySelector('.cp-button').addEventListener('click', () => {
  // console.log("show iv");
  document.querySelector('.change-p-modal-cont').style.display = 'grid';
});

document.querySelector('.cp-header-link').addEventListener('click', () => {
  // console.log("show iv");
  document.querySelector('.change-p-modal-cont').style.display = 'grid';
  document.querySelector('.side').style.left = '-100%';
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
  const currEmail = '123@gmail.com';
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

  fetch('/admin/changePassword', requestOptions)
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
