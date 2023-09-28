import React,{useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView} from 'react-native';
import { Feather} from '@expo/vector-icons';
import {  SelectList } from 'react-native-dropdown-select-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { getToken,saveToken,removeToken } from '../utils/TokenHandler';
import { BACKEND_BASE_URL } from '@env';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { StackActions } from '@react-navigation/native';
import { getError } from '../utils/ErrorClassifier';
import PhoneInput from 'react-native-phone-input';
import { ActivityIndicator } from 'react-native-paper';

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

interface ProfileDataStructure{
    name:string,
    phoneNumber:string,
    location:string
}

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const goToSignInPage=({route,navigation}:TabsScreenProps)=>{
    Toast.show({type:'error',text1:"Log In again to continue"})
    navigation.dispatch(StackActions.replace("SignIn"))
    navigation.navigate("SignIn");
}

export default function ProfileScreen({route,navigation}:TabsScreenProps){
    const [name,setName]=useState('');
    const [location,setLocation]=useState('');
    const [selectedCurrentLocation,setSelectedCurrentLocations]=useState([]);
    const [phoneNumber,setPhoneNumber]=useState('');
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
        getProfile()
    },[])
    const getProfile=async()=>{
        const token=await getToken();
        if(token===null){
            console.log("HERE")
            goToSignInPage({route,navigation})
        }
        try{
            setLoading(true)
            const response=await axios.get(`${BACKEND_BASE_URL}/profile`,{headers:{Authorization:`Bearer ${token}`}})
            let userData=response.data.data.user
            console.log("======================================================")
            console.log(userData)
            console.log("======================================================")
            setName(userData.name)
            setLocation(userData.location)
            setPhoneNumber(userData.phone_number)
            setLoading(false)
            Toast.show({type:'success',text1:'Recieved Profile Successfully',position:'bottom'})
        }catch(error){
            Toast.show({type:'error',text1:"Couldn't retrieve profile"});
        }
    }
    const SaveProfile=async()=>{
        let token=await getToken();
        if(token===null){
            goToSignInPage({route,navigation})
        }else{
            console.log("HERE")
            setLoading(true)
            axios.patch(`${BACKEND_BASE_URL}/profile`,{
                name:name,
                phone_number:phoneNumber,
                location:location
            },{headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                Toast.show({type:'success',text1:'Saved Profile Successfully',position:'bottom'})
                setLoading(false)
            }).catch((error)=>{
                let errorData=error.response.data;
                let {name,message}=getError(errorData);
                Toast.show({type:'error',text1:message});
                goToSignInPage({route,navigation})
            })
        }
    }
    const deactivateAccount=()=>{
    }
    const changePassword=()=>{      
    }
    let shouldRender=true;
    return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            <View style={styles.roundIcon}>
                <Feather name={'user'} size={40} color={'white'}/>    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Profile</Text>
            <TextInput onChangeText={setName}
             placeholder='Name*'
             autoFocus={true}
             value={name}
             style={styles.textInput}/>         
             <TextInput style={styles.textInput} value={phoneNumber} onChangeText={setPhoneNumber}/>
             <SelectList
             setSelected={setSelectedCurrentLocations}
             defaultOption={data.find(entry=>entry.key==location)}
             data={data}
             boxStyles={styles.textInput}
             placeholder={'Current Location*'}
             searchPlaceholder={'Select Option*'} />
            <Pressable onPress={SaveProfile} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text> 
            </Pressable>
            {shouldRender?
            <View style={{marginBottom:50}}>
                 <Text style={styles.linkText} onPress={deactivateAccount}>Deactivate Account</Text>
            </View>:<View>
            </View>}
            {shouldRender?
            <View style={{marginBottom:50}}>
                 <Text style={styles.linkText} onPress={changePassword}>Change Password</Text>
            </View>:<View>
            </View>}
            <Toast/>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'red'} size={'large'} style={styles.loading}/>:<View/>}
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height-(StatusBar.currentHeight||0),
        backgroundColor:'yellow',
    },
    roundIcon:{
        backgroundColor:'black',
        width:80,
        height:80,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:StatusBar.currentHeight||20
    },
    textInput:{
        marginTop:30,
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        padding:10,
        backgroundColor:'white'
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
        marginBottom:20,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:16
    },
    linkText:{
        color:'red'
    },loading: {
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