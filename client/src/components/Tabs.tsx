import React, { useEffect, useState } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import ChatScreen from '../screens/ChatScreen';
import ChooseUserScreen from '../screens/ChooseUserScreen';
import ProfileScreen from '../screens/ProfileScreen';
import {NativeStackScreenProps, createNativeStackNavigator} from '@react-navigation/native-stack';
import { Chat, ChatThumb, RootStackParamList } from '../interfaces/app_interfaces';
import api from '../utils/api';

const Tab=createBottomTabNavigator()

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const Tabs=({route,navigation}:TabsScreenProps)=>{
    const onChatOpen=(chatThumb:ChatThumb)=>{
      navigation.navigate("MessagingScreen",{chatThumb})
    }
    const [chatsList,setChatsList]=useState<[ChatThumb]>()

    const refreshChatList = ()=>{
      api.getAllChatsOfUser().then((data)=>{
        
        if(data.status=="success" && data.data){
          setChatsList(data.data.chats)
        }
        else{
          console.log(data)
        }
       })
    }
    
    useEffect(()=>{
       refreshChatList();
    },[])

    return(
    <Tab.Navigator screenOptions={{
      tabBarActiveTintColor:'white',
      tabBarInactiveTintColor:'#708090',
      tabBarStyle:{
        backgroundColor:'#25D366'
      },
      headerShown:false
    }}>
      <Tab.Screen name={'Chats'}  options={{
        tabBarIcon: ({focused})=>(<Feather name='droplet' size={25} color={focused?'white':'#708090'}/>)
      }}>
        {()=><ChatScreen chatsList={chatsList} onChatOpen={onChatOpen} refreshChatList={refreshChatList}/>}
      </Tab.Screen>
      <Tab.Screen name={'Search'} options={{
        tabBarIcon: ({focused})=>(<Feather name='clock' size={25} color={focused?'white':'#708090'}/>)
      }}>
        {()=><ChooseUserScreen navigation={navigation} route={route}/>}
      </Tab.Screen>
      <Tab.Screen name={'Profile'} options={{
        tabBarIcon: ({focused})=>(<Feather name='home' size={25} color={focused?'white':'#708090'}/>)
      }}>
        {()=><ProfileScreen navigation={navigation} route={route}/>}
      </Tab.Screen>
    </Tab.Navigator>
    )
}
export default Tabs