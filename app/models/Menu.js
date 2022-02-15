import { MonAn } from '../models/MonAn.js'

export class Menu {
    mangMonAn =  [];// [{...},{...}]


    constructor () {

    }

    themMonAn = (monAnMoi) => {

        // Bất kì lệnh nào trong khối try xảy ra lỗi => hủy không chạy tiếp mà sẽ chạy và catch
        try {
            this.mangMonAn.push(monAnMoi)
        } catch(ex) {
            console.log(ex)
            return false
        }

        // Nếu không có lỗi thì return là true
        return true;
    }

    xoaMon = (maMonAnClick) => {
        // findIndex: hàm tìm 1 giá trị trong mảng thoẳ với arrow function. Nếu tìm thấy thì trả về vị trí phần tử đó trong mảng, tìm không thấy
        //

        let indexXoa = this.mangMonAn.findIndex(monAn => monAn.maMon === maMonAnClick)

        if (indexXoa !== -1) {
            this.mangMonAn.splice(indexXoa, 1)

            return true;
        }

        return false


        // khi xóa t hì mình sẽ xóa dòng món ăn trong menu  
        // Cách tìm ra phần tử trong mảng
    }

    capNhatMonAn = function  (maMonAnClick, monAnUpdate) {
        // For in giúp duyệt qua từng key của object

        let monAn = this.layThongTinMonAn(maMonAnClick)

        if (monAn) {// Nếu có món ăn đó
            // Duyệt qua từng key của object món ăn
            for (let tenThuocTinh in monAn) {
                // truyền lại giá trị của monAnCapNhat cho monAn\
                monAn[tenThuocTinh] = monAnUpdate[tenThuocTinh]
            }
            
        }

        this.saveMenu()// save món ăn mới cập nhật vào localStorage
    }


    layThongTinMonAn = function (maMon) {
        // find: hàm tìm 1 giá trị trong mảng thỏa với arrow function tương tự như findIndex => kết quả trả về là giá trị hoặc object nếu tìm thấy
        // tìm không thấy thì trả về là undefinded

        let monAn = this.mangMonAn.find(monAn => monAn.maMon === maMon)


        // Nếu món ăn tồn tại thì trả về món ăn
        if (monAn) {
            return monAn
        }

        return undefined;// không thì trả về là undefined
    }

    timKiemMonAn = () => {
        

        // Mảng chứa danh sách tìm kiếm

    }

    // Lưu LocalStorage
    saveMenu = function () {
        let sMenu = JSON.stringify(this.mangMonAn);// Biến thz chuỗi để lưu vào JSON
        localStorage.setItem('menu', sMenu)
    }

    getMenu = function () {
         // Nếu có localStorage thì ta mới lấy dữ liệu ra
        if (localStorage.getItem('menu')) {
        // Lấy dữ liệu từ localStorage gán vào mangMonAn của đối tượng menu
        this.mangMonAn = JSON.parse(localStorage.getItem('menu'));// Biến chuỗi menu trong JSON thành lại object

        // // sau đó render ra giao diện 
        // renderTableMonAn(menu.mangMonAn); // Hàm render giao diện món ăn sẽ viết riêng ra
    }
    }

    // Viết hàm lọc món ăn
    locMonAn = function (maLoaiMenu) {
        if (maLoaiMenu === 'all' || maLoaiMenu === '') {

            // Nếu maLoaiMenu là all hoặc rỗng thì trả về nguyên mảng món ăn ban đầu
            return this.mangMonAn
        }
        let mangMonAn = this.mangMonAn.filter(sp => sp.maLoai == maLoaiMenu)

        return  mangMonAn;

    }


    // Xử lý menu.mangMonAn viết hàm hiển thị dữ liệu ra giao diện
    //  renderTableMonAn = function (mangMonAn, selectorRender)  {

    // // hiển thị nó ra giao diện
    // // Lặp qua mảng món ăn
    
    // let content = '';

    // for (let monAnLocal of mangMonAn) {

    //     // Tạo đối tượng menu mới lấy ra được phương thức giá khuyến mãi

    //     let monAn = new MonAn();

    //     monAn = {...monAn, ...monAnLocal}; // lấy giá trị sau của monAnLocal đè lên monAn trước và trong đó có phương thức tinhGiaKhuyenMai của 
    //     // object monAn

    //     console.log(monAn)
    //     content += `
    //         <tr>
    //             <td>${monAn.maMon}</td>
    //             <td>${monAn.tenMon}</td>
    //             <td>${monAn.loaiMon}</td>
    //             <td>${monAn.giaMon}</td>
    //             <td>${monAn.khuyenMai}</td>
    //             <td>${monAn.tinhGiaKhuyenMai()}</td>
    //             <td>${monAn.tenTinhTrang}</td>

    //             <td>
    //                 <button class="btn btn-primary" onclick="suaMonAn('${monAn.maMon}')">Sửa</button>
    //                 <button class="btn btn-danger ml-2" onclick="xoaMonAn('${monAn.maMon}')">Xóa</button>
    //             </td>
    //         </tr>
    //     `
    // }

    // document.querySelector(selectorRender).innerHTML = content;
    // return content
    // }
} 