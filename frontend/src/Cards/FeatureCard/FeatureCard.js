import React from 'react'
import './FeatureCard.css'
import img from '../../Images/image 2.jpg'
import { ArrowForwardIos } from '@mui/icons-material'
function FeatureCard() {
  return (
    <div className='featurecard'>
    <div className="featurecard_img">
        <img src={img} alt='feature' loading='lazy'/>
    </div>
    <div className="featurecard_price">
        <p>Under ₹599</p>
        <ArrowForwardIos className='featurecard_price_icon'/>
    </div>
    </div>
  )
}

export default FeatureCard