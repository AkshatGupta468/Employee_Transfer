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
    const [phoneNumber,setPhoneNumber]=useState('');
    const [name,setName]=useState('');
    const [location,setLocation]=useState('');

    
    console.log("I'm in SignUp")
    console.log(navigation)
    
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
    const BACKEND_BASE_URL=`http://10.10.5.131:3000/api/v1/users`;
    const SignUp=()=>{
        console.log('Sign Up');
        axios.post(`${BACKEND_BASE_URL}/signup`,{
            name: name,
            email: email,
            password: password,
            passwordConfirm:confirmPassword,
            location: location,
            phone_number: phoneNumber,
        })
        .then(response=>{
            console.log(response.data);
            // popScreen('WithinAppNavigator');
            // navigation.navigate('WithinAppNavigator');
        }).catch((error)=>{
            let message:string
            let errorData=error.response.data.errors;
            console.log(error.response.data)
            if(errorData.hasOwnProperty("name")){
                message=errorData.name.message
            }else if(errorData.hasOwnProperty("phone_number")){
                message=errorData.phone_number.message
            }else if(errorData.hasOwnProperty("email")){
                message=errorData.email.message
            }else if(errorData.hasOwnProperty("password")){
                message=errorData.password.message
            }else if(errorData.hasOwnProperty("passwordConfirm")){
                message=errorData.passwordConfirm.message
            }else if(errorData.hasOwnProperty("location")){
                message=errorData.location.message
            }else{
                message="UNKNOWN ERROR!"
            }
            Toast.show({type:'error',text1:message,position:'bottom'})
            console.log(message)
        })
    }
    return(
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.roundIcon}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Sign Up</Text>
            <TextInput onChangeText={setName}
                placeholder='Name*'
                autoFocus={true}
                style={styles.textInput}/>
             <PhoneInput 
             onChangePhoneNumber={setPhoneNumber}
             initialCountry='in'
             style={styles.textInput}/>
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
             <TextInput onChangeText={setConfirmPassword}
              placeholder='Confirm Password*'
              autoFocus={true}
              secureTextEntry={true}
              style={styles.textInput}/>
             <SelectList
             setSelected={setLocation}
             data={data}
             boxStyles={styles.textInput}
             placeholder={'Current Location*'}
             searchPlaceholder={'Select Option*'} />

            <Pressable onPress={SignUp} style={styles.button}>
                <Text style={styles.buttonText}>Sign Up</Text>
            </Pressable>
                <View style={{marginTop:50,flexDirection:'row',marginBottom:50}}>
                 <Text>Already have an account? </Text>
                 <Text onPress={SignIn} style={styles.linkText}>Sign In</Text>
                </View>
            <Toast/>
        </View>
        </ScrollView>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'yellow',
    },
    roundIcon:{
        backgroundColor:'black',
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
        backgroundColor:'white'
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
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
    }
});