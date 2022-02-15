export class MonAn {
    maMon = '';
    tenMon = '';
    loaiMon = '';
    maLoai = '';
    giaMon = 0;
    khuyenMai = 0;
    tenTinhTrang = '';
    maTinhTrang = 0;
    hinhAnh = '';
    moTa = '';

    constructor() {

    }


    // Cái style viết method là viết theo arrow function
    tinhGiaKhuyenMai = function () {
        return this.giaMon - (this.giaMon * this.khuyenMai / 100);
    }

    // Mô hình cây thực mục là MVC

    // Tên file xử lý trong controllers đặt tên trùng với tên giao diện trong view để maintaince code cho dễ
}