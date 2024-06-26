import React,{ProfilerProps, useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather} from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import {BACKEND_BASE_URL} from "@env";
import { getToken,saveToken,removeToken } from '../utils/TokenHandler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getError } from '../utils/ErrorClassifier';
import PasswordTextField from '../components/PasswordTextField';
import { colors } from '../utils/colors';
import { useTheme } from 'react-native-paper';
import User from '../utils/Datatypes';
import { saveUserData } from '../utils/LocalStorageHandler';
import { AppStyles } from '../utils/AppStyles';
import { signIn } from '../api';


type SignInProps=NativeStackScreenProps<RootStackParamList,"SignIn">;

export default function SignInScreen({route,navigation}:SignInProps) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const checkToken=async()=>{
        let token=await getToken()
        if(token!==null){
            await axios.get(`${BACKEND_BASE_URL}/profile`,{headers:{Authorization:`Bearer ${token}`}})
            .then(response=>{
                if(!response.data.data.user.hasOwnProperty("name")||!response.data.data.user.hasOwnProperty("location")||!response.data.data.user.hasOwnProperty("preferredLocations")){
                    popScreen('ProfileFormScreen');
                    navigation.navigate('ProfileFormScreen')
                }else{
                    popScreen('WithinAppNavigator');
                    navigation.navigate('WithinAppNavigator')
                }                 
            }).catch(error=>{
                console.log(error.response.data)
                Toast.show({type:'error',text1:error})                                
            })
        }
    }
    useEffect(()=>{
        checkToken() 
    },[])
    
    const popScreen=(screenName:string)=>{
        navigation.dispatch(
            StackActions.replace(screenName)
          );
    }
    const SignIn=async()=>{
        let {error,message}=await signIn(email,password);
        if(error){
            Toast.show({type:'error',text1:message,position:'bottom'})
        }else{
            Toast.show({type:'success',text1:'Logged In Successfully',position:'bottom'})
            if(message==='1'){
                popScreen('ProfileFormScreen');
                navigation.navigate('ProfileFormScreen')
            }else if(message==='2'){
                popScreen('WithinAppNavigator');
                navigation.navigate('WithinAppNavigator')
            }
        }
    }
    const forgotPassword=()=>{
        console.log('Forgot Password');
        navigation.navigate('ForgotPassword');
    }
    const SignUp=()=>{
        console.log('Sign Up');
        popScreen('SignUp');
        navigation.navigate('SignUp');
    }
    return(
        <View style={AppStyles.container}>
            <View style={[AppStyles.topMostItem,AppStyles.roundIcon]}>
                <Feather name={'lock'} size={40} color={colors.white} />    
            </View>     
            <Text style={[{marginTop:20},AppStyles.heading]}>Sign In</Text>
            <TextInput onChangeText={setEmail}
             placeholder='Email Address*'
             autoFocus={true}
             autoComplete={'email'}
             style={AppStyles.textInput}/>
            <PasswordTextField setPassword={setPassword} placeHolder='Password*'/>
            <Pressable onPress={SignIn} style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>Sign In</Text> 
            </Pressable>
            <View style={{alignItems:'center'}}>
                <Text onPress={forgotPassword} style={[AppStyles.linkText,{marginTop:20}]}>Forgot Password?</Text>
                <View style={{marginTop:50,flexDirection:'row'}}>
                 <Text style={AppStyles.infoText}>Don't Have an account? </Text>
                 <Text onPress={SignUp} style={AppStyles.linkText}>Sign Up</Text>
                </View>
            </View>
            <Toast/>
        </View>
    )
}
