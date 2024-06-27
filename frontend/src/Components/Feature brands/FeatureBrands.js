import React from 'react'
import './FeatureBrands.css'
import FeatureCard from '../../Cards/FeatureCard/FeatureCard'
function FeatureBrands() {
  return (
    <div className='featurebrands'>
        <div className="featurebrands_top">
            <h6>Featured Brands</h6>
        </div>
        <div className="featurebrands_cards">
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
            <FeatureCard/>
        </div>
    </div>
  )
}

export default FeatureBrands