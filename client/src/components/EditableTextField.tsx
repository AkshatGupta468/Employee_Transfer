import React,{useEffect, useState,useRef} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView, Touchable, TouchableHighlight, Button} from 'react-native';
import { Feather,FontAwesome5} from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import { getToken } from '../utils/TokenHandler';
import { RouteProp, StackActions } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/app_interfaces';

import Toast from 'react-native-toast-message';
import axios from 'axios';
import { BACKEND_BASE_URL } from '@env';
import { getError } from '../utils/ErrorClassifier';
import { MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { colors } from '../utils/colors';
import { saveUserLocation, saveUserName, saveUserPreferredLocations } from '../utils/LocalStorageHandler';
import { AppStyles } from '../utils/AppStyles';

interface EditableTextFieldParams{
    icon:string,
    fieldName?:string,
    fieldValue?:string,
    fieldObj:string[],
    iconSize?:number,
    help:string,
    editable:boolean,
    setName:React.Dispatch<React.SetStateAction<string>>,
    setLocation:React.Dispatch<React.SetStateAction<string>>,
    setPreferredLocations:React.Dispatch<React.SetStateAction<string[]>>,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>,
    route:RouteProp<RootStackParamList, "WithinAppNavigator">,
    navigation:NativeStackNavigationProp<RootStackParamList, "WithinAppNavigator", undefined>
}

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

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const goToSignInPage=({route,navigation}:TabsScreenProps)=>{
    Toast.show({type:'error',text1:"Log In again to continue"})
    navigation.dispatch(StackActions.replace("SignIn"))
    navigation.navigate("SignIn");
}

export default function EditableTextField(input:EditableTextFieldParams){
    const route=input.route
    const navigation=input.navigation
    const [clicked,setClicked]=useState(false);
    const [newValue,setValue]=useState('');
    const [newValueObj,setValueObj]=useState<string[]>([]);
    const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
    const openDrawer=()=>{
        if(input.fieldName==='Location'||input.fieldName==='Preferred Locations')
            bottomDrawerRef.current?.open()
        else
            bottomDrawerRef.current?.open(150)      
    }
    const SaveProfile=async()=>{
        if(token===null){
            goToSignInPage({route,navigation})
        }else{
            input.setLoading(true)
            var patchData
            if(input.fieldName==='Name'){
                patchData={name:newValue};
            }else if(input.fieldName==='Location'){
                patchData={location:newValue};
            }else{
                patchData={preferredLocations:newValueObj};
            }
            bottomDrawerRef.current?.close()
            axios.patch(`${BACKEND_BASE_URL}/profile`,patchData,{headers:{Authorization:`Bearer ${token}`}})
            .then(async response=>{
                console.log(response.data)
                if(input.fieldName==='Name'){
                    input.setName(newValue)
                }else if(input.fieldName==='Location'){
                    input.setLocation(newValue)
                }else if(input.fieldName==='Preferred Locations'){
                    input.setPreferredLocations(newValueObj)
                    setValueObj([])
                }
                Toast.show({type:'success',text1:'Saved Profile Successfully',position:'bottom'})
                input.setLoading(false)
            }).catch((error)=>{
                let errorData=error.response.data;
                let {name,message}=getError(errorData);
                Toast.show({type:'error',text1:message});
                goToSignInPage({route,navigation})
            })
        }
    }
    return(
        <View style={styles.horizontalView}>
            <View style={{margin:5}}>
            {
                input.icon==='map-pin'?
                <Feather name={'map-pin'} size={input.iconSize} color={'#6B6764'}/>:
                input.icon==='mail'?
                <Feather name={'mail'} size={input.iconSize} color={'#6B6764'}/>:
                input.icon==='user'?
                <Feather name={'user'} size={input.iconSize} color={'#6B6764'}/>:
                input.icon==='search-location'?
                <FontAwesome5 name={'search-location'} size={input.iconSize} color={'#6B6764'}/>:
                <View></View>
            }
            </View>
            <View>
                <Text style={styles.helperText}>{input.fieldName}</Text>
                {input.fieldName!=='Preferred Locations'?
                    <Text style={styles.inputText}>{input.fieldValue}</Text>:
                    <Text style={styles.inputText}>{input.fieldObj.join(',')}</Text>
                }
                <Text style={styles.helperText}>{input.help}</Text>
            </View>
            {   input.editable?
                <TouchableHighlight style={{position:'absolute',right:0}} onPress={()=>{openDrawer()}} activeOpacity={1} underlayColor={'white'}>
                    <Feather name={'edit'} size={input.iconSize} color={'#25D366'}/>
                </TouchableHighlight>:<View></View>
            }
            <BottomDrawer ref={bottomDrawerRef} openOnMount={false}>
                <View style={{margin:20}}>
                    <Text>Enter your {input.fieldName}</Text>
                    {input.fieldName==='Location'?
                        <SelectList
                        boxStyles={{marginVertical:20}}
                        setSelected={setValue}
                        data={data}
                        placeholder={'Current Location*'}
                        searchPlaceholder={'Select Option*'} />:
                        input.fieldName==='Preferred Locations'?
                        <MultipleSelectList
                        boxStyles={{marginVertical:20}}
                        dropdownStyles={{maxHeight:200}}
                        inputStyles={{color:colors['dark'],fontSize:16}}
                        labelStyles={{fontSize:0}}
                        badgeStyles={AppStyles.badgeStyles}
                        setSelected={setValueObj}
                        data={data}
                        placeholder={'Preferred Location(s)*'}
                        searchPlaceholder={'Select Option*'}/>
                        :<TextInput onChangeText={setValue} defaultValue={input.fieldValue}></TextInput>
                    }

                    <View style={{flexDirection:'row-reverse'}}>
                    <TouchableHighlight activeOpacity={1} style={styles.textButton} underlayColor={'#6B6764'} onPress={async()=>{await SaveProfile()}}>
                        <Text style={styles.text}>Save</Text>
                    </TouchableHighlight>
                    <TouchableHighlight activeOpacity={1} style={styles.textButton} underlayColor={'#6B6764'} onPress={()=>{bottomDrawerRef.current?.close()}} >
                        <Text style={styles.text}>Cancel</Text>
                    </TouchableHighlight>
                    </View>
                </View>
            </BottomDrawer>
        </View>               
    )
}

const styles=StyleSheet.create({
    horizontalView:{
        flexDirection:'row',
        marginHorizontal:20,
        marginVertical:10
    },
    helperText:{
        fontSize:14,
        color:'#6B6764'
    },
    inputText:{
        fontSize:16,
        color:'#000000'
    },
    drawer:{
        height:'auto',
    },
    textButton:{
        borderRadius:20,
        margin:5
    },
    text:{
        color:'#25D366',
        paddingHorizontal:15,
        paddingVertical:10
    }
})