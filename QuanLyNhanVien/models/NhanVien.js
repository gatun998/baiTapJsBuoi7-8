// B1: Khởi tạo đối tượng Nhân Viên

function NhanVien() {
    this.tknv = "";
    this.name = "";
    this.email = "";
    this.password = "";
    this.datepicker = "";
    this.luongCB = "";
    this.chucvu = "";
    this.gioLam = "";

    this.tinhTongLuong = function () {
        var tongLuong = 0;
        if (this.chucvu === "Sếp") {
            tongLuong = this.luongCB * 3;
        } else if (this.chucvu === "Trưởng Phòng") {
            tongLuong = this.luongCB * 2;
        } else if (this.chucvu === "Nhân Viên") {
            tongLuong = this.luongCB;
        }
        return tongLuong;
    };
    this.xepLoai = function () {
        if (this.gioLam >= 192) {
            return "Xuất sắc";
        } else if (this.gioLam >= 176) {
            return "Giỏi";
        } else if (this.gioLam >= 160) {
            return "Khá";
        } else {
            return "Trung bình";
        }
    };
}