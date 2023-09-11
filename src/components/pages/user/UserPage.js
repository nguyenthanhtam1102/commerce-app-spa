import { NavLink, Outlet } from "react-router-dom";
import Header from "../../header/Header";

const UserPage = () => {
    return (
        <div>
            <div className="header-container">
                <Header/>
            </div>
            <Outlet/>
        </div>
    )
}

export default UserPage;