import {Outlet} from "react-router-dom";

export const Base = (props) => {
  return <div className="bg-amber-300 h-screen">
    <div className="navbar bg-base-100 rounded">
      <a className="btn btn-ghost normal-case text-xl">Palestine-Israel Conflit Fatalities </a>
    </div>
    <Outlet/>
  </div>;
};