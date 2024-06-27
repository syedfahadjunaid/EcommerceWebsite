import React from 'react'
import './HotDealCard.css'
import img from '../../Images/image 1.jpg'
function HotDealCard({image,title,description,price,price_tag,color}) {
  return (
    <div className='hotdealcard'>
        <div className="hotdealcard_img">
            <img src={image?image:img} alt='product_img' loading='lazy'/>
        </div>
        <div className="hotdealcard_details">
            <h6>{title?title:'Poco M4 Pro AMOLED'}</h6>
            {price && <p>{price_tag?price_tag:"from"} <strong style={{color:`${color}`}}>{price?price:'67,999'}</strong></p>}
            <p>{description}</p>
         
        </div>
    </div>
  )
}

export default HotDealCard