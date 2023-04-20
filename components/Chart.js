import React, { useEffect, useState } from 'react';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions, ActivityIndicator, View, StyleSheet } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { SelectCountry} from 'react-native-element-dropdown';

const screenWidth = Dimensions.get('window').width;
const chartConfig = {
  backgroundColor: '#FFFFFF',
  backgroundGradientFrom: '#3C6885',
  backgroundGradientTo: '#3C6885',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  style: {
    borderRadius: 16,
  },

};

const Chart = () => {
  const isFocused = useIsFocused();
  const [daily, setDaily] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isFocused) {
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
        color: (opacity = 0) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 3,
      },
    ],
  };
 
  return (
   


    
    <View style={{backgroundColor:'#5998BF' , flex:1, alignItems: 'center'}}>
     
      <LineChart
        data={chartData}
        width={screenWidth-10}
        height={300}
        chartConfig={chartConfig}
        bezier
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

    </View>
  );
}



export default Chart;
const styles = StyleSheet.create({
  dropdown: {
    margin: 16,
    height: 50,
    width: 150,
    backgroundColor: '#EEEEEE',
    borderRadius: 22,
    paddingHorizontal: 8,
  },
  imageStyle: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    marginLeft: 8,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
});