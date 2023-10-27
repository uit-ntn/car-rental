import React from "react";
import Header from "../components/Header"
import "../styles/Login.css";

function Login() {
    return (
        <div>
            <Header></Header>
            {/* ------------------------------------------ */}
            <div className="login-page">
                <table>
                    <tbody>
                        <tr>
                            <th>
                                <h1>Đăng nhập</h1>
                                <hr />
                            </th>
                        </tr>
                        <tr>
                            <td>
                                <form action="">
                                    <label htmlfor="" value="Số điện thoại hoặc email">
                                        Số điện thoại hoặc email
                                    </label>
                                    <br />
                                    <input type="text" defaultvalue="" maxLength="50px" required="" />
                                    <br />
                                    <br />
                                    <label htmlfor="" value="Mật khẩu" id="labelmatkhau">
                                        Mật khẩu
                                    </label>
                                    <br />
                                    <input
                                        required=""
                                        type="password"
                                        defaultvalue=""
                                        maxLength="100px"
                                    />
                                    <br /> <br />
                                    <a href="">quên mật khẩu?</a>
                                    <br /> <br />
                                    <button id="btnlogin">Đăng nhập</button>
                                    <br /> <br />
                                    <label id="last" htmlFor="">
                                        bạn chưa là thành viên?{" "}
                                        <a href="">
                                            <b>Đăng kí ngay.</b>
                                        </a>
                                    </label>
                                </form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
}

export default Login;
