import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather,Entypo } from '@expo/vector-icons';
import { FlatList, SafeAreaView, View,Text,StyleSheet } from 'react-native';
import { StatusBar } from 'react-native';

interface Item{
    userName:string,
    profilePicture:string,
    location:string,
}

export default function ListItem({userName}:Item){
    return(
        <View style={styles.item}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={styles.roundIcon}>
                    <Feather name={'user'} size={15} color={'white'}/>    
                </View>   
                <Text style={styles.itemText}>{userName}</Text>   
            </View>   
            <View>
                <Entypo name={'chat'} size={25} color={'black'}/>    
            </View> 
        </View>
    )
}

const styles=StyleSheet.create({
    item:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'yellow',
        borderRadius:10,
        margin:10,
        padding :10,
        justifyContent:'space-between',
        alignItems:'center',
        borderWidth:5
    },
    itemText:{
        margin:2,
        fontSize:16
    },
    roundIcon:{
        backgroundColor:'black',
        width:30,
        height:30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    }
})