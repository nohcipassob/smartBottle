import { View, Text, StyleSheet, Dimensions, TextInput, Button } from 'react-native'
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
    const weight = parseFloat(data.weight);
    const heightInCm = parseFloat(data.height);
    const heightInM = heightInCm / 100; // Convert height from cm to m
    const bmi = weight / (heightInM * heightInM);
    const [editable, setEditable] = useState(false);
    const waterAmout = parseFloat(data.weight) * 33;
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
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <MaterialCommunityIcons name="cake-variant-outline" size={26} color="black" />
                        <Text style={styles.subHeader}>  22 July, 2001 </Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <MaterialCommunityIcons name="face-man" size={26} color="black" />
                        <Text style={styles.subHeader}>  {data.gender}</Text>
                    </View>
                    <Divider />
                    <View style={{ flexDirection: 'row', margin: 10, justifyContent:'space-around' }}>
                        <MaterialCommunityIcons name="human-male-height" size={26} color="black" />
                        <TextInput
                            style={styles.subHeader}
                            editable={editable}
                            keyboardType="numeric"
                            value={data.weight}
                            onChangeText={(text) => setData({ ...data, weight: text })}
                        />
                        <Text style={styles.subHeader}>kg</Text>
                        <TextInput
                            style={styles.subHeader}
                            editable={editable}
                            keyboardType="numeric"
                            value={data.height}
                            onChangeText={(text) => setData({ ...data, height: text })}
                        />
                        <Text style={styles.subHeader}>cm</Text>
                        
                            <Button title={editable ? 'Save' : 'Edit'} onPress={() => setEditable(!editable)} />
                      
                    </View>
                    <Divider />



                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <MaterialCommunityIcons name="water-check-outline" size={26} color="black" />
                        <Text style={styles.subHeader}>  your BMI is: {bmi.toFixed(2)}</Text>
                    </View>
                    <Divider />
                    <Text style={[styles.subHeader]}> Water taking per day</Text>
                    <View style={{ flexDirection: 'row', margin: 10 }}>
                        <MaterialCommunityIcons name="water-check-outline" size={26} color="black" />
                        <Text style={styles.subHeader}>  {waterAmout} ml </Text>
                    </View>
                    <Divider />
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