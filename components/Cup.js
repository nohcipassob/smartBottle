import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const WaterIcon = () => {
    return (
        <View style={{justifyContent:'flex-start'}}>
            
            <View style={{ width: 50, height: 50, backgroundColor: '#7aadcc', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                <MaterialCommunityIcons name="cup" style={{ fontSize: 30, color: 'white' }} />
                
            </View>
        </View>
    )
}

export default WaterIcon