import Header from "./Header";
import Footer from "./Footer";
import NotifyModal from "../components/NotifyModal";

function Layout({ children }) {
    return (
        <div className="container-fuild">
            <Header></Header>
            <span>{children}</span>
            <div className="notify-section">
                {/* <NotifyModal></NotifyModal> */}
            </div>
            <Footer></Footer>
        </div>
    )
}
export default Layout;