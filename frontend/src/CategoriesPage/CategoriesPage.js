import React from 'react'
import './CategoriesPage.css'
import img from '../Images/categories/image 73.png'
import img1 from '../Images/categories/image 74.png'
import img2 from '../Images/categories/image 75.png'
import img3 from '../Images/categories/image 76.png'
import img4 from '../Images/categories/image 77.png'
import img5 from '../Images/categories/image 78.png'
import img6 from '../Images/categories/image 79.png'
import img7 from '../Images/categories/image 80.png'
import { useNavigate } from 'react-router-dom'
function CategoriesPage() {
    const history=useNavigate()
  return (
    <div className='categoriespage'>
        <span onClick={()=>history('/discountOffer')}>
            <img src={img6} alt='categories image' loading='lazy'/>
            <p>Top Offers</p>

        </span> 
         <span onClick={()=>history('/discountOffer')}>
            <img src={img} alt='categories image' loading='lazy'/>
            <p>Mobile & Tablets</p>

        </span> 
        <span onClick={()=>history('/discountOffer')}>
            <img src={img1} alt='categories image' loading='lazy'/>
            <p>Electronics</p>

        </span> 
         <span onClick={()=>history('/discountOffer')}>
            <img src={img2} alt='categories image' loading='lazy'/>
            <p>Tvs & Appliance</p>

        </span>  
         <span onClick={()=>history('/discountOffer')}>
            <img src={img3} alt='categories image' loading='lazy'/>
            <p>Fashion</p>

        </span> 
        <span onClick={()=>history('/discountOffer')}> 
            <img src={img4} alt='categories image' loading='lazy'/>
            <p>Beauty</p>

        </span> 
        <span onClick={()=>history('/discountOffer')}>
            <img src={img5} alt='categories image' loading='lazy'/>
            <p>Home & Furniture</p>

        </span>
       
         <span onClick={()=>history('/product')}>
            <img src={img7} alt='categories image' loading='lazy'/>
            <p>Grocery</p>

        </span>
    </div>
  )
}

export default CategoriesPage