import React,{ProfilerProps, useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import {BACKEND_BASE_URL} from "@env";
import { getToken,saveToken,removeToken } from '../utils/TokenHandler';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { getError } from '../utils/ErrorClassifier';


type SignInProps=NativeStackScreenProps<RootStackParamList,"SignIn">;

export default function SignInScreen({route,navigation}:SignInProps) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const checkToken=async()=>{
        let token=await getToken();
        if(token!==null){
            popScreen('WithinAppNavigator');
            navigation.navigate('WithinAppNavigator')
        }
    }
    useEffect(()=>{
        checkToken()
    })
    const popScreen=(screenName:string)=>{
        navigation.dispatch(
            StackActions.replace(screenName)
          );
    }
    const SignIn=async()=>{
        axios.post(`${BACKEND_BASE_URL}/login`,{email,password})
        .then(response=>{
            console.log(response.data);
            saveToken(response.data.token)
            Toast.show({type:'success',text1:'Logged In Successfully',position:'bottom'})
            popScreen('WithinAppNavigator');
            navigation.navigate('WithinAppNavigator')
        }).catch((error)=>{
            console.log(error.response)
            // let errorData=error.response.data.errors;
            // let {name,message}=getError(errorData)
            // Toast.show({type:'error',text1:message,position:'bottom'})
            // console.log(message)
        })
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
    console.log("I'm in SignIn")
    return(
        <View style={styles.container}>
            <View style={styles.roundIcon}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Sign In</Text>
            <TextInput onChangeText={setEmail}
             placeholder='Email Address*'
             autoFocus={true}
             autoComplete={'email'}
             style={styles.textInput}/>
            <TextInput onChangeText={setPassword}
            placeholder='Password*'
            autoFocus={true}
            secureTextEntry={true}
            style={styles.textInput}/>
            <Pressable onPress={SignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text> 
            </Pressable>
            <View style={{alignItems:'center'}}>
                <Text onPress={forgotPassword} style={[styles.linkText,{marginTop:20}]}>Forgot Password?</Text>
                <View style={{marginTop:50,flexDirection:'row'}}>
                 <Text style={{fontSize:16}}>Don't Have an account? </Text>
                 <Text onPress={SignUp} style={styles.linkText}>Sign Up</Text>
                </View>
            </View>
            <Toast/>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'white',
    },
    roundIcon:{
        backgroundColor:'#25D366',
        width:80,
        height:80,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:100
    },
    textInput:{
        marginTop:40,
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        padding:10,
        backgroundColor:'white',
        fontSize:15
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
        backgroundColor:'#25D366',
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
        color:'#25D383',
        fontSize:16
    }
});