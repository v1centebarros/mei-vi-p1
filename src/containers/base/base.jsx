import {Outlet} from "react-router-dom";
import {Navbar} from "../../components/navbar/index.js";

export const Base = (props) => {
    return <div className="bg-amber-300 h-full">
        <Navbar/>
        <Outlet/>
    </div>;
};