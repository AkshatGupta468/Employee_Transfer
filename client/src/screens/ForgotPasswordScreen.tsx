import React,{useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen(){
    console.log("I'm in Forgot Password");
    const [email,setEmail]=useState('');

    const sendMail=(email:String)=>{
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