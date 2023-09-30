import React,{useEffect, useState,useRef} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView, Touchable, TouchableHighlight, Button} from 'react-native';
import { Feather} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import { getToken } from '../utils/TokenHandler';
import { RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@env';
import { getError } from '../utils/ErrorClassifier';
import { SelectList } from 'react-native-dropdown-select-list';

interface props{
    setPassword:React.Dispatch<React.SetStateAction<string>>
    placeHolder:string    
}
export default function PasswordTextField(input:props){
    const [secure,setSecure]=useState(true);
    return(
        <View style={[{flexDirection:'row'},styles.textInput]}>
            <TextInput onChangeText={input.setPassword}
             placeholder={input.placeHolder}
             autoFocus={true}
             secureTextEntry={secure}
             style={{fontSize:16,flex:1}}/>
             <View style={{position:'absolute',right:0,alignSelf:'center',margin:10}}>
                {secure?<Feather name={'eye'} size={20} onPress={()=>setSecure(!secure)}/>:
                <Feather name={'eye-off'} size={20} onPress={()=>setSecure(!secure)}/>}
             </View>
        </View>
    )
}

const styles=StyleSheet.create({
    textInput:{
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        paddingHorizontal:20,
        backgroundColor:'white',
        marginTop:40
    }
})