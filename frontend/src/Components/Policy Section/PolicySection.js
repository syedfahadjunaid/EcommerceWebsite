import React from 'react'
import './PolicySection.css'
import img from '../../Images/Vector.png'
import img1 from '../../Images/Vector-1.png'
import img2 from '../../Images/Vector-2.png'
import img3 from '../../Images/image 26.png'
function PolicySection() {
  return (
    <div className='policysection'>
      <div>
        <img src={img} alt='policy img' loading='lazy'/>
        <p>Next Day delivery</p>
        <p>1000  Orders Only</p>
      </div>
       <div>
        <img src={img1} alt='policy img' loading='lazy'/>
        <p>100% secure </p>
        <p>payment</p>
      </div>  
       <div>
        <img src={img2} alt='policy img' loading='lazy'/>
        <p>Best Online Support</p>
        <p>Hours: 8AM - 11PM</p>
      </div> 
       <div>
        <img src={img3} alt='policy img' loading='lazy'/>
        <p>Return Policy</p>
        <p>Easy & Free Return</p>
      </div>
    </div>
  )
}

export default PolicySection