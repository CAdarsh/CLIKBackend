const abt = document.querySelector(".about");
const pro = document.querySelector(".products");
const con = document.querySelector(".contact");
function resetColor() {
  document.querySelector(".btn-abt").style.backgroundColor = "transparent";
  document.querySelector(".btn-abt").style.color = "white";
  document.querySelector(".btn-pro").style.backgroundColor = "transparent";
  document.querySelector(".btn-pro").style.color = "white";
  document.querySelector(".btn-con").style.backgroundColor = "transparent";
  document.querySelector(".btn-con").style.color = "white";
}
document.querySelector(".btn-abt").addEventListener("click", () => {
  abt.style.display = "block";
  pro.style.display = "none";
  con.style.display = "none";
  resetColor();
  document.querySelector(".btn-abt").style.backgroundColor = "white";
  document.querySelector(".btn-abt").style.color = "var(--dark-violet)";
});
document.querySelector(".btn-pro").addEventListener("click", () => {
  abt.style.display = "none";
  pro.style.display = "grid";
  con.style.display = "none";
  resetColor();
  document.querySelector(".btn-pro").style.backgroundColor = "white";
  document.querySelector(".btn-pro").style.color = "var(--dark-violet)";
});
document.querySelector(".btn-con").addEventListener("click", () => {
  abt.style.display = "none";
  pro.style.display = "none";
  con.style.display = "grid";
  resetColor();
  document.querySelector(".btn-con").style.backgroundColor = "white";
  document.querySelector(".btn-con").style.color = "var(--dark-violet)";
});

var inputs = document.querySelectorAll(".inputfile");
Array.prototype.forEach.call(inputs, function (input) {
  var label = input.nextElementSibling,
    labelVal = label.innerHTML;

  input.addEventListener("change", function (e) {
    var fileName = "";
    // if( this.files && this.files.length > 1 )
    // 	fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
    // else
    fileName = e.target.value.split("\\").pop();

    if (fileName) label.innerText = fileName;
    else label.innerHTML = labelVal;
  });
});

document.querySelector(".add-product-btn").addEventListener("click", () => {
  document.querySelector(".new-entry-modal-cont").style.display = "grid";
});
document.querySelector(".new-entry-cross").addEventListener("click", () => {
  document.querySelector(".new-entry-modal-cont").style.display = "none";
});
document
  .querySelector(".new-entry-modal-cont")
  .addEventListener("click", (event) => {
    if (event.target === event.currentTarget) {
      document.querySelector(".new-entry-modal-cont").style.display = "none";
    }
  });
document.querySelector(".new-entry-submit").addEventListener("click", () => {
  let productName = document.querySelector(".pn").value;
  let productPrice = document.querySelector(".pp").value;

  let sendingObject = {
    productName,
    productPrice,
  };
  //fetch sendingObject
});
