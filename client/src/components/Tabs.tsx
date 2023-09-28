import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import AboutUsScreen from '../screens/AboutUsScreen';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ChooseUserScreen from '../screens/ChooseUserScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';


const Tab=createBottomTabNavigator()

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const Tabs=({route,navigation}:TabsScreenProps)=>{
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
        {()=><ProfileScreen navigation={navigation} route={route}/>}
      </Tab.Screen>
    </Tab.Navigator>
    )
}
export default Tabs