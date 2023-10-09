import React from 'react'
import Drawer from './Drawer'
import { Box,Grid } from '@mui/material'
import Navbar from './Navbar'
import StaticsVoulType from "../charts/StatisticsVoulType"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import  './Dash.css';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { Chart } from "react-google-charts";
import RegionCharts from "../charts/regionsCharts"

export const data = [
  ["Country", "Popularity"],
  ["Germany", 200],
  ["United States", 300],
  ["Brazil", 400],
  ["Canada", 500],
  ["Uzbekistan", 600],
  ["RU", 700],
];

export default function Home(props) {
  return (
    <>
    <div className='bgcolor'>
      <Navbar userId={props.userId}/>
    
      <Box sx={{ display: 'flex' }}>
   
    <Drawer/>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
              <Grid container spacing={2} >
              <Grid  item xs={12} md={4}>
              <Stack spacing={2} >
                <Card sx={{ minWidth: 49+'%' ,height:110}} className='gradient'>
                  
                  <CardContent>
                
                  <div className="iconsStyle"><PeopleAltIcon/></div>
                    <Typography gutterBottom variant="h5" component="div" sx={{color:"#ffff"}}>
                    Members
                    </Typography>
                 
                  </CardContent>
        
               </Card>
              
               </Stack>
               <br/>
               <Stack spacing={2} >
             
               <Card sx={{ minWidth: 49+'%' ,height:110}} className='lightGradient'>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      <div className="iconsStyle"><AdminPanelSettingsIcon/></div>
               
                    </Typography>
                    <Typography gutterBottom variant="h5" component="div"  sx={{color:"#ffff"}}>
                      Admins
                    </Typography>
                  </CardContent>
               </Card>
               </Stack>
                
              </Grid>
              <Grid item xs={12} md={8}>
              <Card sx={{minWidth: 49+'%', height:45+"vh"}}>
                  
                  <CardContent>  <RegionCharts/>
                    </CardContent></Card>
            
              </Grid>
              </Grid>  
                <Box height={10}/>
      
  
              <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
              <Card sx={{minWidth: 49+'%', height:45+"vh"}}>
                  
                  <CardContent>
                    <Chart
                    chartEvents={[
                    {
                      eventName: "select",
                      callback: ({ chartWrapper }) => {
                        const chart = chartWrapper.getChart();
                        const selection = chart.getSelection();
                        if (selection.length === 0) return;
                        const region = data[selection[0].row + 1];
                        console.log("Selected : " + region);
                      },
                    },
                   ]}
                    chartType="GeoChart"
                  
                    height="400px"
                    data={data}
                   />
                    </CardContent></Card>


              </Grid>
                <Grid item xs={12} md={4}>
                <Card sx={{minWidth: '100%', height: 45+"vh" }}>
                   <StaticsVoulType/>
                  <CardContent>
                   
                    </CardContent></Card>
                </Grid>
              </Grid>
       
            
        </Box>
    </Box>
      
      
      </div> 
   
    
  
    </>
 
  )
}
