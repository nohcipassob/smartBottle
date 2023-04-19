import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ActivityIndicator, View} from 'react-native';
import { useIsFocused } from '@react-navigation/native';


const screenWidth = Dimensions.get('window').width;




const chartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#FFFFFF',
  backgroundGradientTo: '#FFFFFF',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },

};

const Chart = () => {
  const isFocused = useIsFocused();
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(isFocused){
    fetch('https://water-bottle.herokuapp.com/get/John')
      .then(response => response.json())
      .then(result => {
        setDaily(result.Result.John.daily);
        console.log(daily);
        setIsLoading(false);
      })
      .catch(error => console.error(error));
    }
  }, [isFocused]);

  if (isLoading) {
    return <ActivityIndicator />;
  }
  const data = Object.entries(daily).map(([timestamp, values]) => ({
    timestamp,
    drunk: values.drunk
  }));
  data.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

  const labels = data.map(item => item.timestamp.substr(11, 5));
  const drunkValues = data.map(item => item.drunk);
  const chartData = {
    labels,
    datasets: [
      {
        data: drunkValues,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };
  
    return (
      <LineChart
        data={chartData}
        width={screenWidth}
        height={300}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />
    );
  }



export default Chart;
