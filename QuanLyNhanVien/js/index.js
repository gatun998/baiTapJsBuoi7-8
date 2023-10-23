// Cách 1
var arrIdInput = [
    "tknv",
    "name",
    "email",
    "password",
    "datepicker",
    "luongCB",
    "chucvu",
    "gioLam"

]

var arrNhanVien = []
// Tạo Hàm lấy dữ liệu ngươi dùng
// function getValueNhanVien() {
//     // debugger
//     var nhanVien = new NhanVien()

//     // chạy vòng lặp
//     for (let i = 0; i < arrIdInput.length; i++) {
//         // mỗi lần vòng lặp chạy sẽ lấy ra cho ta 1 cái id ở bên trong mảng
//         var valueInput = document.getElementById(arrIdInput[i]).value;
//         // console.log("valueInput", valueInput);
//         nhanVien[arrIdInput[i]] = valueInput
//     }
//     console.log("nhanVien", nhanVien);


//     arrNhanVien.push(nhanVien)
//     console.log("arrNhanVien", arrNhanVien);

//     var content = ""
//     for (let z = 0; z < arrNhanVien.length; z++) {
//         var valueNhanVien = arrNhanVien[z]
//         content += `
//             <tr>
//                 <td>${valueNhanVien.tknv}</td>
//                 <td>${valueNhanVien.name}</td>
//                 <td>${valueNhanVien.email}</td>
//                 <td>${valueNhanVien.password}</td>
//                 <td>${valueNhanVien.datepicker}</td>
//                 <td>${valueNhanVien.luongCB}</td>
//                 <td>${valueNhanVien.chucvu}</td>
//                 <td>${valueNhanVien.gioLam}</td>
//                 <td></td>
//             </tr>
//         `
//     }
//     console.log("content", content);
//     document.getElementById('tableDanhSach').innerHTML = content


// }

// document.getElementById("btnThemNV").onclick = getValueNhanVien


