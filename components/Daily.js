import { View, Text, StyleSheet, ScrollView, RefreshControl, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WaterIcon_ from './WaterIcon_'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListItem, Dialog } from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cup from './Cup'
import { useIsFocused } from '@react-navigation/native';
import { Image } from 'react-native';
let maxGlasses = 8
let dailyCount = 0;
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

  const today = new Date();
  const options = { weekday: 'long' };
  const dayOfWeek = today.toLocaleDateString('en-US', options);
const Daily = () => {
    const isFocused = useIsFocused();
    const [icons, setIcons] = useState([]);
    const [data, setData] = useState([]);
    const [daily, setDaily] = useState([]);
    const [refresh, setRefresh] = useState(false)
    dailyCount = daily? Object.keys(daily).length : 0;

    const handleRefresh = () =>{
        setRefresh(!refresh);
    }
    useEffect(() => {
        if(isFocused){
        fetch('https://water-bottle.herokuapp.com/get/John')
            .then(response => response.json())
            .then(result => {
                if (result && result.Result && result.Result.John && result.Result.John.amountToDrink) {
                    setData(result.Result.John.amountToDrink);
                    
                }
            })
            .catch(error => console.error(error));
        }
    }, [isFocused]);
    useEffect(() => {
        if(isFocused){
        fetch('https://water-bottle.herokuapp.com/get/John')
            .then(response => response.json())
            .then(result => {
                setDaily(result.Result.John.daily);
                console.log(daily);
            })
            .catch(error => console.error(error));
        }
    }, [isFocused]);
   
    useEffect(() => {
        if(isFocused){
        const intervalId = setInterval(() => {
            if (icons.length < maxGlasses) {
                const newIcon = icons.length < dailyCount
                    ? <MaterialCommunityIcons name="cup" color='white' style={{ fontSize: 40, marginTop: 20, marginLeft: 4 }} />
                    : <MaterialCommunityIcons name="cup" color='white' style={{ fontSize: 40, marginTop: 20, marginLeft: 4, opacity: 0.6 }} />;
                setIcons(prevIcons => [...prevIcons, newIcon]);
            } else {
                clearInterval(intervalId);
            }
        }, 75); // Delay rendering each icon by 500ms

        return () => {
            clearInterval(intervalId);
        };
    }
    }, [icons, isFocused]);

    const drunkValues = Object.values(daily).map(item => item.drunk);
    const totalDrunk = drunkValues.reduce((acc, curr) => acc + curr, 0);
    dailyCount = data ? Object.keys(daily).length : 0;
    console.log(totalDrunk); // 881

    switch (dailyCount) {
        case 0:
            var imageSource = require('../icon/20.png');
            break;
        case 1:
            var imageSource = require('../icon/21.png');
            break;
        case 2:
            var imageSource = require('../icon/22.png');
            break;
        case 3:
            var imageSource = require('../icon/23.png');
            break;
        case 4:
            var imageSource = require('../icon/24.png');
            break;
        case 5:
            var imageSource = require('../icon/25.png');
            break;
        case 6:
            var imageSource = require('../icon/26.png');
            break;
        case 7:
            var imageSource = require('../icon/27.png');
            break;
        default:
            var imageSource = require('../icon/28.png');
    }
    return (
        <View style={styles.container}>
            <View style={styles.top}>
               
                <View style={styles.topPosition}>
                <View style={{marginTop: 60}}>
                <Image
                    source={imageSource}
                />
                </View>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20, marginTop:20 }}>
                    <WaterIcon_ />
                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 5 }}>
                        <Text style={{ color: 'white' }}>{dayOfWeek}</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}> {totalDrunk} ml / {parseInt(totalDrunk / 200)} glasses</Text>
                        <Text style={{ color: 'white' }}>{ maxGlasses - parseInt(totalDrunk / 200)} glasses left</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {icons.map((icon, index) => (
                        <View key={index}>
                            {icon}
                        </View>
                    ))}
                </View>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', flex: 1 }}>
                        <ScrollView style={{ flex: 1, height: '100%' }}>
                        {Object.entries(daily).map(([key, value]) => (
                                <ListItem
                                    containerStyle={{ backgroundColor: '#4985b1' }}
                                    key={key}
                                    bottomDivider
                                >
                                    <Cup></Cup>
                                    <ListItem.Content>
                                        <ListItem.Subtitle style={{ color: 'white' }}>{key.substring(11, 16)} </ListItem.Subtitle>
                                        <ListItem.Title style={{ color: 'white' }}> {parseInt(value.drunk / 200)}  glasses</ListItem.Title>
                                        <ListItem.Subtitle style={{ color: 'white' }}>≈ {value.drunk} ml</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))}
                        </ScrollView>
                        <ScrollView style={{ flex: 1, height: '100%' }}>
                            
                        {Object.entries(data).map(([key, value]) => (
                                <ListItem
                                    containerStyle={{ backgroundColor: '#4985b1' }}
                                    key={key}
                                    bottomDivider
                                >
                                   
                                    <ListItem.Content>
                                        <ListItem.Subtitle style={{ color: 'white' }}>{key} glasses</ListItem.Subtitle>
                                        <ListItem.Subtitle style={{ color: 'white' }}>{value.time}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={{ color: 'white' }}>{value.drink} ml</ListItem.Subtitle>
                                    </ListItem.Content>
                                </ListItem>
                            ))}

                        </ScrollView>
                    </View>
                </View>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4882ad',
    },
    topPosition: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    top: {
        flex: 3,
        backgroundColor: '#4985b1',

        flexDirection: 'column',
    },
    botton: {
        flex: 1,
    }
})
export default Daily