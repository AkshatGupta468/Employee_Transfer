import React,{useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar, Pressable,Dimensions, ScrollView, Alert,} from 'react-native';
import {TextInput} from 'react-native-paper'
import { Feather} from '@expo/vector-icons';
import {  MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/app_interfaces';

import { getToken,saveToken,removeToken } from '../utils/TokenHandler';
import { BACKEND_BASE_URL } from '@env';
import axios from 'axios';
import { Toast } from 'react-native-toast-message/lib/src/Toast';
import { StackActions } from '@react-navigation/native';
import { getError } from '../utils/ErrorClassifier';
import PhoneInput from 'react-native-phone-input';
import { ActivityIndicator, Divider, Menu,Button, PaperProvider } from 'react-native-paper';
import EditableTextField from '../components/EditableTextField';
import { AntDesign,Ionicons,MaterialCommunityIcons } from '@expo/vector-icons'; 
import UploadImageField from '../components/UploadImageField';
import { colors } from '../utils/colors';
import { AppStyles } from '../utils/styles';
import { saveProfileAPI } from '../api';

const data = [
    {key:'1',value:'1'},
    {key:'2',value:'2'},
    {key:'3',value:'3'},
    {key:'4',value:'4'},
    {key:'5',value:'5'},
    {key:'6',value:'6'},
    {key:'7',value:'7'},
    {key:'8',value:'8'},
    {key:'9',value:'9'},
    {key:'10',value:'10'},
    {key:'11',value:'11'},
    {key:'12',value:'12'},
    {key:'13',value:'13'},
    {key:'14',value:'14'},
    {key:'15',value:'15'},
    {key:'16',value:'16'},
  ];

type ScreenProps=NativeStackScreenProps<RootStackParamList,"ProfileFormScreen">;

export default function ProfileFormScreen({route,navigation}:ScreenProps){
    const [name,setName]=useState<string>('');
    const [selectedCurrentLocation,setSelectedCurrentLocation]=useState<string>();
    const [selectedPreferredLocations,setSelectedPreferredLocations]=useState<string[]>([]);
    const [loading,setLoading]=useState<boolean>(false);

    const popScreen=(screenName:string)=>{
        navigation.dispatch(
            StackActions.replace(screenName)
          );
    }
    const saveProfile=async()=>{
        let {error,message}=await saveProfileAPI(name,selectedCurrentLocation,selectedPreferredLocations)
        if(error){
            Toast.show({type:'error',text1:message,position:'bottom'})
            return;
        }else{
            Toast.show({type:'success',text1:'Profile created successfully!!',position:'bottom'})
        }
        popScreen('WithinAppNavigator');
        navigation.navigate('WithinAppNavigator');
             
    }

    return(
        <View style={AppStyles.container}>
            <PaperProvider>
            <View style={[AppStyles.topMostItem,{flexDirection:'row-reverse',justifyContent:'center'}]}>
                <View>
                    <Text style={{fontSize:24}}>Complete Profile</Text>
                </View>
            </View>
            <View style={{alignSelf:'center',margin:20}}>
                <UploadImageField/>
            </View>
            <Toast/>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'#25D366'} size={'large'} style={AppStyles.loading}/>:<View/>}
             <TextInput style={{alignSelf:'center',marginTop:40,borderColor:colors["light-grey"],width:250,height:50,paddingHorizontal:5,backgroundColor:'#c0c0c0',fontSize:16}} mode='outlined' label="Name" onChangeText={setName} multiline={false} activeOutlineColor={colors['dark-grey']} outlineColor={colors.black} ></TextInput>
             <SelectList
                        boxStyles={{borderRadius:4,alignItems:'center',borderColor:colors.black,width:250,height:50,backgroundColor:colors['light-grey'],marginTop:20,alignSelf:'center'}}
                        dropdownStyles={{width:250,alignSelf:'center'}}
                        inputStyles={{color:colors['dark'],fontSize:16}}
                        setSelected={setSelectedCurrentLocation}
                        data={data}
                        placeholder={'Current Location*'}
                        searchPlaceholder={'Select Option*'}/>
            <MultipleSelectList
                        boxStyles={{minHeight:50,borderRadius:4,alignItems:'center',borderColor:colors.black,width:250,backgroundColor:colors['light-grey'],marginTop:20,alignSelf:'center'}}
                        dropdownStyles={{width:250,alignSelf:'center'}}
                        inputStyles={{color:colors['dark'],fontSize:16}}
                        labelStyles={{fontSize:0}}
                        badgeStyles={{borderRadius:4,paddingHorizontal:10,margin:0,backgroundColor:colors['dark-grey']}}
                        setSelected={setSelectedPreferredLocations}
                        data={data}
                        placeholder={'Preferred Location(s)*'}
                        searchPlaceholder={'Select Option*'}/>
            <Pressable onPress={saveProfile} style={AppStyles.button}>
                <Text style={AppStyles.buttonText}>Save</Text>
            </Pressable>
             </PaperProvider>
        </View>
    )
}