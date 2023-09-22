import React from 'react'
import Drawer from './Drawer'
import { Box } from '@mui/material'
import Navbar from './Navbar'

export default function Home() {
  return (
    <> 
    <Navbar/>
    <Box sx={{ display: 'flex' }}>
   
    <Drawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <h1>Home</h1>
        </Box>
    </Box>
  
    </>
 
  )
}
