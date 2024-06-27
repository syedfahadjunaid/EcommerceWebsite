import React, { useState } from "react";
import "./ForgetPassword.css";
import { Key } from "@mui/icons-material";
function ForgetPassword() {
  const [enterEmail, setEnterEmail] = useState(true);
  const [enterOpt, setEnterOtp] = useState(false);
  const submitHandler = (e) => {
    e.preventDefault();
  };
  const otpHandle = () => {
    setEnterEmail(false);
    setEnterOtp(true);
  };
  return (
    <div className="forgetpassword">
      {enterEmail && (
        <div>
          <span className="forgetpassword_icon_span">
            <Key style={{ color: "2874F0" }} />
          </span>

          <p>
            Enter the email address associated with your account and we'll send
            you a link to reset your password.
          </p>
          <form onSubmit={submitHandler}>
            <label>Email</label>
            <span>
              <input
                type="text"
                placeholder="Enter Your Email Address"
                required
              />
            </span>

            <button type="submit" onClick={otpHandle}>
              Send OTP
            </button>
          </form>
        </div>
      )}
      {enterOpt && <div>
        <form>
        <span>
            <input type="text" placeholder="Enter OTP"/>
        </span>
        <span>
            <input type="text" placeholder="New Password"/>
        </span>
        <span>
            <input type="text" placeholder="Confirm Password"/>
        </span>
        <button>Submit</button>
        </form>
       
        </div>}
    </div>
  );
}

export default ForgetPassword;
