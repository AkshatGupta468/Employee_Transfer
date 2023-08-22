import React,{ProfilerProps, useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';

type SignInProps=NativeStackScreenProps<RootStackParamList,"SignIn">;

export default function SignInScreen({route,navigation}:SignInProps) {
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    
    const SignIn=()=>{
        console.log('Sign In');
    }
    const forgotPassword=()=>{
        console.log('Forgot Password');
        navigation.navigate('ForgotPassword');
    }
    const SignUp=()=>{
        console.log('Sign Up');
        navigation.navigate('SignUp');
    }
    console.log("I'm in SignIN")
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
             style={styles.textInput}/>
            <Pressable onPress={SignIn} style={styles.button}>
                <Text style={styles.buttonText}>Sign In</Text>
            </Pressable>
            <View style={{alignItems:'center'}}>
                <Text onPress={forgotPassword} style={[styles.linkText,{marginTop:20}]}>Forgot Password?</Text>
                <View style={{marginTop:50,flexDirection:'row'}}>
                 <Text>Don't Have an account? </Text>
                 <Text onPress={SignUp} style={styles.linkText}>Sign Up</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        backgroundColor:'yellow',
        height:StatusBar.currentHeight||0
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