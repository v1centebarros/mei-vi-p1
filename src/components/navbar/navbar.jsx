import {Link} from "react-router-dom";

export const Navbar = (props) => {
  return <div className="navbar bg-base-100 rounded drop-shadow-md">
    <div className={"flex-1"}>
      <a className="btn btn-ghost normal-case text-xl">🇵🇸Palestine-🇮🇱Israel Conflict Fatalities </a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link to={"/"}>Home</Link></li>
        <li><Link to={"/stats"}>Stats</Link></li>
      </ul>
    </div>
  </div>
};