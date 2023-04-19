import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PushNotification from 'react-native-push-notification';

const App = () => {

  PushNotification.createChannel(
    {
      channelId: 'channel-id', // same as in localNotification call
      channelName: 'My Notification Channel',
      channelDescription: 'A channel to receive my notifications',
      playSound: true,
      soundName: 'default',
      importance: 4,
      vibrate: true,
    },
    created => console.log(`createChannel returned '${created}'`)
  );
  const handleNotificationButtonPress = () => {
    console.log("button pressed")
    setTimeout(() => {
      PushNotification.localNotification({
        channelId: 'channel-id',
        title: 'My Notification Title',
        message: 'Are you tirtsy? relax and take some dirnk!',
        largeIconUrl: 'file://C:/react/smartBottle/icon/icon.png', // add the path to your icon here
      });
    }, 3000); // delay execution by 3000 milliseconds (3 seconds)
  };

  return (
    <View>
      <TouchableOpacity onPress={handleNotificationButtonPress}>
        <Text>Send Notification in 5 seconds</Text>
      </TouchableOpacity>
    </View>
  );
};

export default App;
