import "./signup.css";
import {  useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {Link} from 'react-router-dom';
import { toast } from "react-toastify";
import { registerUser } from "../../features/authSlice";
import { resetState } from "../../features/authSlice";

const  Register = () => {
  const auth = useSelector((state) => state.auth);
const navigate = useNavigate();
const [credentials,setCredentials]= useState("")
const dispatch = useDispatch();

  useEffect(() => {
    
    if (auth?.registerStatus === "success") {
      toast.success(auth?.user?.message,
       { position:"bottom-center" });
    }
    if (auth?.registerStatus === "rejected") {
      toast.warning(auth?.registerError?.error, { position: "top-center" });
    }
    if (auth?.registerStatus === "rejected") {
      toast.warning(auth?.registerError?.errors, { position: "top-center" });
    }
    if (auth?.registerStatus === "success") {
      navigate("/login");
      dispatch(resetState());
    }

  }, [auth?.registerStatus,dispatch, auth?.registerError, navigate, auth]);


  const handleChange = (e) => {
        setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  }
  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(registerUser(credentials))
    
  }
 

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Banka</h3>
          <span className="loginDesc">
            Banking made easy with Banka with flexiblity and fidelity
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="firstname"
              required
              className="loginInput"
              id="firstname"
              onChange={handleChange}
            />
            <input
              placeholder="lastname"
              required
              className="loginInput"
              id="lastname"
               onChange={handleChange}
            />
            <input
              placeholder="Email"
              id="email"
              required
              className="loginInput"
              type="email"
               onChange={handleChange}
 
            />
            <input
              placeholder="Password"
              id="password"
              required
              className="loginInput"
              autoComplete="true"
              type="password"
              minLength="6"
              onChange={handleChange}

            />
            <button className="loginButton" type="submit">
            signup
            </button>
            <Link to="/login" style={{display:"flex",justifyContent:"center", textDecoration:"none", width:"100%"}}>

            <button className="loginRegisterButton">Log into Account</button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Register;
