import React, { useState } from "react";
import "./AdminProfilePage.css";
import img from '../../Images/Ellipse 15.jpg'
function AdminProfilePage() {
  
  return (
    <div className="adminprofilepage">
      <div className="adminprofilepage_heading">
        <h3>Profile Setting</h3>
      
      </div>
      <div className="adminprofilepage_profile">
    <span>
    <img src={img} alt="pic"/>
    </span>

          
            <input type="file"/>
     
      </div>
      <div className="adminprofilepage_top">
      <div className="adminprofilepage_form">
        <form>
          <label>Name</label>
          <span>
          <input type="text" name="fullname" placeholder="Enter Your Name" />
          </span>
          
          <label>Mobile No</label>
          <span>
          <input
            type="text"
            name="mobile"
            placeholder="Enter Your Mobile Number"
          />
          </span>
         
          <label>Email</label>
          <span>
          <input
            type="text"
            name="email"
            placeholder="Enter Your Email Address"
          />
          </span>
          
          <label>Address</label>
          <span>
          <input type="text" name="address" placeholder="Enter Your Address" />
          </span>
       

          <label>Your Password</label>
          <span>
          <input
            type=""
            name="password"
            placeholder="Enter Your Mobile Number"
          />
          </span>
         <div>
         <button>Save</button>
         </div>
         
        </form>
      </div>
      <div className="adminprofilepage_social_links">
        <form>
            <label>
                FaceBook
            </label>
            <span>
            <input type="text" name="facebook" placeholder="FaceBook"/>
            </span>
          
             <label>
               Instagram
            </label>
            <span>
            <input type="text" name="instagram" placeholder="Instagram"/> 
            </span>
          
            <label>
              Whatsapp
            </label>
            <span>
            <input type="text" name="whatsapp" placeholder="WhatsApp"/>
            </span>
       
            <button>Save</button>
        </form>
      </div>
      <div className="adminprofilepage_logo">
        <p>Banner</p>
        <form>
            <label>
            title
            </label>
            <span>
                <input type="type" />
            </span>
            <label>
            link
            </label>
            <span>
                <input type="type" />
            </span>
            <label>
              Banner
            </label>
            <span>
                <input type="file" />
            </span> 

             <label>
             alt_tag
            </label>
            <span>
                <input type="type" />
            </span>
            <button>Save</button>
        </form>
      </div>
      </div>
      
    </div>
  );
}

export default AdminProfilePage;
