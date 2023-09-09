import React,{useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Button, Pressable} from 'react-native';
import { Feather } from '@expo/vector-icons'
import PhoneInput from "react-native-phone-input";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import { StackActions } from '@react-navigation/native';

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
    const Change=()=>{
        console.log('Change');
        navigation.pop(1);
    }
    return(
        <View style={styles.container}>
            <View style={styles.roundIcon}>
                <Feather name={'lock'} size={40} color={'white'} />    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Change Password</Text>
            <TextInput onChangeText={setOldPassword}
             placeholder='Current Password*'
             autoFocus={true}
             secureTextEntry={true}
             style={styles.textInput}/>
            <TextInput onChangeText={setNewPassword}
            placeholder='New Password*'
            autoFocus={true}
            secureTextEntry={true}
            style={styles.textInput}/>
            <TextInput onChangeText={setConfirmationPassword}
            placeholder='Confirm New Password*'
            autoFocus={true}
            secureTextEntry={true}
            style={styles.textInput}/>
            <Pressable onPress={Change} style={styles.button}>
                <Text style={styles.buttonText}>Change</Text>
            </Pressable>
        </View>
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