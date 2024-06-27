import React, { useState } from "react";
import "./ContactUs.css";
import PolicySection from "../../Policy Section/PolicySection";
import Footer from "../../Footer/Footer";
import SubNavBar from "../../NavBar/SubNavBar/SubNavBar";
import MainNavBar from "../../NavBar/MainNavBar/MainNavBar";
import axios from "axios";
import { toast } from "react-toastify";
function ContactUs() {
  const notify = () => toast("Submitted  Successfully!");
  const notify1 = () => toast.warn("Something Went Wrong");
  const [isLoading, setIsLoading] = useState();
  const [contactFormData, setContactFormData] = useState({});
  const handleChange = (e) => {
    setContactFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };
  const addContactUsQueryHandle = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", contactFormData?.fullName);
    formData.append("email", contactFormData?.email);
    formData.append("subject", contactFormData?.subject);
    formData.append("message", contactFormData?.message);
    const { data } = await axios
      .post(`${process.env.React_App_Base_Url + "api/contact_us"}`, formData, {
        headers: { "Content-type": "multipart/form-date" },
      })
      .then((response) => response, setIsLoading(true))
      .catch((error) => console.log(error))
      .finally(() => setIsLoading(false));
    if (data) {
      notify();
      setContactFormData({});
    }
    if (!data) {
      notify();
    }
    console.log(data);
  };
  return (
    <div className="contactus">
      <SubNavBar />
      <MainNavBar />
      <div className="contactus_form">
        <h6>Contact Us</h6>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
        </p>
        <form onSubmit={addContactUsQueryHandle}>
          <div className="contactus_form_form_div">
            <span className="contactus_form_form_div_span_1">
              <p>Full Name</p>
              <input
                type="text"
                placeholder="Full Name"
                name="fullName"
                value={contactFormData?.fullName}
                onChange={handleChange}
                required
              />
            </span>
            <span className="contactus_form_form_div_span_1">
              <p>Email</p>
              <input
                type="email"
                placeholder="Your Email"
                name="email"
                value={contactFormData?.email}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="contactus_form_form_div">
            <span className="contactus_form_form_div_span_2">
              <p>Your Subject</p>
              <input
                type="type"
                placeholder="Your Subject"
                name="subject"
                value={contactFormData?.subject}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <div className="contactus_form_form_div">
            <span className="contactus_form_form_div_span_2">
              <p>Your Message</p>
              <textarea
                rows={5}
                placeholder="Your Message"
                name="message"
                value={contactFormData?.message}
                onChange={handleChange}
                required
              />
            </span>
          </div>
          <button>Send Message</button>
        </form>
      </div>
      <PolicySection />
      <Footer />
    </div>
  );
}

export default ContactUs;
