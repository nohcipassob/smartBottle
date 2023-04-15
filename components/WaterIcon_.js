import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const WaterIcon = () => {
    return (
        <View style={{justifyContent:'flex-start'}}>
            
            <View style={{ width: 70, height: 70, backgroundColor: '#7aadcc', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                <MaterialCommunityIcons name="water" style={{ fontSize: 60, color: 'white' }} />
                
            </View>
        </View>
    )
}

export default WaterIcon