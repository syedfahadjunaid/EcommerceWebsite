import React from "react";
import "./Footer.css";
import { MailOutline, Phone, Place } from "@mui/icons-material";
import { Link } from "react-router-dom";
function Footer() {
  const newsLetterSubmitHandle = (e) => {
    e.preventDefault();
  };
  return (
    <div className="footer">
      <div className="footer_div">
        <div className="footer_one">
          <h6>POPULAR CATEGORIES</h6>
          <p>Fashion</p>
          <p>Electronic</p>
          <p>Cosmetic</p>
          <p>Health</p>
          <p>Watches</p>
        </div>
        <div className="footer_two">
          <h6>Products</h6>
          <p>Best sales</p>
          <p>Cosmetic</p>
          <p>Fashion</p>
          <p>Health</p>
          <p>Watches</p>
        </div>
      </div>
      <div className="footer_div">
        <div className="footer_three">
          <h6>OUR COMPANY</h6>
          <p>
            <Link to="/policy" className="footerLinks">
              Privicy Policy
            </Link>
          </p>
          <p>
            <Link to="/termandcondition" className="footerLinks">
              Term and Condition
            </Link>
          </p>
          <p>
            <Link to="/returnandrefund" className="footerLinks">
              Refund Policy
            </Link>
          </p>
          <p>Contact Us</p>
          <p>
            <Link to="/aboutus" className="footerLinks">
              About Us
            </Link>
          </p>
        </div>
        <div className="footer_four">
          <h6>SOCIAL</h6>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Whatsapp</p>
        </div>
      </div>

      <div className="footer_five">
        <h6>Contact</h6>
        <span>
          <Place />
          <p>419 State 414 Rte Beaver Dams, lucknow, 226003</p>
        </span>
        <span>
          <Phone />
          <p>+91 1234567890</p>
        </span>
        <span>
          <MailOutline />
          <p>Gmail@.com</p>
        </span>
        <span className="newsletter">
          <form onSubmit={newsLetterSubmitHandle}>
            <input type="email" placeholder="News Letter" required />
            <button>Suscribe</button>
          </form>
        </span>
      </div>
    </div>
  );
}

export default Footer;
