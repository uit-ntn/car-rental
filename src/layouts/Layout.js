import Header from "../components/Header";
import Footer from "../components/Footer";

function Layout({ children }) {
    return (
        <>
            <Header></Header>
            <span>{children}</span>
            <Footer></Footer>
        </>
    )
}
export default Layout;