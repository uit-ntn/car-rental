import Header from "./Header";
import Footer from "./Footer";
import SideBar from "./SideBar";
import "../styles/AccountLayout.css"

function AccountLayout({ children }) {
    return (<div className="account-layout-container">
        <Header></Header>
        <div className="main-content">
            <SideBar></SideBar>
            <div className="content">
                <div>{children}</div>
            </div>
        </div>
        <Footer></Footer>
    </div>
    )
}
export default AccountLayout;