import React, { useState } from 'react'
import './Pagination.css'
import { Pagination, Stack } from '@mui/material'
function PaginationPage({count,setPage}) {
 
  return (
    <div className='pagination'>
            <Stack spacing={2}>
           <Pagination count={count} color="primary" shape="rounded"
           onChange={(_,value)=>{
            setPage(value);
            window.scroll(0,0)
          
           }}/>
           </Stack>
    </div>
  )
}

export default PaginationPage