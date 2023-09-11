import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AboutUsScreen from '../screens/AboutUsScreen';
import ChooseUserScreen from '../screens/ChooseUserScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { RootStackParamList } from '../utils/AppNavigator';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';


const Tab=createBottomTabNavigator()

const Tabs=()=>{
    return(
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor:'tomato',
      tabBarInactiveTintColor:'grey',
      tabBarStyle:{
        backgroundColor:'yellow'
      },
      headerShown:false
    }}>
      <Tab.Screen name={'About Us'}  options={{
        tabBarIcon: ({focused})=>(<Feather name='droplet' size={25} color={focused?'tomato':'black'}/>)
      }}>
        {()=><AboutUsScreen/>}
      </Tab.Screen>
      <Tab.Screen name={'Choose User to transfer with'} options={{
        tabBarIcon: ({focused})=>(<Feather name='clock' size={25} color={focused?'tomato':'black'}/>)
      }}>
        {()=><ChooseUserScreen />}
      </Tab.Screen>
      <Tab.Screen name={'Profile'} options={{
        tabBarIcon: ({focused})=>(<Feather name='home' size={25} color={focused?'tomato':'black'}/>)
      }}>
        {()=><ProfileScreen/>}
      </Tab.Screen>
    </Tab.Navigator>
    )
}
export default Tabs