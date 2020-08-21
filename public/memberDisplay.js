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
