import React,{useState} from 'react';
import { Text,View,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather,Ionicons } from '@expo/vector-icons'
import PhoneInput from "react-native-phone-input";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/app_interfaces';
import { StackActions } from '@react-navigation/native';
import PasswordTextField from '../components/PasswordTextField';
import { colors } from '../utils/colors';
import { getToken } from '../utils/TokenHandler';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@env';
import Toast from 'react-native-toast-message';
import { getError } from '../utils/ErrorClassifier';
import { AppStyles } from '../utils/AppStyles';

type ChangePasswordScreenProps=NativeStackScreenProps<RootStackParamList,"ChangePassword">;



export default function ChangePasswordScreen({route,navigation}:ChangePasswordScreenProps) {
    const [oldPassword,setOldPassword]=useState('');
    const [newPassword,setNewPassword]=useState('');
    const [confirmationPassword,setConfirmationPassword]=useState('');
    console.log("I'm in ChangePasswordScreen")
    
    const popScreen=(screenName:string)=>{
        navigation.dispatch(
            StackActions.replace(screenName)
          );
    }
    const Change=async()=>{
        console.log('Change');
        let token=await getToken();
        axios.patch(`${BACKEND_BASE_URL}/updatePassword`,{
            
        },{headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                console.log(response.data)
                Toast.show({type:'success',text1:'Password Changed Successfully',position:'bottom'})
            }).catch((error)=>{
                let errorData=error.response.data;
                let {name,message}=getError(errorData);
                Toast.show({type:'error',text1:message});
            })
    }
    return(
        <View style={AppStyles.container}>
            <Ionicons name="arrow-back-outline" size={30} color={colors['dark']} style={[{position:'absolute',left:0,paddingHorizontal:10},AppStyles.topMostItem]} onPress={()=>navigation.goBack()}/>
            <View style={[AppStyles.roundIcon,AppStyles.topMostItem]}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={[AppStyles.heading,{marginTop:20}]}>Change Password</Text>
            <PasswordTextField placeHolder='Current Password*' setPassword={setOldPassword}/>
            <PasswordTextField placeHolder='New Password*' setPassword={setNewPassword}/>
            <PasswordTextField placeHolder='Confirm New Password*' setPassword={setConfirmationPassword}/>
            <Pressable onPress={Change} style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>Change</Text>
            </Pressable>
        </View>
    )
}
