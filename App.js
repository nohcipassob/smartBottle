import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from '@rneui/themed';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Main from './components/Main'
import WaterIcon from './components/WaterIcon';
import Daily from './components/Daily'
import Test from './components/Test'
import Profile from './components/Profile'
function Home() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'pink' }}>
      <Text style={{fontSize:40}}>Home!</Text>
    </View>
  );
}

function Setting() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#50bafe' }}>
      <Text style={{fontSize:40}}>Setting!</Text>
    </View>
  );
}



const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: 'skyblue',
      }}
    >
      <Tab.Screen
        name="Home Screen"
        component={Main}
        options={{
          headerShown: false,
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          
        }}
      />
      <Tab.Screen
        name="Profile Screen"
        component={Daily}
        options={{
          headerShown: false,
          tabBarLabel: 'Profile',
         
        }}
      />
      <Tab.Screen
        name="Setting Screen"
        component={Test}
        options={{
          headerShown: false,
          tabBarLabel: 'Setting',
        
        }}
      />
      <Tab.Screen
        name="zz"
        component={Profile}
        options={{
          headerShown: false,
          tabBarLabel: 'profile',
          tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyTabs /> 
      
    </NavigationContainer>
  );
}