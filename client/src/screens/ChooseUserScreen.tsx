import React,{useState} from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import { FlatList, SafeAreaView, ScrollView,StyleSheet,Dimensions } from 'react-native';
import ListItem from '../components/ListItem';
import { StatusBar } from 'react-native';
import {  SelectList } from 'react-native-dropdown-select-list';

const data = [
    {key:'1',value:'Jammu & Kashmir'},
    {key:'2',value:'Gujrat'},
    {key:'3',value:'Maharashtra'},
    {key:'4',value:'Goa'},
    {key:'5',value:'X'},
    {key:'6',value:'Y'},
    {key:'7',value:'Z'},
    {key:'8',value:'W'},
    {key:'9',value:'A'},
    {key:'10',value:'B'},
    {key:'11',value:'C'},
    {key:'12',value:'D'},
    {key:'13',value:'E'},
    {key:'14',value:'F'},
    {key:'15',value:'G'},
    {key:'16',value:'H'},
  ];

const data1=[{
    userName:'xyz',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'akjd',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'avhs',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'saaq',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'saa',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'ass',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'asw',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'ase',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'asr',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'asf',
    profilePicture:'xxx',
    location:'thisOne'
},{
    userName:'asd',
    profilePicture:'xxx',
    location:'thisOne'
}]

interface Item{
    userName:string,
    profilePicture:string,
    location:string,
}

export default function ChooseUserScreen(){
    const [selectedDestinationLocation,setSelectedDestinationLocation]=useState();
    return(
        <SafeAreaView style={styles.container}>
            <SelectList
            setSelected={setSelectedDestinationLocation}
            data={data}
            boxStyles={styles.textInput}
            placeholder={'Destination Location*'}
            searchPlaceholder={'Select Option*'} />
            <FlatList data={data1} renderItem={({item})=>(<ListItem userName={item.userName} profilePicture={item.profilePicture} location={item.location} />)} keyExtractor={(item:Item)=>(item.userName)}/>
        </SafeAreaView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'yellow',
    },
    textInput:{
        marginTop:StatusBar.currentHeight||0,
        margin:10,
        borderWidth:2,
        borderRadius:10,
        height:50,
        padding:10,
        backgroundColor:'white'
    }
});