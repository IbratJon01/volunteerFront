import React, { useState, useEffect } from 'react';
import { Chart } from "react-google-charts";
import { getAllStatisticsVolunteers } from '../Volunteer/VolunteerService';



const StatisticsVoulType = () => {
    const [statistics, setStatistics] = useState([]);
  
    useEffect(() => {
      loadVolunteers();
    }, []);
  
    const loadVolunteers = async () => {
      const response = await getAllStatisticsVolunteers();
      setStatistics(response.data);
    };
  
    const data = [
      ["Task", "Percentage"],
      ...statistics.map((statistic) => [statistic.chooseTypeVolunteer, statistic.subscriberCount]),
    ];
    console.log(statistics);
  
     const options = {
        title: "My Daily Activities",
        pieHole: 0.4,
        is3D: false,
      };
  
    return (
      <Chart
        chartType="PieChart"
        width="100%"
        height="400px"
        data={data}
        options={options}
      />
    );
  };
  
  export default StatisticsVoulType;
  