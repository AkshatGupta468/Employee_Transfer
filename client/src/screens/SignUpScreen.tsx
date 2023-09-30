import React,{useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable,ScrollView} from 'react-native';
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

    
    // console.log("I'm in SignUp")
    // console.log(navigation)
    
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
            name: name,
            email: email,
            password: password,
            passwordConfirm:confirmPassword,
            location: location
        })
        .then(response=>{
            console.log(response.data);
            popScreen('WithinAppNavigator');
            navigation.navigate('WithinAppNavigator');
        }).catch((error)=>{
            let errorData=error.response.data.errors;
            let {name,message}=getError(errorData)
            Toast.show({type:'error',text1:message,position:'bottom'})
            console.log(message)
        })
    }
    return(
        <View style={styles.container}>
            <View style={styles.roundIcon}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Sign Up</Text>
            {/* <TextInput onChangeText={setName}
                placeholder='Name*'
                autoFocus={true}
                style={styles.textInput}/> */}
            <TextInput onChangeText={setEmail}
             placeholder='Email Address*'
             autoFocus={true}
             autoComplete={'email'}
             style={styles.textInput}/>
            <PasswordTextField setPassword={setPassword} placeHolder={'Password*'}/>
            <PasswordTextField setPassword={setConfirmPassword} placeHolder={'Confirm Password*'}/>
             {/* <SelectList
             setSelected={setLocation}
             data={data}
             boxStyles={styles.textInput}
             placeholder={'Current Location*'}
             searchPlaceholder={'Select Option*'} /> */}

            <Pressable onPress={SignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
                <View style={{marginTop:50,flexDirection:'row',marginBottom:50}}>
                 <Text style={{fontSize:16}}>Already have an account? </Text>
                 <Text onPress={SignIn} style={styles.linkText}>Sign In</Text>
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
        paddingHorizontal:20,
        fontSize:16,
        backgroundColor:'white'
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