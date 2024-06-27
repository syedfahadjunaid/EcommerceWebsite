import React from 'react'
import './ElectronicItemPage.css'
import AddressNavBar from '../../NavBar/AddressNavBar/AddressNavBar'
import Categories from '../../../Categories/Categories'
import ElectronicItemCard from '../../../Cards/Electronic Item Card/ElectronicItemCard'
import PaginationPage from '../../../Pagination/Pagination'
function ElectronicItemPage() {
  return (
    <div className='electronicItemPage'>
        <AddressNavBar/>
        <div className="electronicItemPage_top">
            <div className="electronicItemPage_top_left">
                <Categories/>
            </div>
            <div className="electronicItemPage_top_right">
                <div className="electronicItemPage_top_right_sortby">
                    <h6>Sort by</h6>
                    <p>populaarity</p>
                    <p>Price -- low to high</p>
                    <p>Price -- high to low</p>
                </div>
                <div className="electronicItemPage_top_right_cards">
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                    <ElectronicItemCard/>
                </div>
            </div>
        </div>
        <div className='electronicItemPage_pagination'>
            <PaginationPage/>
        </div>
    </div>
  )
}

export default ElectronicItemPage