import { BottomNavigation, BottomNavigationAction, Box } from '@mui/material';
import React, { useEffect, useState } from 'react'
import './BottomNavigation.css'
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { FilterList, Sort } from '@mui/icons-material';
import Categories from '../Categories/Categories1';

function CustomBottomNavigation({}) {
    const [value, setValue] = useState();
    useEffect(()=>{
      console.log(value)
    },[value])
    const [sortBy,setSortBy]=useState(false)
    const [filter,setFilter]=useState(false)
    const handlesortby=()=>{
      setSortBy(!sortBy)
      setFilter(false)
    }
    const handleFilter=()=>{
      setSortBy(false)
      setFilter(!filter)
    }
  return (
    <div className='bottomnavigation'>
      {sortBy && <div className='bottomnavigation_sortby'>
        <div className="bottomnavigation_sortby_heading">
          SORT BY
        </div>
        <div className="bottomnavigation_sortby_sort_option">
          <span>
            <p>Price -- low to high</p>
            <input type='radio' name="sortby"/>
          </span> 
           <span>
            <p>Price -- high to low</p>
            <input type='radio' name="sortby"/>
          </span>
          <span>
            <p>Newest First</p>
            <input type='radio' name="sortby"/>
          </span>
        </div>

      </div>}
      {filter && <div className='bottomnavigation_sortby'>
        <Categories />

      </div>}
         <Box className="bottomnavigation_box">
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction  label="Sort" icon={<Sort/>} onClick={handlesortby}/>
        <BottomNavigationAction label="FilterList" icon={<FilterList />} onClick={handleFilter}/>
       
      </BottomNavigation>
    </Box>

    </div>
  )
}

export default CustomBottomNavigation