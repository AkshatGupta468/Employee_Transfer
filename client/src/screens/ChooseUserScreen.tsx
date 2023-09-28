import React,{useEffect, useState} from 'react'
import { Feather } from '@expo/vector-icons';
import { FlatList, SafeAreaView, ScrollView,StyleSheet,Dimensions, View } from 'react-native';
import ListItem from '../components/ListItem';
import { StatusBar } from 'react-native';
import {  SelectList } from 'react-native-dropdown-select-list';
import { getToken } from '../utils/TokenHandler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { getError } from '../utils/ErrorClassifier';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { BACKEND_BASE_URL } from '@env';

const data = [
    {key:'Bangalore',value:'Bangalore'},
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

interface UserData {
    _id: string;
    __v: number;
    email: string;
    location: string;
    name: string;
    phone_number: string;
    photo: string;
    role: string;
    passwordResetExpires?: string;
    passwordResetToken?: string;
  }

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const goToSignInPage=({route,navigation}:TabsScreenProps)=>{
    Toast.show({type:'error',text1:"Log In again to continue"})
    navigation.dispatch(StackActions.replace("SignIn"))
    navigation.navigate("SignIn");
}

export default function ChooseUserScreen({route,navigation}:TabsScreenProps){
    const [selectedDestinationLocation,setSelectedDestinationLocation]=useState('');
    const [users,setUsers]=useState([]);
    const [userData,setUserData]=useState<UserData[]>([]);
    const [loading,setLoading]=useState(false);
    const getUsers=async(place:string)=>{
        let token=await getToken();
            if(token===null){
                goToSignInPage({route,navigation})
            }else{
                setLoading(true)
                axios.get(`${BACKEND_BASE_URL}/employees/${place}`,{headers:{Authorization:`Bearer ${token}`}})
                .then(response=>{
                    let usersData=response.data.data.users
                    setUserData(usersData)
                    setLoading(false)
                    Toast.show({type:'success',text1:'Recieved Profiles Successfully',position:'bottom'})
                }).catch((error)=>{
                    console.log(error.response.data)
                    let errorData=error.response.data;
                    let {name,message}=getError(errorData);
                    Toast.show({type:'error',text1:message});
                })
            }    
    }
    return(
        <SafeAreaView style={styles.container}>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'red'} size={'large'} style={styles.loading}/>:<View/>}
            <SelectList
            setSelected={setSelectedDestinationLocation}
            data={data}
            boxStyles={styles.textInput}
            placeholder={'Destination Location*'}
            searchPlaceholder={'Select Option*'}
            onSelect={()=>{
                getUsers(selectedDestinationLocation)
            }}/>
            <FlatList data={userData} renderItem={({item})=>(<ListItem userName={item.name} profilePicture={item.photo} location={item.location} />)} keyExtractor={(item:UserData)=>(item.email)}/>
            <Toast/>
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
    },
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex:1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      }
});