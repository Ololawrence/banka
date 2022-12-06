import "./App.css";
import { useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import Register from "./pages/signup/signup";
import Login from "./pages/login/login.jsx";
import Dashboard from "./pages/dashboard/dashboard.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const ProtectedRoute = ({ children }) => {
  const auths = localStorage.getItem("token");
  const navigate = useNavigate();

  if (!auths) {
    navigate('/login')
  }

  return children;
};
function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Router>
        <Routes>
          <Route exact path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
