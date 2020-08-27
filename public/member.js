const abt = document.querySelector('.about');
const pro = document.querySelector('.products');
const con = document.querySelector('.contact');
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

const inputs = document.querySelectorAll('.inputfile');
Array.prototype.forEach.call(inputs, (input) => {
  const label = input.nextElementSibling;
  const labelVal = label.innerHTML;

  input.addEventListener('change', (e) => {
    let fileName = '';
    // if( this.files && this.files.length > 1 )
    // 	fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    // else
    fileName = e.target.value.split('\\').pop();

    if (fileName) label.innerText = fileName;
    else label.innerHTML = labelVal;
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
