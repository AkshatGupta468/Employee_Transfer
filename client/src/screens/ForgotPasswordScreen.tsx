import React,{useState} from 'react';
import { Text,View,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather,Ionicons } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { AppStyles } from '../utils/styles';
import { RootStackParamList } from '../interfaces/app_interfaces';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors } from '../utils/colors';
import { forgotPassword } from '../api';


type ScreenProps=NativeStackScreenProps<RootStackParamList,"ForgotPassword">;

export default function ForgotPasswordScreen({navigation,route}:ScreenProps){
    console.log("I'm in Forgot Password");
    const [email,setEmail]=useState('');
    //TEST the following code:
    
    //=================================================================================
    const sendMail=async(email:string)=>{
        let {error,message}=await forgotPassword(email)
        if(error){
            Toast.show({type:'error',text1:message,position:'bottom'})
            return;
        }
        console.log("Sending Mail to user...")
    };
    //=================================================================================

    return(
            <View style={AppStyles.container}>
                <Ionicons name="arrow-back-outline" size={30} color={colors['dark']} style={[{position:'absolute',left:0,paddingHorizontal:10},AppStyles.topMostItem]} onPress={()=>navigation.goBack()}/>
                <View style={[AppStyles.roundIcon,AppStyles.topMostItem]}>
                    <Feather name={'lock'} size={40} color={'white'} />    
                </View>
                <View style={{alignItems:'center'}}>     
                    <Text style={[AppStyles.infoText,{fontSize:24,marginTop:20}]}>Forgot Password?</Text>
                    <Text style={[AppStyles.infoText,{marginTop:20}]}>Enter the registered mail</Text>
                    <Text style={[AppStyles.infoText,{fontSize:14,marginTop:20}]}>The link to reset password shall be sent on the below e-mail</Text>
                </View>
                <TextInput onChangeText={setEmail}
                placeholder='Email Address*'
                autoFocus={true}
                autoComplete={'email'}
                style={AppStyles.textInput}/>
                <Pressable onPress={()=>{sendMail(email)}} style={AppStyles.button}>
                    <Text style={AppStyles.buttonText}>Send</Text>
                </Pressable>
                <Toast/>
            </View>
    );
}
