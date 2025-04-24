import "../../../Sign/SignUtils/CSS/Sign.css";
import "../../../Sign/SignUtils/CSS/style.css.map";
import UserNavbar from "../../../Navbar/UserNavbar";
import { useEffect, useState } from "react";
import { getDatabase, ref, get, update } from "firebase/database";
import { app } from "../../../../firebase";
import Cookies from "js-cookie";

const EditProfile = () => {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    voterid: "",
    phone: "",
    email: "",
    pass: "",
    re_pass: "",
  });

  const db = getDatabase(app);
  const voterKey = Cookies.get("myCookie");

  useEffect(() => {
    const fetchVoterData = async () => {
      if (!voterKey) return;
      try {
        const snapshot = await get(ref(db, `voters/${voterKey}`));
        if (snapshot.exists()) {
          const data = snapshot.val();
          setFormData({
            name: data.firstName || "",
            dob: data.dob || "",
            voterid: data.voterid || "",
            phone: data.phone || "",
            email: data.email || "",
            pass: data.pass || "",
            re_pass: data.re_pass || "",
          });
        } else {
          console.log("No data found for voter.");
        }
      } catch (error) {
        console.error("Error fetching voter data:", error);
      }
    };

    fetchVoterData();
  }, [voterKey]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔄 Update Firebase on form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!voterKey) return;

    try {
      await update(ref(db, `voters/${voterKey}`), {
        firstName: formData.name,
        dob: formData.dob,
        voterid: formData.voterid,
        phone: formData.phone,
        email: formData.email,
        pass: formData.pass,
        re_pass: formData.re_pass,
      });
      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating data:", error);
      alert("Failed to update profile.");
    }
  };

  return (
    <div>
      <UserNavbar />
      <section className="signup">
        <div className="container">
          <div className="signup-content">
            <div className="signup-form">
              <h2 className="form-title">Edit Your Details</h2>
              <form method="POST" className="register-form" id="register-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name"><i className="zmdi zmdi-account material-icons-name"></i></label>
                  <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="dob"><i className="zmdi zmdi-calendar-account material-icons-name"></i></label>
                  <input type="date" name="dob" value={formData.dob} onChange={handleChange} placeholder="Your Date of Birth" />
                </div>
                <div className="form-group">
                  <label htmlFor="voterid"><i className="zmdi zmdi-file-text material-icons-name"></i></label>
                  <input type="number" name="voterid" value={formData.voterid} onChange={handleChange} placeholder="Your Voter ID" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone"><i className="zmdi zmdi-local-phone material-icons-name"></i></label>
                  <input type="number" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your Phone Number" />
                </div>
                <div className="form-group">
                  <label htmlFor="email"><i className="zmdi zmdi-email"></i></label>
                  <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your Email" />
                </div>
                <div className="form-group">
                  <label htmlFor="pass"><i className="zmdi zmdi-lock"></i></label>
                  <input type="password" name="pass" value={formData.pass} onChange={handleChange} placeholder="Password" />
                </div>
                <div className="form-group">
                  <label htmlFor="re_pass"><i className="zmdi zmdi-lock-outline"></i></label>
                  <input type="password" name="re_pass" value={formData.re_pass} onChange={handleChange} placeholder="Repeat your password" />
                </div>
                <div className="form-group form-button">
                  <input type="submit" name="signup" id="signup" className="form-submit" value="Save Changes" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
