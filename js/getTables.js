
async function showTable() {

    const data = await getAll(URL_TABLE);

    const listTable = document.querySelector(".right .tables");
    const select = document.getElementById("choose");

    data.forEach((item, index) => {
        if (!item.status) {
            select.innerHTML += ` <option value="${item.id}">Table ${item.id}</option>`
        }
        const img = item.status ? "../image/table.png" : "../image/tabletrue.png";
        const people = item.status ? `<button onClick=showBooking(${item.id})  data-bs-toggle="modal" data-bs-target="#booking" class="b3 border border-0  p-2 mt-2 rounded-3 d-block m-auto ">
                                        <li><i class="fa-solid fa-calendar-plus"></i>BOOKING</li>
                                    </button>` : ` <div class="cha d-flex justify-content-center gap-3 mt-2">
                                        <button onClick=showAdd(${item.id}) class="b1 py-2 px-3 text-white border border-0 rounded-3"><i
                                                class="fa-solid fa-plus"></i>ADD</button>
                                        <button onClick=showCard(${item.id}) data-bs-toggle="modal" data-bs-target="#card" class="b2 py-2 px-3 text-white border border-0 rounded-3"><i
                                                class="fa-solid fa-cart-shopping"></i>CART</button>
                                    </div>`;
        listTable.innerHTML +=
            ` <div class="col">
                            <div class="card h-100">
                                <div class="card-body p-3 ">
                                    <span class="number">${item.id}</span>
                                    <div class="card-img">
                                        <img src=${img} alt="">
                                    </div>
                                    ${people}
                                </div>
                            </div>
                        </div>`;
    });
}
showTable();

function showAdd(id) {
    const select = document.getElementById("choose");
    listBox[1].style.display = "none";
    listBox[2].style.display = "block";
    select.value = id;
}
const a = document.querySelector(".number1");
function showBooking(id) {
    a.innerText = id;
}
const booking = document.getElementById("dat");
const customerName = document.getElementById("customername");
const quantity = document.getElementById("quantity");

booking.addEventListener("click", () => {
    const newBooking = {
        "id": a.innerText,
        "customerName": customerName.value,
        "quantity": quantity.value,
        "status": false
    }
    edit(URL_TABLE, newBooking);
})
const r = document.querySelector(".number3");
async function showCard(id) {
    r.innerText = id;
    const data = await getAll(URL_ORDER);
    const dataFood = await getAll(URL_FOOD);
    const a = data.find(e => e.id == r.innerText);
    const b = document.getElementById("icard");
    b.innerHTML = "";
    let total = 0;
    a.bill.forEach((e, index) => {
        const food = dataFood.find(p => p.id == e.idFood);
        total += parseFloat(e.quantity) * parseFloat(food.price);
        b.innerHTML += `<tr>
                                <th scope="row">1</th>
                                <td>${food.name}</td>
                                <td><img class="w-25" src="${food.image}" alt=""></td>
                                <td>${food.price}</td>
                                <td>${e.quantity}</td>
                            </tr>
                            `
    })
    b.innerHTML += `<tfoot>
                        <th colspan="4">Total</th>
                        <th id="sotien">${total}</th>
                    </tfoot>`
}

const imG = document.querySelector(".right .box-img");
const imgMenu = document.querySelector(".right .fileBox");
imG.addEventListener("click", () => {
    imgMenu.classList.toggle("d-none");
})
const paynow = document.getElementById("thanhtoan");
const table = document.getElementById("banmay");


paynow.addEventListener("click", async () => {
    const data = await getAll(URL_ORDER);
    const order = data.find(e => e.id == table.innerText);
    const toTal = document.getElementById("sotien");

    const updateTable = {
        "id": table.innerText,
        "customerName": "",
        "quantity": 0,
        "status": true
    }

    edit(URL_TABLE, updateTable); // update table
    deleted(URL_ORDER, table.innerText); // delete order  
    const bill = {
        "idTable": table.innerText,
        "bill": order.bill,
        "total": toTal.innerText,
        "creatAt": new Date()
    }
    console.log(bill);

    add(URL_PAYBILL, bill);
});