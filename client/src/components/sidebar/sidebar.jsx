import "./sidebar.scss";
import { useDispatch } from "react-redux";
import { logOut, resetState } from "../../features/accountSice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
const dispatch = useDispatch()
const navigate = useNavigate()
const handleLogOut = () => {
  dispatch(logOut())
  dispatch(resetState());
  navigate('/login')
}




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
         
          <li>
            <span>Dashboard</span>
          </li>  

          <li >
            <span onClick = {handleLogOut}>Logout</span>
          </li>
        </ul>
      </div>
     
    </div>
  );
};

export default Sidebar;
