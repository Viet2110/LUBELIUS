async function showFood() {
    const data = await getAll(URL_FOOD);
    const listFood = document.querySelector(".right .foods");
    data.forEach((item, index) => {
        const dish = document.createElement("div");
        dish.classList.add("col");
        dish.innerHTML += ` <div class="card">
                                        <div class="card-body p-3">
                                            <div class="tren d-flex justify-content-between align-items-center ">
                                                <span class="number">${item.id}</span>
                                                <p class="mb-0 fw-bold text-center">${item.name}</p>
                                                <div  class="d-flex gap-2 text-danger">
                                                    <i data-bs-toggle="modal" data-bs-target="#addfood" onclick=showEdit(${item.id}) class="fa-solid fa-pen-to-square"></i>
                                                    <i data-bs-toggle="modal" data-bs-target="#delete" onClick=showDelete(${item.id}) class="fa-solid fa-trash-can"></i>
                                                </div>
                                            </div>
                                            <div class="box-img animate__animated animate__shakeY">
                                                <img src=${item.image} alt="">
                                            </div>
                                            <p class="mb-0 text-center text-danger">${item.price}$</p>
                                            <div class="duoi d-flex justify-content-center align-items-center gap-2 mt-2">
                                                <li class="one"><i class="fa-solid fa-minus"></i></li>
                                                <input class="quantity" value="0"  type="text" >
                                                <li class="two"><i class="fa-solid fa-plus"></i></li>
                                            </div>
                                        </div>
                                    </div>`
        listFood.appendChild(dish);
        const one = dish.querySelector(".one");
        const two = dish.querySelector(".two");
        const quantity = dish.querySelector(".quantity");
        one.addEventListener("click", () => {
            if (quantity.value > 0) {
                quantity.value = parseInt(quantity.value) - 1;
            }
        })
        two.addEventListener("click", () => {
            quantity.value = parseInt(quantity.value) + 1;
        })
    });
}
showFood();

const Order = document.getElementById("order");
Order.addEventListener("click", async () => {
    const select = document.getElementById("choose");
    if (!select.value) {
        alert("Vui lòng chọn bàn");
        return;
    }
    const data = await getAll(URL_ORDER);
    const orderOld = data.find(b => b.id == select.value);

    const listCol = document.querySelectorAll(".chonmon .col");
    const bill = orderOld ? orderOld.bill : [];
    listCol.forEach(item => {
        const quantity = item.querySelector(".quantity");
        if (quantity.value > 0) {
            const idFood = item.querySelector(".number");
            const indexFood = bill.findIndex(e => e.idFood == idFood.innerText);
            if (indexFood == -1) {
                bill.push({
                    idFood: idFood.innerText,
                    quantity: quantity.value
                })
            } else {
                bill[indexFood].quantity = parseInt(bill[indexFood].quantity) + parseInt(quantity.value);
            }
        }
    });

    const newOrder = {
        "id": select.value,
        "bill": bill
    }
    if(bill.length == 0){
        alert("Vui lòng chọn món ăn");
        return ;
    }
    if (orderOld) {
        edit(URL_ORDER, newOrder);
    } else {
        add(URL_ORDER, newOrder);
    }

});

const foodName = document.getElementById("foodname");
const price = document.getElementById("price");
const imgfile = document.getElementById("imgfile");
const upload = document.getElementById("upload");
const image = document.getElementById("imgage");
const deleTe = document.getElementById("dlete");
const addfood = document.getElementById("add");
const t = document.querySelector(".number2");
let idEdit;

let fileFood;

imgfile.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e) => {
        image.src = e.target.result;
    }
    fileFood = file;
})

deleTe.addEventListener("click", () => {
    deleted(URL_FOOD, t.innerText);
})


upload.addEventListener("click", async () => {
    const urlimg = await uploadImageToCloudinary(fileFood);
    const data = await getAll(URL_FOOD);
    let id = 1;
    data.forEach(e => {
        if (e.id == id) {
            id++;
        } else {
            return;
        }
    })
    const uploadfood = {
        "id": idEdit ? idEdit : id,
        "name": foodName.value,
        "image": urlimg,
        "price": price.value
    }
    if (idEdit) {
        edit(URL_FOOD, uploadfood);
    } else {
        add(URL_FOOD, uploadfood);
    }
});


function showDelete(id) {
    t.innerText = id;
}

async function showEdit(id) {
    idEdit = id;
    const data = await getAll(URL_FOOD);
    const food = data.find(e => e.id == id);
    foodName.value = food.name;
    price.value = food.price;
    image.src = food.image;
    addfood.innerText = "Edit Food";
}

