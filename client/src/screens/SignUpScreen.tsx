import React,{useState} from 'react';
import { Text,View,StatusBar, Button, Pressable,ScrollView} from 'react-native';
import {TextInput} from 'react-native'
import { Feather } from '@expo/vector-icons'
import PhoneInput from "react-native-phone-input";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import {  SelectList } from 'react-native-dropdown-select-list';
import { getError } from '../utils/ErrorClassifier';
import PasswordTextField from '../components/PasswordTextField';
import { BACKEND_BASE_URL } from '@env';
import { saveToken } from '../utils/TokenHandler';
import { AppStyles } from '../utils/AppStyles';

type SignUpScreenProps=NativeStackScreenProps<RootStackParamList,"SignUp">;

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

  const roleData=[{key:'1',value:'Jammu & Kashmir'},
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
  {key:'16',value:'H'},];

export default function SignUpScreen({route,navigation}:SignUpScreenProps) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [confirmPassword,setConfirmPassword]=useState('');
    const [name,setName]=useState('');
    const [location,setLocation]=useState('');
    
    const popScreen=(screenName:string)=>{
        navigation.dispatch(
            StackActions.replace(screenName)
          );
    }

    const SignIn=()=>{
        console.log('Sign In');
        popScreen('SignIn');
        navigation.navigate("SignIn");
    }
    const forgotPassword=()=>{
        console.log('Forgot Password');
        navigation.navigate("ForgotPassword");
    }
    const SignUp=()=>{
        console.log('Sign Up');
        axios.post(`${BACKEND_BASE_URL}/signup`,{
            email: email,
            password: password,
            passwordConfirm:confirmPassword
        })
        .then(response=>{
            console.log(response.data);
            saveToken(response.data.token)
            popScreen('ProfileFormScreen');
            navigation.navigate('ProfileFormScreen');
        }).catch((error)=>{
            let errorData=error.response.data.errors;
            let {name,message}=getError(errorData)
            Toast.show({type:'error',text1:message,position:'bottom'})
            console.log(message)
        })
    }
    return(
        <View style={AppStyles.container}>
            <View style={[AppStyles.topMostItem,AppStyles.roundIcon]}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={[{marginTop:20},AppStyles.heading]}>Sign Up</Text>
            <TextInput onChangeText={setEmail}
             placeholder='Email Address*'
             autoFocus={true}
             autoComplete={'email'}
             style={AppStyles.textInput}/>
            <PasswordTextField setPassword={setPassword} placeHolder={'Password*'}/>
            <PasswordTextField setPassword={setConfirmPassword} placeHolder={'Confirm Password*'}/>
            <Pressable onPress={SignUp} style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>Sign Up</Text>
            </Pressable>
                <View style={{flexDirection:'row',marginTop:50,alignSelf:'center'}}>
                 <Text style={AppStyles.infoText}>Already have an account? </Text>
                 <Text onPress={SignIn} style={AppStyles.linkText}>Sign In</Text>
                </View>
            <Toast/>
        </View>
    )
}