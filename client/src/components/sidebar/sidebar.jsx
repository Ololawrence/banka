import "./sidebar.scss";

import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/dashboard" style={{ textDecoration: "none" }}>
          <span className="logo">Banka</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <Link to="/dashboad" style={{ textDecoration: "none" }}>

             <p className="title">MAIN</p>
          </Link>
         
          <li>
            <span>Dashboard</span>
          </li>
          <p className="title">LISTS</p>
          <Link to="/create account" style={{ textDecoration: "none" }}>
            <li>
              <span>create account</span>
            </li>
          </Link>
          <Link to="/debit" style={{ textDecoration: "none" }}>
            <li>
              <span>debit</span>
            </li>
          </Link>
          <Link to="/credit" style={{ textDecoration: "none" }}>
            <li>
              <span>credit</span>
            </li>
          </Link>

          <li>
            <span>Logout</span>
          </li>
        </ul>
      </div>
      <div className="bottom">
        <div
          className="colorOption"
        ></div>
        <div
          className="colorOption"
        ></div>
      </div>
    </div>
  );
};

export default Sidebar;
