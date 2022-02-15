// Lấy localStorage  ra gán dữ liệu vào
import { Menu } from '../models/Menu.js'
import { MonAn } from '../models/MonAn.js';








let menu = new Menu();
// Lấy dữ liệu từ localStorage về
menu.getMenu();

// Cách 1 viết hàm render ở controllers
// menu.renderTableMonAn(menu.mangMonAn, 'tbody');

// hoặc cách 2 là viết hàm render thẳng vào Menu


// Lấy dữ liệu từ localStorage

// function getLocalStorage() {

//     // Nếu có localStorage thì ta mới lấy dữ liệu ra
//     if (localStorage.getItem('menu')) {
//         // Lấy dữ liệu từ localStorage gán vào mangMonAn của đối tượng menu
//         menu.mangMonAn = JSON.parse(localStorage.getItem('menu'));// Biến chuỗi menu trong JSON thành lại object

//         // sau đó render ra giao diện 
//         renderTableMonAn(menu.mangMonAn);
//     }
// }

// Xử lý menu.mangMonAn viết hàm hiển thị dữ liệu ra giao diện
const renderTableMonAn = (mangMonAn) => {

    // hiển thị nó ra giao diện
    // Lặp qua mảng món ăn
    
    let content = '';

    for (let monAnLocal of mangMonAn) {

        // Tạo đối tượng menu mới lấy ra được phương thức giá khuyến mãi

        let monAn = new MonAn();

        monAn = {...monAn, ...monAnLocal}; // lấy giá trị sau của monAnLocal đè lên monAn trước và trong đó có phương thức tinhGiaKhuyenMai của 
        // object monAn

        console.log(monAn)
        content += `
            <tr>
                <td>${monAn.maMon}</td>
                <td>${monAn.tenMon}</td>
                <td>${monAn.loaiMon}</td>
                <td>${monAn.giaMon}</td>
                <td>${monAn.khuyenMai}</td>
                <td>${monAn.tinhGiaKhuyenMai()}</td>
                <td>${monAn.tenTinhTrang}</td>

                <td>
                    <button class="btn btn-primary" data-toggle="modal" data-target="#exampleModal" onclick="suaMonAn('${monAn.maMon}')">Sửa</button>
                    <button class="btn btn-danger ml-2" onclick="xoaMonAn('${monAn.maMon}')">Xóa</button>
                 </td>
            </tr>
        `
    }

    document.querySelector('tbody').innerHTML = content;
    return content
}

renderTableMonAn(menu.mangMonAn)

function xoaMonAn(maMonAnClick) {
    // GỌi phường thức xóa món ăn trong đối tượng menu
    menu.xoaMon(maMonAnClick);

    // Cập nhập là localStorage
    menu.saveMenu()

    // render lại giao diện
    renderTableMonAn(menu.mangMonAn)
}


window.xoaMonAn = xoaMonAn

function suaMonAn(maMonAnClick) {
    document.querySelector(".modal-title").innerHTML = 'Cập nhật món ăn'

    // Lấy ra 
    let monAn = menu.layThongTinMonAn(maMonAnClick)

    if (monAn) {

        // đưa dữ liệu lên modal
        // console.log(monAn)

        let arrInput = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea')


        for (let input of arrInput) {

            // Làm như vậy để coi nó có trỏ tới hết các giá trị của ô input trong form cập nhập hay không
            // input.style.backgroundColor = 'red';

            let {id} = input
            input.value = monAn[id]
            // input id = 'maMon' value => monAn['maMon']
        }
    }
}

window.suaMonAn = suaMonAn


// Viết hàm cho nút cập nhập

document.querySelector("#btnCapNhat").onclick = function () {

    // lấy input
    let arrInput = document.querySelectorAll('#foodForm input, #foodForm select, #foodForm textarea');

    // Tạo đối tượng món ăn trong hàm cập nhật
    let monAnCapNhat = new MonAn();

    for (let input of arrInput) {

        let {id , value} = input // lấy ra id và value trong object gán sang cho name: id, value

        if (id === 'maLoai') {
            monAnCapNhat['maLoai'] = value;

            // Input đang là select khi chay đến loại món ăn
            monAnCapNhat['loaiMon'] = input.options[input.selectedIndex].innerHTML
        } else if (id === 'maTinhTrang') {
             monAnCapNhat['tenTinhTrang'] = input.options[input.selectedIndex].innerHTML;
        } else { 
            monAnCapNhat[id] = value;// Nên dùng cách này

            console.log(id, value)// console ra giá trị món ăn mới vừa cập nhật
        }

        // monAnCapNhat[id] = value;// và gán value tương ứng của id đó cho nhau
    }

    // viêt phương thưc cập nhật vào mảng và lưu xuống localStorage

    // Cập nhật món ăn
    // monAnCapNhat là đối tượng món ăn mới được tạo ra từ đối tượng monAn
    menu.capNhatMonAn(monAnCapNhat.maMon, monAnCapNhat)

    // Render lại giao diện món ăn
    renderTableMonAn(menu.mangMonAn)
    
    console.log("monAnCapNhat", monAnCapNhat)
}

// chức năng filter loại món ăn
document.querySelector("#selLoai").onchange = function () {
    // lấy giá trị người dùng select từ giao diện
    let value = document.querySelector("#selLoai").value;

    let result = menu.locMonAn(value)

    renderTableMonAn(result)
}