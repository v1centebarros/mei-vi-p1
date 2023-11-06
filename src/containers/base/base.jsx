import {Outlet} from "react-router-dom";

export const Base = (props) => {
  return <div className={"h-screen bg-amber-300"}>
    <Outlet/>
  </div>;
};