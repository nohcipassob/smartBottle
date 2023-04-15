import { View, Text } from 'react-native'
import React from 'react'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const WaterIcon = () => {
    return (
        <View>

            <View style={{ width: 60, height: 60, backgroundColor: '#008fc8', justifyContent: 'center', alignItems: 'center', borderRadius: 15 }}>
            <View style={{ width: 40, height: 40, backgroundColor: '#7aadcc', justifyContent: 'center', alignItems: 'center', borderRadius: 100 }}>
                <MaterialCommunityIcons name="water" style={{ fontSize: 40, color: 'white' }} />
                </View>
            </View>
        </View>
    )
}

export default WaterIcon