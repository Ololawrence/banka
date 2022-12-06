import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import "./login.css";
import { toast } from "react-toastify";

import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../features/authSlice";
import { resetState } from "../../features/authSlice";

const Login =()  => {
  const auth = useSelector((state) => state.auth);
const navigate = useNavigate();
const [credentials,setCredentials]= useState("")
const dispatch = useDispatch();

  useEffect(() => {
    
    if (auth?.loginStatus === "success") {
      toast.success(auth?.user?.message,
       { position:"bottom-center" });
    }
    if (auth?.loginStatus === "pending") {
      toast.warning("please wait...", { position: "top-center" });
    }
    if (auth?.loginStatus === "rejected") {
      toast.warning(auth?.loginError, { position: "top-center" });
    }
    if (auth?.loginStatus === "success") {
      navigate("/dashboard");
      dispatch(resetState());
    }

  }, [auth?.registerStatus,dispatch, auth?.registerError, navigate, auth]);


  const handleChange = (e) => {
    setCredentials((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));

  };

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
          <form className="loginBoxL" onSubmit={handleClick}>
            <input
              placeholder="Email"
              type="email"
              required
              id ="email"
                 onChange={handleChange}
              className="loginInput"
            />
            <input
              placeholder="Password"
              type="password"
              required
              id="password"
               onChange={handleChange}
              minLength="6"
              className="loginInput"
            />
            <button className="loginButton" type="submit"  onClick={handleClick} >
              login
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <Link to="/" style={{display:"flex",justifyContent:"center", textDecoration:"none", width:"100%"}}>
            <button className="loginRegisterButton">
             
                Create a New Account
              
            </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
export default Login