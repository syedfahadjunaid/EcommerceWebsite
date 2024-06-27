import React from 'react'
import './AddProductCard.css'
import img from '../../Images/admin/product_admin.png'
import { Delete, Edit } from '@mui/icons-material'
function AddProductCart() {
  return (
    <div className='addProductCard'>
        <div className="addProductCard_img">
          <img src={img} alt="img"/>
        </div>
        <div className="addProductCard_button">
          <div className="addProductCard_button_edit">
            <Edit className='addProductCard_button_edit_icon'/>
          </div>
          <div className="addProductCard_button_delete">
            <Delete className='addProductCard_button_delete_icon'/>
          </div>
        </div>
    </div>
  )
}

export default AddProductCart