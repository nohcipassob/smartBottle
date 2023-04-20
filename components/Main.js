import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon from '@rneui/themed'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { ListItem, FAB, Button } from '@rneui/themed'
import WaterIcon from './WaterIcon';
import { SafeAreaView } from 'react-native-safe-area-context';
import WavyBackground from 'react-native-wavy-background'
import { LinearGradient } from 'react-native-svg';
import Dialog from "react-native-dialog";
import axios from 'axios';
import moment from 'moment';
import { Image } from 'react-native';


let glass = 0;
let maxGlasses = 8;
let dailyCount = 0;
const Show = () => {
    const [currentTime, setCurrentTime] = useState('');
    const [timeRemaining, setTimeRemaining] = useState('');

    useEffect(() => {
        // Update the current time every second
        const interval = setInterval(() => {
            setCurrentTime(moment().format('hh:mm A'));
        }, 1000);

        // Calculate the time remaining until 11:00 PM
        const endTime = moment('24:00:00', 'HH:mm:ss');
        const duration = moment.duration(endTime.diff(moment()));
        const hoursLeft = Math.floor(duration.asHours());
        const minutesLeft = Math.floor(duration.asMinutes() % 60);
        setTimeRemaining(`${hoursLeft} hours and ${minutesLeft} minutes left`);

        // Clear the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const [data, setData] = useState(null)
    useEffect(() => {
        fetch('https://water-bottle.herokuapp.com/get/John')
            .then(response => response.json())
            .then(result => {
                setData(result.Result.John);
                console.log(result.Result.John);
            })
            .catch(error => console.error(error));
    }, []);
    dailyCount = data ? Object.keys(data.daily).length : 0;
    const [pic, setPic] = useState('zero')


    switch (dailyCount) {
        case 0:
            var imageSource = require('../icon/0.png');
            break;
        case 1:
            var imageSource = require('../icon/1.png');
            break;
        case 2:
            var imageSource = require('../icon/2.png');
            break;
        case 3:
            var imageSource = require('../icon/3.png');
            break;
        case 4:
            var imageSource = require('../icon/4.png');
            break;
        case 5:
            var imageSource = require('../icon/5.png');
            break;
        case 6:
            var imageSource = require('../icon/6.png');
            break;
        case 7:
            var imageSource = require('../icon/7.png');
            break;
        default:
            var imageSource = require('../icon/8.png');
    }
    return (
        <View style={styles.topPosition}>
            <View style={{ marginTop: 60 }}>
                <Image
                    source={imageSource}

                />
            </View>

            <Text style={styles.Text}> {dailyCount} / {maxGlasses} glasses    </Text>
            <Text style={styles.Text}> {timeRemaining}</Text>

        </View>
    )
}
export { dailyCount }
const Show2 = () => {
    const [icons, setIcons] = useState([]);
    const [visible, setVisible] = useState(false);
    const [glasses, setGlasses] = useState(0)
    const timestamp = Date.now() + 25200000; // add 7 hours in milliseconds
    const [data, setData] = useState(null)


    const showDialog = () => {
        setVisible(true);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const handleOK = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        glass += glasses;
        setVisible(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const ml = glasses * 200;
        axios.post('https://water-bottle.herokuapp.com/daily', {
            firstName: "John",
            drunk: ml,
            temp: "0",
            time: timestamp
        })
            .then((response) => {
                console.log(response.data);
                // do something with the response, e.g. show a success message
            })
            .catch((error) => {
                console.log(error.response.data);
                // show an error message
            });
        setVisible(false);
    };


    const addGlasses = () => {
        setGlasses(glasses + 1);
    };
    const minusGlasses = () => {

        if (glasses > 0) {
            setGlasses(glasses - 1);
        }
        else {
            setGlasses(0);
        }
    };
    const handleReset = () => {
        glass = 0;
    }
    useEffect(() => {

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
    }, [icons]);
    return (
        <View style={{ backgroundColor: '#fdb389' }}>
            <WavyBackground
                height={300}
                width={1100}
                amplitude={25}
                frequency={1}
                offset={150}
                color="#f1faff"
            />

            <View style={{ top: -100 }}>

                <WavyBackground
                    height={200}
                    width={1100}
                    amplitude={55}
                    frequency={2}
                    offset={150}
                    color="#fd9964"
                    bottom={true}

                />
                <View style={{ backgroundColor: '#fd9964', height: 300, top: -100 }}>
                    <Text style={styles.TextAsk}>How much water did you drink ?</Text>
                    <View style={{ flexDirection: 'row', marginLeft: 10, top: -30 }}>
                        {icons.map((icon, index) => (
                            <View key={index}>
                                {icon}
                            </View>
                        ))}
                    </View>
                    <View style={{ top: -25 }}>
                        <Button buttonStyle={{ width: 150, borderRadius: 10, margin: 10 }} color="#d9824d" title="Add glasses" onPress={showDialog} />
                        <Dialog.Container visible={visible}>
                            <Dialog.Title>How many glasses of water did you drink</Dialog.Title>

                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={minusGlasses}>
                                    <Text style={{ fontSize: 50 }}> - </Text>
                                </TouchableOpacity>
                                <Text style={{ fontSize: 50 }}>{glasses}</Text>
                                <TouchableOpacity onPress={addGlasses}>
                                    <Text style={{ fontSize: 50 }}> + </Text>
                                </TouchableOpacity>
                            </View>
                            <Dialog.Button label="Reset" onPress={handleReset} />
                            <Dialog.Button label="Cancel" onPress={handleCancel} />
                            <Dialog.Button label="OK" onPress={handleSubmit} />

                        </Dialog.Container>
                    </View>
                </View>
            </View>
        </View>

    )
}


const Main = () => {
    const [active, setactive] = useState(true);
    const handlePress = () => setactive(previousState => !previousState)
    const [weeklyData, setWeeklyData] = useState([]);

    useEffect(() => {
        fetch('https://water-bottle.herokuapp.com/get/John')
            .then(response => response.json())
            .then(result => {
                setWeeklyData(result.Result.John.weekly);
                console.log(weeklyData);
            })
            .catch(error => console.error(error));
    }, []);




    console.log(active)
    return (

        <View style={styles.container}>
            <View style={styles.top}><View />
                <View >
                    {active ? <Show /> : <Show2 />}
                </View>

            </View>
            <View style={{ position: 'absolute', zIndex: 1 }}>
                <TouchableOpacity style={{ top: 330, left: 320, width: 60, height: 60, backgroundColor: "#ffaa76", borderRadius: 30 }}
                    onPress={handlePress}>
                    <Text style={{ fontSize: 40, color: "white", justifyContent: 'center', textAlign: 'center' }}>+</Text>
                </TouchableOpacity>
            </View>
            <ScrollView style={styles.bottom} >


                {Object.entries(weeklyData).map(([date, data]) => (
                    <ListItem
                        key={date}
                        bottomDivider
                    >
                        <WaterIcon />
                        <ListItem.Content>
                            <ListItem.Subtitle>{date}</ListItem.Subtitle>
                            <ListItem.Title style={styles.Text}>{parseInt(data.drunk / 200)} glasses ≈ {data.drunk} ml </ListItem.Title>
                            <ListItem.Subtitle> {data.temp} °C</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem>
                ))}

            </ScrollView>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f1faff',

        flex: 1,
    },
    topPosition: {
        alignItems: 'center',


    },
    top: {


        flex: 1,
        flexDirection: 'column',
    },
    bottom: {

        flex: 1,
    },
    Text: {
        color: '#26acff',
        fontSize: 22,
        fontWeight: 'bold',
    },
    TextAsk: {
        color: 'white',
        fontSize: 22,
        fontWeight: 'bold',
        margin: 20,
    }


})
export default Main