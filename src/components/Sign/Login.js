import "./SignUtils/CSS/Sign.css";
import "./SignUtils/fonts/material-icon/css/material-design-iconic-font.min.css";
import signinimage from "./SignUtils/images/signin-image.jpg";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav_bar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ref, get, child } from "firebase/database";
import { db } from "../../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginSuccess = () => toast.success("Login Success", { className: "toast-message" });
  const loginFailed = () => toast.error(`Invalid Details or User Doesn't exist`, { className: "toast-message" });

  const handleLogin = async () => {
    setLoading(true);
    const voterKey = username.replace(/[.#$\[\]]/g, "_");

    try {
      const dbRef = ref(db);
      const snapshot = await get(child(dbRef, `voters/${voterKey}`));
      if (snapshot.exists()) {
        const user = snapshot.val();
        if (user.pass === password) {
          loginSuccess();
          setTimeout(() => navigate('/User', { state: { voterKey } }), 2000);
        } else {
          loginFailed();
        }
      } else {
        loginFailed();
      }
    } catch (error) {
      console.error("Login failed:", error);
      loginFailed();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Nav_bar />
      <section className="sign-in">
        <div className="container">
          <div className="signin-content">
            <div className="signin-image">
              <figure><img src={signinimage} alt="sign in image" /></figure>
              <Link to="/Signup" className="signup-image-link">Create an account</Link>
            </div>

            <div className="signin-form">
              <h2 className="form-title">Sign In</h2>
              <ToastContainer />
              <div className="form-group">
                <label htmlFor="email"><i className="zmdi zmdi-account material-icons-name"></i></label>
                <input type="email" name="email" id="email" placeholder="Enter Email" onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                <input type="password" name="pass" id="pass" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="form-group form-button">
                <button onClick={handleLogin} disabled={loading}>{loading ? <div className="spinner"></div> : 'Login'}</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
