const listElement = document.querySelectorAll(".left .element");
const listItem = document.querySelectorAll(".left .item");
const listArrow = document.querySelector(".left .muasam .muiten");

listArrow.addEventListener("click", ()=>{
    listElement.forEach(p=> {
       p.classList.toggle("d-none");
    })
});
