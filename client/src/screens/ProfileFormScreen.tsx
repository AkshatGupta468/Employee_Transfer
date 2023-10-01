import React,{useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar, Pressable,Dimensions, ScrollView, Alert,} from 'react-native';
import {TextInput} from 'react-native-paper'
import { Feather} from '@expo/vector-icons';
import {  MultipleSelectList, SelectList } from 'react-native-dropdown-select-list';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';
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
import User from '../utils/Datatypes';
import { saveUserData } from '../utils/LocalStorageHandler';
import { AppStyles } from '../utils/AppStyles';

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
        let token=await getToken()
        await axios.patch(`${BACKEND_BASE_URL}/profile`,{
            name: name,
            location: selectedCurrentLocation,
            preferredLocations:selectedPreferredLocations,
        },{headers:{Authorization:`Bearer ${token}`}})
        .then(response=>{
            console.log(response.data);
            console.log('sent data');
            const myuser:User={
                _id:response.data.data.user._id,
                name:response.data.data.user.name,
                email:response.data.data.user.email,
                location:response.data.data.user.location,
                preferredLocations:response.data.data.user.preferredLocations,
                photo:response.data.data.user.hasOwnProperty("photo")?response.data.data.user.photo:''
            }
            saveUserData(myuser)
            Toast.show({type:'success',text1:'Profile created successfully'})
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
             <TextInput style={AppStyles.textInput} mode='outlined' label="Name" onChangeText={setName} multiline={false} activeOutlineColor={colors['dark-grey']} outlineColor={colors.black} ></TextInput>
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