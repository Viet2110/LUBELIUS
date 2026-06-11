const listElement = document.querySelectorAll(".left .element");
const listItem = document.querySelectorAll("ul .item");
const listArrow = document.querySelector(".left .muasam .muiten");
const menu = document.querySelector(".left .menu");
const listBox = document.querySelectorAll(".box");
const listPlant = document.querySelectorAll(".right .plant");
const imgFile = document.querySelector(".right .imgfile")
const loGin = document.getElementById("logout");

loGin.addEventListener("click",  ()=>{
    window.location.href = "login.html";
})

listArrow.addEventListener("click", () => {
    listElement.forEach(p => {
        p.classList.toggle("d-none");
        menu.classList.toggle("menu");
    })
});

// listItem chay forEach (item,index) => item add event log index
listItem.forEach((item, index) => {
    item.addEventListener("click", () => {
        listBox.forEach(e => e.style.display = "none");
        listBox[index].style.display = "block";
        localStorage.setItem("index", index);
    });
});

const index = localStorage.getItem("index");
if (index) {
    listBox[index].style.display = "block";
}
