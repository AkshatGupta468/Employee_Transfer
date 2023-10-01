import React,{useEffect, useState} from 'react'
import { Feather } from '@expo/vector-icons';
import { FlatList, SafeAreaView, ScrollView,StyleSheet,Dimensions, View } from 'react-native';
import ListItem from '../components/ListItem';
import { StatusBar } from 'react-native';
import {  MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { getToken, removeToken } from '../utils/TokenHandler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { getError } from '../utils/ErrorClassifier';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { BACKEND_BASE_URL } from '@env';
import {User} from '../interfaces/app_interfaces'
import { AppStyles } from '../utils/AppStyles';
import {MaterialIcons} from '@expo/vector-icons';

const data = [
    {key:'Bangalore',value:'Bangalore'},
    {key:'1',value:'Jammu & Kashmir'},
    {key:'2',value:'1'},
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


type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const goToSignInPage=({route,navigation}:TabsScreenProps)=>{
    Toast.show({type:'error',text1:"Log In again to continue"})
    navigation.dispatch(StackActions.replace("SignIn"))
    navigation.navigate("SignIn");
}

export default function ChooseUserScreen({route,navigation}:TabsScreenProps){
    const [selectedDestinationLocation,setSelectedDestinationLocation]=useState([]);
    const [users,setUsers]=useState([]);
    const [userData,setUserData]=useState<User[]>();
    const [loading,setLoading]=useState(false);

    const onNewChatHandler=(user)=>{
        navigation.navigate("Messaging",{
            sendTo:user,
        })
    }
    const getUsers=async(place:string[])=>{
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
                    console.log(error)
                    if(getError(error.response.data).name==='USER_DELETED'){
                        removeToken();
                        goToSignInPage({route,navigation})
                    }
                    let errorData=error.response.data;
                    console.log(errorData)
                    let {name,message}=getError(errorData);
                    Toast.show({type:'error',text1:message,position:'bottom'});
                })
            }    
    }
    return(
        <SafeAreaView style={AppStyles.container}>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'red'} size={'large'} style={AppStyles.loading}/>:<View/>}
            <MultipleSelectList
            setSelected={setSelectedDestinationLocation}
            data={data}
            label='Preferred Locations'
            labelStyles={{fontSize:10}}
            badgeStyles={AppStyles.badgeStyles}
            boxStyles={AppStyles.searchBar}
            dropdownStyles={{margin:10,zIndex:1,backgroundColor:'white',width:300,alignSelf:'center'}}
            inputStyles={{fontSize:18,textAlignVertical:'center'}}
            dropdownTextStyles={{fontSize:16}}
            placeholder={'Destination Location*'}
            arrowicon={<Feather name={'search'} size={20}/>}
            searchPlaceholder={'Select Option*'}
            onSelect={()=>{
                if(selectedDestinationLocation.length>5){
                    Toast.show({type:'error',text1:'Atmost 5 places can be chosen',position:'bottom'})
                }else{
                    getUsers(selectedDestinationLocation)
                }
            }}/>
            <FlatList data={userData} renderItem={(e)=>(<ListItem user={e.item} />)} keyExtractor={(item:User)=>(item.email)}/>
            <Toast/>
        </SafeAreaView>
    )
}