import React,{useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export default function ForgotPasswordScreen(){
    console.log("I'm in Forgot Password");
    const [email,setEmail]=useState('');
    const BACKEND_BASE_URL=`http://10.10.5.131:3000/api/v1/users`;

    const sendMail=(email:String)=>{
        axios.post(`${BACKEND_BASE_URL}/forgotPassword`,{email})
            .then(response=>{
                console.log(response.data);
            }).catch((error)=>{
                let message:string
                let errorData=error.response.data.errors;
                if(errorData.hasOwnProperty("email")){
                    message=errorData.email.message
                }else{
                    message='Unknown Error'
                }
                Toast.show({type:'error',text1:message,position:'bottom'})
                console.log(message)
            })
        console.log("Sending Mail to user...")
    };

    return(
            <View style={styles.container}>
                <View style={styles.roundIcon}>
                    <Feather name={'lock'} size={40} color={'white'} />    
                </View>     
                <Text style={{fontSize:24,marginTop:20}}>Forgot Password?</Text>
                <Text style={{fontSize:16,marginTop:20}}>Enter the registered mail</Text>
                <Text style={{fontSize:12,marginTop:20}}>The link to reset password shall be sent on the below e-mail</Text>
                <TextInput onChangeText={setEmail}
                placeholder='Email Address*'
                autoFocus={true}
                autoComplete={'email'}
                style={styles.textInput}/>
                <Pressable onPress={()=>{sendMail(email)}} style={styles.button}>
                    <Text style={styles.buttonText}>Send</Text>
                </Pressable>
                <Toast/>
            </View>
    );
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
    }
});