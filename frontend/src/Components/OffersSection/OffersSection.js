import React from 'react'
import './OffersSection.css'
import img1 from '../../Images/2.jpg'
import img2 from '../../Images/shampoo.jpg'
import img3 from '../../Images/shoe-1.jpg'
import img4 from '../../Images/watch-1.jpg'
import img5 from '../../Images/party-wear-1.png'
import img6 from '../../Images/clothes-1.png'
import img7 from '../../Images/jewellery-3.png'
import img8 from '../../Images/clothes-4.png'
import { useNavigate } from 'react-router-dom'
function OffersSection() {
    const history=useNavigate()
  return (
    <div className='offersection'>
        <div className="offersection_one">
           <p>Up to 60% off | Styles for men</p>
           <div>
            <span onClick={()=>history('/product')}>
                <img src={img1} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img2} alt='single product' loading='lazy'/>
            </span>
           </div>
           <div>
            <span onClick={()=>history('/product')}>
                <img src={img3} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img4} alt='single product' loading='lazy'/>
            </span>
           </div>
        </div>
        <div className="offersection_two">
        <p>Up to 60% off | Styles for women</p>
           <div>
            <span onClick={()=>history('/product')}>
                <img src={img5} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img6} alt='single product' loading='lazy'/>
            </span>
           </div>
           <div>
            <span onClick={()=>history('/product')}>
                <img src={img7} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img8} alt='single product' loading='lazy'/>
            </span>
           </div>
        </div>
        <div className="offersection_three">
        <p>Up to 60% off | Styles for Kid’s</p>
           <div>
            <span onClick={()=>history('/product')}>
                <img src={img5} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img8} alt='single product' loading='lazy'/>
            </span>
           </div>
           <div>
            <span oonClick={()=>history('/product')}>
                <img src={img6} alt='single product' loading='lazy'/>
            </span>
            <span onClick={()=>history('/product')}>
            <img src={img7} alt='single product' loading='lazy'/>
            </span>
           </div>
        </div>
    </div>
  )
}

export default OffersSection