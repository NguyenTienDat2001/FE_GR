
import Header from "../component/Header";

function DefaultLayout({ children }) {
    return (
        <div>
            <Header/>
            {children}
        </div>
    );
}

export default DefaultLayout;