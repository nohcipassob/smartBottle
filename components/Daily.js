import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import WaterIcon_ from './WaterIcon_'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ListItem , Dialog} from '@rneui/themed'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Cup from './Cup'



const Daily = () => {
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            if (icons.length < 8) {
                const newIcon = icons.length < 6
                    ? <MaterialCommunityIcons name="cup" color='white' style={{ fontSize: 40, marginTop: 20, marginLeft: 4 }} />
                    : <MaterialCommunityIcons name="cup" color='white' style={{ fontSize: 40, marginTop: 20, marginLeft: 4, opacity: 0.6 }} />;
                setIcons(prevIcons => [...prevIcons, newIcon]);
            } else {
                clearInterval(intervalId);
            }
        }, 50); // Delay rendering each icon by 500ms

        return () => {
            clearInterval(intervalId);
        };
    }, [icons]);



    const thisDay = [
        {
            "glass": "1st glass",
            "time": "9.00 AM",
            "left": "7 glasses left"
        },
        {
            "glass": "2nd glass",
            "time": "9.45 AM",
            "left": "6 glasses left"
        },
        {
            "glass": "3rd glass",
            "time": "11.24 AM",
            "left": "5 glasses left"
        },
        {
            "glass": "4th glass",
            "time": "12.30 PM",
            "left": "4 glasses left"
        }
    ]
    return (
        <View style={styles.container}>

            <View style={styles.top}>
                <View style={styles.topPosition}>
                    <Ionicons name="water-outline" style={[styles.center, { fontSize: 225, color: 'white', marginTop: 40 }]}></Ionicons>
                </View>
                <View style={{ flexDirection: 'row', marginLeft: 20 }}>
                    <WaterIcon_ />
                    <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 5 }}>
                        <Text style={{ color: 'white' }}>Saturday</Text>
                        <Text style={{ fontSize: 22, color: 'white' }}>1.7L / 6 glasses</Text>
                        <Text style={{ color: 'white' }}>2 glasses left</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    {icons.map((icon, index) => (
                        <View key={index}>
                            {icon}
                        </View>
                    ))}
                </View>
                <ScrollView>
                    {thisDay.map((item) => (
                        <ListItem
                            containerStyle={{ backgroundColor: '#4985b1' }}
                            key={item.glass}
                            bottomDivider
                        >
                            <Cup></Cup>
                            <ListItem.Content>
                                <ListItem.Subtitle style={{ color: 'white' }}>{item.glass}</ListItem.Subtitle>
                                <ListItem.Title style={{ color: 'white' }}>  {item.time}</ListItem.Title>
                                <ListItem.Subtitle style={{ color: 'white' }}>{item.left}</ListItem.Subtitle>
                            </ListItem.Content>

                        </ListItem>
                    ))}
                </ScrollView>
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