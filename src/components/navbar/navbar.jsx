import {Link} from "react-router-dom";

export const Navbar = (props) => {
  return <div className="navbar bg-base-100 rounded">
    <div className={"flex-1"}>
      <a className="btn btn-ghost normal-case text-xl">Palestine-Israel Conflit Fatalities </a>
    </div>
    <div className="flex-none">
      <ul className="menu menu-horizontal px-1">
        <li><Link to={"/home"}>Home</Link></li>
        <li><Link to={"/"}>Stats</Link></li>
        <li><a>Page 3</a></li>
        <li><a>Page 4</a></li>
      </ul>
    </div>
  </div>
};