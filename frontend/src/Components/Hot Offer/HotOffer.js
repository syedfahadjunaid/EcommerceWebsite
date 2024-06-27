import React from 'react'
import './HotOffer.css'
import Button from '../../Button/Button'
import HotDealCard from '../../Cards/HotDealCard/HotDealCard'
function HotOffer() {
  return (
    <div className='hotoffer'>
        <div className="hotoffer_top">
            <h6>HOT Offers</h6>
            <Button color='#2874F0'>View More</Button>
        </div>
        <div className="hotoffer_cards">
            <HotDealCard/>
            <HotDealCard/>
            <HotDealCard/>
            <HotDealCard/>
        </div>
    </div>
  )
}

export default HotOffer