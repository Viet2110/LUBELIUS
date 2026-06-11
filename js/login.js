const enter = document.getElementById("nhap");
const eMail = document.getElementById("mail");
const passWord = document.getElementById("pword");

enter.addEventListener("click", async (e)=>{
     e.preventDefault(); // ngăn chăn hanh dong mac dinh chuyen trang cua the form
    const data = await getAll(URL_PROFILE);

    if(eMail.value == data.email && passWord.value == data.password){
        console.log("Thành công");
        window.location.href = "project.html";
    }else {
        alert("Thất bại");
    }
})