import Nav from './Navigation.jsx';
import { Outlet, Link } from "react-router-dom";

function HeaderLayout() {
    return (
        <header className="bg-primary py-3">
            <div className="container">
                <Nav />
            </div>
        </header>
    );
}

export default HeaderLayout;