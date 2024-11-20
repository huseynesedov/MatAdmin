import Header from "../Header/Header";
import { Footer } from "../Footer/Footer";

const Layout = (props) => {
    return (
        <>
            <div className="rooot">
                <Header />
                {props.children}
            </div>
            <Footer />
        </>
    );
}

export default Layout;