// Cách 2:
document.getElementById("btnThemNV").addEventListener('click',
    function getValueNhanVien() {
        // sử dụng onSubmit => trang reload lại nên xài preventDefault
        event.preventDefault();
        var nhanVien = new NhanVien()

        // Khởi tạo biến boolean cho các điều kiện kiểm tra
        var isValid = true;

        // Kiểm tra tài khoản
        var taiKhoan = document.getElementById("tknv").value;
        if (taiKhoan.length < 4 || taiKhoan.length > 6 || taiKhoan.trim() === "") {
            alert("Tài khoản phải có từ 4 đến 6 ký số và không được để trống.");
            isValid = false;
        }

        // Kiểm tra tên nhân viên
        var tenNhanVien = document.getElementById("name").value;
        if (!tenNhanVien.match(/^[A-Za-z\s]+$/) || tenNhanVien.trim() === "") {
            alert("Tên nhân viên phải là chữ và không được để trống.");
            isValid = false;
        }

        // Kiểm tra email
        var email = document.getElementById("email").value;
        var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        if (!email.match(emailPattern) || email.trim() === "") {
            alert("Email phải đúng định dạng và không được để trống.");
            isValid = false;
        }

        // Kiểm tra mật khẩu
        var matKhau = document.getElementById("password").value;
        if (matKhau.length < 6 || matKhau.length > 10 || matKhau.trim() === "") {
            alert("Mật khẩu phải từ 6 đến 10 ký tự và không được để trống.");
            isValid = false;
        }

        var matKhauPattern = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (!matKhau.match(matKhauPattern)) {
            alert("Mật khẩu phải chứa ít nhất 1 ký tự số, 1 ký tự in hoa, và 1 ký tự đặc biệt.");
            isValid = false;
        }
        // Thêm các kiểm tra khác ở đây (ngày làm, , chức vụ, số giờ làm)

        // kiểm tra ngày làm
        var ngayLam = document.getElementById('datepicker').value;
        if (ngayLam.trim() === "") {
            alert("Ngày làm không được để trống.")
            isValid = false
        } else {
            // Kiểm tra định dạng mm/dd/yyyy bằng biểu thức chính quy
            //https://stackoverflow.com/questions/15196451/regular-expression-to-validate-datetime-format-mm-dd-yyyy
            var datePattern = /^\d{2}\/\d{2}\/\d{4}$/;
            if (!ngayLam.match(datePattern)) {
                alert("Ngày làm phải có định dạng mm/dd/yyyy.");
                isValid = false;
            } else {
                // Kiểm tra tính hợp lệ của ngày bằng đối tượng Date
                var dateParts = ngayLam.split("/");
                var month = parseInt(dateParts[0]);
                var day = parseInt(dateParts[1]);
                var year = parseInt(dateParts[2]);
                var validDate = new Date(year, month - 1, day); // Month is 0-based
                if (isNaN(validDate.getTime())) {
                    alert("Ngày làm không hợp lệ.");
                    isValid = false;
                }
            }

        }

        // kiểm tra lương cơ bản
        var luongCB = parseFloat(document.getElementById("luongCB").value);
        if (isNaN(luongCB) || luongCB < 1000000 || luongCB > 20000000) {
            alert("Lương cơ bản phải nằm trong khoảng từ 1,000,000 đến 20,000,000 và không được để trống.");
            isValid = false;
        }

        // kiểm tra chức vụ 
        var chucVu = document.getElementById("chucvu").value;
        if (chucVu !== "Sếp" && chucVu !== "Trưởng Phòng" && chucVu !== "Nhân Viên") {
            alert("Vui lòng chọn một chức vụ hợp lệ (Sếp, Trưởng Phòng, Nhân Viên).");
            isValid = false;
        }

        // kiểm tra giờ làm
        var gioLam = parseInt(document.getElementById("gioLam").value);
        if (isNaN(gioLam) || gioLam < 80 || gioLam > 200) {
            alert("Số giờ làm trong tháng phải nằm trong khoảng từ 80 đến 200 giờ và không được để trống.");
            isValid = false;
        }

        // chạy vòng lặp
        for (let i = 0; i < arrIdInput.length; i++) {
            // mỗi lần vòng lặp chạy sẽ lấy ra cho ta 1 cái id ở bên trong mảng
            var valueInput = document.getElementById(arrIdInput[i]).value;
            // console.log("valueInput", valueInput);
            nhanVien[arrIdInput[i]] = valueInput
        }
        console.log("nhanVien", nhanVien);

        // Nếu tất cả điều kiện đều đúng, thêm dữ liệu và hiển thị
        if (isValid) {

            // Thêm đối tượng nhanVien vào mảng arrNhanVien
            arrNhanVien.push(nhanVien)
            console.log("arrNhanVien", arrNhanVien);

            // Lưu mảng arrNhanVien vào localStorage
            localStorage.setItem('arrNhanVien', JSON.stringify(arrNhanVien));


            // Hiển thị dữ liệu trên trang
            displayNhanVienData();


            document.getElementById('formQLNV').reset()
        }
    }
)


function displayNhanVienData(arr) {
    if (arr == undefined) {
        arr = arrNhanVien
    }
    var content = "";
    for (let z = 0; z < arr.length; z++) {
        var valueNhanVien = arr[z];
        content += `
            <tr>
                <td>${valueNhanVien.tknv}</td>
                <td>${valueNhanVien.name}</td>
                <td>${valueNhanVien.email}</td>
                <td>${valueNhanVien.datepicker}</td>
                <td>${valueNhanVien.chucvu}</td>
                <td>${valueNhanVien.tinhTongLuong()}</td>
                <td>${valueNhanVien.xepLoai()}</td>
            <td>
                <button onclick="deleteNhanVien('${valueNhanVien.tknv}')" class="btn btn-danger">Xóa</button>
                <button class="btn btn-dark">Sửa</button>
            </td>
            </tr>
        `;
    }

    document.getElementById('tableDanhSach').innerHTML = content;
}

// -----------------------Chức Năng Xóa Nhân Viên-----------------------------
function deleteNhanVien(maNV) {
    console.log("Tôi là Xóa");
    console.log("maNV", maNV);
    var index = -1
    for (let i = 0; i < arrNhanVien.length; i++) {
        var nhanVien = arrNhanVien[i]
        if (nhanVien.tknv = maNV) {
            console.log("i", i);
            index = i
        }
    }

    if (index != -1) {
        arrNhanVien.splice(index, 1)
        // gọi hàm render giao diện để update dữ liệu mới lên giao diện
        displayNhanVienData()
    }

}
