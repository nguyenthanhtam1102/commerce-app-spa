import { Link, NavLink, Outlet } from "react-router-dom";
import NavbarVertical from "../../navbar-vertical-admin/NavbarVertical";
import NavbarTop from "../../navbar-top-admin/NavbarTop";

const AdminPage = () => {
    return (
        <div>
            <div>
                <NavbarTop/>
            </div>
            <div className="flex">
                <div className="navbar-vertical-container">
                    <NavbarVertical/>
                </div>
                <div className="flex-1">
                    <Outlet/>
                </div>
            </div>
        </div>
    )
}

export default AdminPage;