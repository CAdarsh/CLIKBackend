const formButton = document.querySelector('.subm');

formButton.addEventListener('click', (e) => {
  e.preventDefault();
  document.querySelectorAll('.feed-text').forEach((x) => {
    x.innerHTML = '';
  });
  const data = {
    email: document.querySelectorAll('.text-inp')[0].value,
    password: document.querySelectorAll('.text-inp')[1].value,
  };
  if (data.email === '') {
    document.querySelector('.e-text .feed-text').innerHTML = 'This field is required';
    return;
  }
  if (
    !data.email.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    document.querySelector('.e-text .feed-text').innerHTML = 'Enter a valid email address';
    return;
  }
  if (data.password === '') {
    document.querySelector('.p-text .feed-text').innerHTML = 'This field is required';
    return;
  }
  const requestOptions = {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    redirect: 'follow',
    body: JSON.stringify(data),
  };

  fetch('/member/login', requestOptions)
    .then((response) => response.json())
    .then((data) => {
      if (data.status == 403) {
        alert('Bad request');
        document.querySelector('.feed-text-error').innerHTML = 'Invalid email and password';
      } else if (data.status == 200) {
        alert(data);
        sessionStorage.setItem('token', data.token);
        console.log('Hellso');
        window.location = '/member/page';
      }
    });
});
