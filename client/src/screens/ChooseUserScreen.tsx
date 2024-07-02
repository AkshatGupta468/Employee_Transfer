import React,{ useEffect, useState} from 'react'
import { Feather } from '@expo/vector-icons';
import { FlatList, SafeAreaView, View } from 'react-native';
import ListItem from '../components/ListItem';
import {  MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { removeToken } from '../utils/TokenHandler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/app_interfaces';

import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { getError } from '../utils/ErrorClassifier';
import { ActivityIndicator, Surface } from 'react-native-paper';
import { BACKEND_BASE_URL } from '@env';
import { AppStyles } from '../utils/styles';

const data = [
    {key:'1',value:'1'},
    {key:'2',value:'2'},
    {key:'3',value:'3'},
    {key:'4',value:'4'},
    {key:'5',value:'5'},
    {key:'6',value:'6'},
    {key:'7',value:'7'},
    {key:'8',value:'8'},
    {key:'9',value:'9'},
    {key:'10',value:'10'},
    {key:'11',value:'11'},
    {key:'12',value:'12'},
    {key:'13',value:'13'},
    {key:'14',value:'14'},
    {key:'15',value:'15'},
    {key:'16',value:'16'},
  ];


type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;


export default function ChooseUserScreen({route,navigation}:TabsScreenProps){
    const [selectedDestinationLocation,setSelectedDestinationLocation]=useState(currentUser?.preferredLocations||[]);
    const [users,setUsers]=useState([]);
    const [userData,setUserData]=useState<User[]>([]);
    const [loading,setLoading]=useState(false);
    const goToSignInPage=()=>{
        Toast.show({type:'error',text1:"Log In again to continue"})
        navigation.dispatch(StackActions.replace("SignIn"))
    }
    const onNewChatHandler= async (sendTo:User)=>{
        console.log("new-chat with")
        console.log(sendTo)
        if(!currentUser){
            goToSignInPage()
        }
        else {
            navigation.navigate("MessagingScreen",{
                chatThumb:{
                    createdBy:currentUser._id,
                    participants:[sendTo._id],
                    title:sendTo.name,
                }
            })
        }
    }
    useEffect(()=>{
        getUsers(selectedDestinationLocation)
    },[])
    
    const getUsers=async(place:string[])=>{
            if(token===null){
                goToSignInPage()
            }else{
                setLoading(true)
                const config={
                    params:{locations:selectedDestinationLocation},
                    headers:{Authorization:`Bearer ${token}`}
                }
                console.log(config)
                axios.get(`${BACKEND_BASE_URL}/employees`,
                config)
                .then(response=>{
                    let usersData=response.data.data.users
                    setUserData(usersData)
                    setLoading(false)
                }).catch((error)=>{
                    setLoading(false);
                    console.log(error)
                    if(getError(error.response.data).name==='USER_DELETED'){
                        removeToken();
                        goToSignInPage()
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
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'green'} size={'large'} style={AppStyles.loading}/>:<View/>}
            <MultipleSelectList
            setSelected={setSelectedDestinationLocation}
            data={data}
            label='Preferred Locations'
            labelStyles={{fontSize:10}}
            badgeStyles={AppStyles.badgeStyles}
            boxStyles={AppStyles.searchBar}
            dropdownStyles={{marginVertical:10,zIndex:1,backgroundColor:'white',width:300,alignSelf:'center'}}
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
            <FlatList data={userData} renderItem={(e)=>(<ListItem onNewChatHandler={onNewChatHandler} user={e.item} />)} keyExtractor={(item:User)=>(item.email)}/>
            <Toast/>
        </SafeAreaView>
    )
}