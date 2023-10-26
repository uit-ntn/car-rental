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
                                
                            </th>
                            
                        </tr>
                        <tr><hr/></tr>
                        <tr>
                            <td>
                                <label htmlfor="" value="Số điện thoại hoặc email">
                                    Số điện thoại hoặc email
                                </label>
                                <br />
                                <input type="text" defaultvalue="" maxLength="50px" />
                                <br />
                                <br />
                                <label for="" value="Mật khẩu" id="labelmatkhau">
                                    Mật khẩu
                                </label>
                                <br />
                                <input type="password" defaultvalue="" maxLength="100px" />
                                <br /> <br />
                                <a href="">quên mật khẩu?</a>
                                <br /> <br />
                                <button value="đăng nhập">Đăng nhập</button>
                                <br />
                                <br />
                                <label htmlFor="">
                                    bạn chưa là thành viên?{" "}
                                    <a href="">
                                        <b>Đăng kí ngay.</b>
                                    </a>
                                </label>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

        </div>
    );
}

export default Login;
