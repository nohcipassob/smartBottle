import { View, Text, StyleSheet, Dimensions, Fla } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import { Image } from 'react-native';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FlatList } from 'react-native';
import { Divider } from '@rneui/themed';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height
const Profile = () => {
    const [data, setData] = useState([])
    useEffect(() => {
        fetch('https://water-bottle.herokuapp.com/get/John')
            .then(response => response.json())
            .then(result => {
                setData(result.Result.John);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        console.log(data);
    }, [data]);
    return (
        <View style={styles.container}>
            <View style={styles.top}>
                <View style={{
                    backgroundColor: 'white',
                    width: 220, height: 220,
                    borderRadius: 220 / 2,
                    position: 'absolute',
                    top: 120,
                    left: windowWidth / 4 - 10,
                }} />

                <Image
                    source={require('../images/john.jpg')}
                    style={{
                        width: 200, height: 200, borderRadius: 200 / 2,
                        top: windowHeight / 6,
                        left: windowWidth / 4,
                    }}
                />
            </View>
            <View style={styles.bottom}>
                <View style={{ marginTop: 100, alignItems: 'center', }}>

                    <Text style={styles.header}>{data.firstName} {data.lastName}</Text>
                    <Text style={styles.sub}>johndoe@zmail.com </Text>

                </View>
                <View>
                    <View style={{ flexDirection: 'row' ,margin:10}}>
                        <MaterialCommunityIcons name="cake-variant-outline" size={26} color="black" />
                        <Text style={styles.subHeader}>  22 July, 2001 </Text>
                    </View>
                    <Divider/>
                    <View style={{ flexDirection: 'row' ,margin:10}}>
                    <MaterialCommunityIcons name="face-man" size={26} color="black" />
                        <Text style={styles.subHeader}>  {data.gender}</Text>
                    </View>
                    <Divider/>
                    <View style={{ flexDirection: 'row',margin:10 }}>
                    <MaterialCommunityIcons name="human-male-height" size={26} color="black" />
                        <Text style={styles.subHeader}>  {data.weight} kg  {data.height} cm</Text>
                    </View>
                    <Divider/>
                    <Text style={[styles.subHeader]}> Water taking per day</Text>
                    <View style={{ flexDirection: 'row',margin:10 }}>
                    <MaterialCommunityIcons name="water-check-outline" size={26} color="black" />
                        <Text style={styles.subHeader}>  {data.waterAmount} </Text>
                    </View>
                    <Divider/>
                </View>
            </View>
        </View>
    )
}

styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    top: {
        flex: 1,
        backgroundColor: '#5998bf'
    },
    bottom: {
        flex: 2,

    },
    header: {
        fontSize: 40,
        fontWeight: 'bold',
        color: 'black',
    },
    subHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'black',
    },
    sub: {
        fontSize: 20,
    },
})
export default Profile