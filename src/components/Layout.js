import Header from "./Header";
import Footer from "./Footer";
function Layout({children}) {
    return
    <>
        <Header></Header>
        <span>{children}</span>
        <Footer></Footer>
    </>
}
export default Layout;