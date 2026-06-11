async function showbill() {
    const data = await getAll(URL_PAYBILL);
    const dataFood = await getAll(URL_FOOD);
    const listTable = document.querySelector(".showpayBill");

    data.forEach((item, index) => {
        const dish = document.createElement("div");
        dish.classList.add("col");
        dish.innerHTML = `<div class="col">
                            <div class="card px-0">
                                <div class="card-header m-0 bg-success text-white fw-bold fs-5">Bàn số : ${item.idTable}</div>
                                <div class="card-body">
                                    <div class="row row-cols-2 show-food g-1">
                                    </div>
                                    <hr>
                                    <div class="d-flex align-items-center gap-2">
                                        <h6 class="mb-0">Tổng cộng: ${item.total}</h6>
                                        <p class="mb-0">Thanh toán lúc: ${convertToVNTime(item.creatAt)} </p>
                                    </div>
                                </div>
                            </div>
                        </div>`;
        const until = dish.querySelector(".show-food");
        item.bill.forEach(y =>{
            const w = dataFood.find(e=> e.id == y.idFood);
            until.innerHTML += `<p class="mb-0 col">${w.name} x ${y.quantity} = ${w.price*y.quantity}$</p>`
        })
        listTable.appendChild(dish);
    });

}
showbill();

function convertToVNTime(isoString) {
    return new Date(isoString).toLocaleString("vi-VN", {
        timeZone: "Asia/Ho_Chi_Minh"
    });
}