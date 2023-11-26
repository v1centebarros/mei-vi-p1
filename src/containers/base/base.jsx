import {Outlet} from "react-router-dom";
import {Navbar} from "../../components/navbar/index.js";

export const Base = (props) => {
    return <div className="bg-slate-400 h-full min-h-screen">
        <Navbar/>
        <Outlet/>
    </div>;
};