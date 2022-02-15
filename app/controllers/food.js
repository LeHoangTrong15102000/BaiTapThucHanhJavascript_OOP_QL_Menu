// Định nghĩa sự kiện cho nut thêm món ăn

// Import các model
import { MonAn } from '../models/MonAn.js'
import { Menu } from '../models/Menu.js'

// Tạo đối tượng menu
let menu = new Menu();

// Lấy menu
menu.getMenu();



document.querySelector("#btnThemMon").onclick = () => {
    let monAn = new MonAn();


    let arrInput = document.querySelectorAll("#foodForm input, #foodForm select, #foodForm textarea")

    // Dùng vòng lặp để duyệt qua cái mảng các thẻ
    for (let input of arrInput) {

        // Mỗi lần lấy ra 1 thẻ (giống DOM đến từng thẻ)
        let {id , value} = input;

        // Thay vì phải làm cách này 
        // monAn = {... monAn, [id] = value}// gán tất cả các thuộc tính của ng ười dùng nhập vào lớp đối tượng

        // Lấy dữ liệu đó gán vào thuộc tính monAn
       
        if (id === 'loaiMon') {
            monAn['maLoai'] = value;

            // Input đang là select khi chay đến loại món ăn
            monAn['loaiMon'] = input.options[input.selectedIndex].innerHTML
        } else if (id === 'maTinhTrang') {
             monAn['tenTinhTrang'] = value === 0 ? 'Hết món' : 'Còn món';
        } else { 
            monAn[id] = value;// Nên dùng cách này

            console.log(id, value)
        }
    } 


    // DOM đến tất cả thẻ li
    let arrLi = document.querySelectorAll("#thongTinMonAn li:not(:first-child)") 

    for (let li of arrLi) {
        let {id} = li;

        // Những trường hợp cụ thể thì mình sẽ xử lý riêng
        if (id === 'giaKhuyenMai') {
            li.innerHTML = `
                <div>
                    <h6>${id}</h6>
                    <p id="pMoTa" class="text-muted">${monAn.tinhGiaKhuyenMai()}</p>
                </div>
            `
        } else {
            li.innerHTML = `
                <div>
                    <h6>${id}</h6>
                    <p id="pMota" class="text-muted">${monAn[id]}</p>
                </div>
            `
        }
    } 

    // Trường hợp hình ảnh xử lý riêng cho hình ảnh
    document.querySelector("#imgMonAn").src = monAn.hinhAnh

    // Sau khi đã lấy thông tin món ăn thì gọi hàm thêm món ăn vào menu
    menu.themMonAn(monAn)

    // Lưu vào localStorage sau khi đã thêm món ăn và hiển thị nó lên giao diện
    menu.saveMenu();

    console.log(menu)
}

// Sử dùng đối tượng để xử lý cho trường hợp hiển thị ra mảng 


// Moi lan them mon an thi luu no vao local storage
// function saveStorage() {
//     let sMenu = JSON.stringify(menu.mangMonAn);// biến nó thành cái chuỗi để lưu vào
//     localStorage.setItem('menu', sMenu);// Đưa nó vào localStorage với tên là menu
// }

// Để điều hướng dữ liệu cho trang foodList thì tạo thêm file Js

// Lưu và lấy giá trị localStorage, thì nhũng gì liên quan đến dữ liệu của đối tượng đó thì chúng ta sẽ làm trong lớp đối tượng