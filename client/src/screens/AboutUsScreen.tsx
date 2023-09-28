import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { View,StyleSheet,StatusBar,Text, SafeAreaView } from 'react-native';

const textBody=`Why Ostriches Can't Fly. The largest and heaviest living bird, the ostrich is flightless and instead is built for running. With its powerful legs, the ostrich can sprint in short bursts up to 43 mph (70 kph), and can maintain a steady speed of 31 mph (50 kph).`;

export default function AboutUsScreen(){
    const [phoneNumber,setPhoneNumber]=useState('');
    return(
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>About Us</Text>
            <Text style={styles.body}>{textBody}</Text>                           
        </SafeAreaView>
    );
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'yellow',
        alignItems:'center'
    },
    heading:{
        fontSize:40,
        marginTop:StatusBar.currentHeight||0,
        color:'tomato',
        fontWeight:'bold'      
    },
    body:{
        fontSize:20,
        color:'brown',
        fontWeight:'bold',
        margin:10
    }
});