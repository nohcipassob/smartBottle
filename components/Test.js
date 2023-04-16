import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { BleManager } from 'react-native-ble-plx';

const Test = () => {
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    const bleManager = new BleManager();
    const subscription = bleManager.onStateChange((state) => {
      if (state === 'PoweredOn') {
        bleManager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('Error while scanning:', error);
            return;
          }
    
          console.log('Found device:', device.name, device.id);
          setDevices((prevDevices) => [...prevDevices, device]);
        });
      }
    }, true);

    return () => {
      bleManager.stopDeviceScan();
      subscription.remove();
    };
  }, []);

  return (
    <View>
      <Text>Found {devices.length} devices:</Text>
      {devices.map((device) => (
        <Text key={device.id}>{device.name || 'Unknown device'}</Text>
      ))}
    </View>
  );
};

export default Test;
