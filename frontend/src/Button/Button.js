import React from 'react'
import './Button.css'
import { Link } from 'react-router-dom'
function Button({children,link,color,width}) {
  return (
 <Link to={link?link:"#"} style={{backgroundColor:`${color}`,width:`${width}`}} className='customLink'>{children}</Link>
  )
}

export default Button