import React,{useEffect, useState,useRef} from 'react';
import { View,TextInput }  from 'react-native';
import { Feather} from '@expo/vector-icons';
import { AppStyles } from '../utils/AppStyles';

interface props{
    setPassword:React.Dispatch<React.SetStateAction<string>>
    placeHolder:string    
}

export default function PasswordTextField(input:props){
    const [secure,setSecure]=useState(true);
    return(
        <View style={[{flexDirection:'row'},AppStyles.textInput]}>
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