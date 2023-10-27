import React from "react";
import "../styles/Register.css"
import Header from "../components/Header"


function Register() {
    <div className="register-page">
        <form action="">
            <label htmlFor="">
                <h1>Đăng kí</h1>
            </label>
            <hr />
            <label htmlFor="">Số điện thoại</label> <br />
            <input id="text" type="text" required="" /> <br />
            <label htmlFor="">Tên hiển thị</label> <br />
            <input id="text" type="text" required="" /> <br />
            <label htmlFor="">Mật khẩu</label> <br />
            <input id="text" type="password" required="" /> <br />
            <label htmlFor="">Xác nhận mật khẩu</label> <br />
            <input id="text" type="password" required="" /> <br />
            <label htmlFor="">Mã giới thiệu (nếu có)</label> <br />
            <input id="text" type="text" /> <br />
            <input type="checkbox" />
            Tôi đồng ý với chính sách của Mioto.{" "}
            <a href="">
                <b>Chi tiết</b>
            </a>
            <br />
            <br />
            <button>Đăng kí</button>
        </form>
    </div>

}
export default Register;