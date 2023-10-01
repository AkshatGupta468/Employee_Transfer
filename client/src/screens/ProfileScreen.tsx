import React,{useEffect, useState} from 'react';
import { Text,View,StatusBar,TextInput, Pressable,Dimensions, ScrollView, Alert,} from 'react-native';
import { Feather} from '@expo/vector-icons';
import {  SelectList } from 'react-native-dropdown-select-list';
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
import ChangePasswordScreen from './ChangePasswordScreen';
import { getUserData } from '../utils/LocalStorageHandler';
import { AppStyles } from '../utils/AppStyles';

const helpName=`This is not your username or pin.This name will be visible to other users`;

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

interface ProfileDataStructure{
    name:string,
    phoneNumber:string,
    location:string
}

interface profileStates{
    setName:React.Dispatch<React.SetStateAction<string>>
    setLocation:React.Dispatch<React.SetStateAction<string>>
    setPreferredLocations:React.Dispatch<React.SetStateAction<string[]>>
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
}

type TabsScreenProps=NativeStackScreenProps<RootStackParamList,"WithinAppNavigator">;

const goToSignInPage=({route,navigation}:TabsScreenProps)=>{
    Toast.show({type:'error',text1:"Log In again to continue"})
    navigation.dispatch(StackActions.replace("SignIn"))
    navigation.navigate("SignIn");
}

export default function ProfileScreen({route,navigation}:TabsScreenProps){
    const [name,setName]=useState<string>('');
    const [location,setLocation]=useState<string>('');
    const [loading,setLoading]=useState<boolean>(false);
    const [email,setEmail]=useState<string>();
    const [preferredLocations,setPreferredLocations]=useState<string[]>([]);
    const states:profileStates={
        setName:setName,
        setLocation:setLocation,
        setPreferredLocations:setPreferredLocations,
        setLoading:setLoading
    }
    useEffect(()=>{
        getProfile()
    },[])
    const getProfile=async()=>{
        const token=await getToken();
        if(token===null){
            console.log("empty token")
            goToSignInPage({route,navigation})
        }
        setLoading(true)
        await getUserData().then(
            response=>{
            let userData=response
            if(userData!==undefined){
                setName(userData.name)
                setLocation(userData.location)
                setEmail(userData.email)
                setPreferredLocations(userData.preferredLocations)
                setLoading(false)
                Toast.show({type:'success',text1:'Recieved Profile Successfully',position:'bottom'})
            }
            }).catch(error=>{
            Toast.show({type:'error',text1:"Couldn't retrieve profile"});
        })
    }
    const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  }

  const closeMenu = () => setVisible(false);
    const deactivateAccount=async ()=>{
        closeMenu()
        Alert.alert('Deactivate Account','Are you sure you want to deactivate your account? ', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: async () => {
            const token=await getToken();
            if(token===null){
                console.log("empty token")
                goToSignInPage({route,navigation})
            }
            await axios.patch(`${BACKEND_BASE_URL}/profile`,{deactivated:true},{headers:{Authorization:`Bearer ${token}`}}).
            then(response=>{
                console.log(response.data)
                removeToken();
                goToSignInPage({route,navigation})
            }).catch(error=>{
            if(getError(error.response.data).name==='USER_DELETED'){
                removeToken()
                goToSignInPage({route,navigation})
            }
            Toast.show({type:'error',text1:"Couldn't retrieve profile"});
        })

    }},
    ]);
    }
    const signOut=()=>{
        closeMenu()
        Alert.alert('Sign Out','Are you sure you want to Sign Out? ', [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {text: 'OK', onPress: () => {
                removeToken();
                goToSignInPage({route,navigation})
            }},
          ]);
    }
    const changePassword=()=>{
        closeMenu()
        navigation.navigate("ChangePassword");        
    }
    return(
        <View style={AppStyles.container}>
            <PaperProvider>
            <View style={[AppStyles.topMostItem,{flexDirection:'row-reverse',justifyContent:'center'}]}>
                <View style={{position:'absolute',left:0,marginHorizontal:20}}>
                    <Menu
                        anchorPosition='top'
                        visible={visible}
                        onDismiss={closeMenu}
                        contentStyle={{backgroundColor:'white'}}
                        anchor={<Feather name='menu' size={24} color={'#25D366'} onPress={openMenu}/>}>
                        <Menu.Item leadingIcon={()=><AntDesign name="delete" size={20} color="black" />} onPress={() => {deactivateAccount()}} title="Deactivate Account"/>
                        <Divider />
                        <Menu.Item leadingIcon={()=><Ionicons name="exit-outline" size={24} color="black" />}  onPress={() => {signOut()}} title="Sign Out" />
                        <Divider />
                        <Menu.Item leadingIcon={()=><MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}  onPress={() => {changePassword()}} title="Change Password" />
                    </Menu> 
                </View>
                <View>
                    <Text style={{fontSize:24}}>Profile</Text>
                </View>
            </View>
            <View style={{alignSelf:'center',margin:20}}>
                <UploadImageField />
            </View>
             <EditableTextField icon='user' 
             fieldName='Name' 
             fieldValue={name}  
             fieldObj={[]}
             iconSize={20} 
             help={helpName} 
             editable={true} 
             setName={setName} 
             setLocation={setLocation}
             setPreferredLocations={setPreferredLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>

             <Divider/>

             <EditableTextField icon='map-pin' 
             fieldName='Location' 
             fieldValue={location}  
             fieldObj={[]}
             iconSize={20} 
             help={``}
             editable={true} 
             setName={setName} 
             setLocation={setLocation}
             setPreferredLocations={setPreferredLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>

             <Divider/>

            <EditableTextField icon='search-location' 
             fieldName='Preferred Locations' 
             fieldValue={''}
             fieldObj={preferredLocations} 
             iconSize={20} 
             help={''} 
             editable={true} 
             setName={setName} 
             setLocation={setLocation}
             setPreferredLocations={setPreferredLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>
            <Toast/>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'#25D366'} size={'large'} style={AppStyles.loading}/>:<View/>}
             
             <Divider/>

            <EditableTextField icon='mail' 
             fieldName='Email' 
             fieldValue={email} 
             fieldObj={[]}
             iconSize={20} 
             help={`This is the registered email id`}
             editable={false} 
             setName={setName} 
             setLocation={setLocation}
             setPreferredLocations={setPreferredLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>
             
             </PaperProvider>
        </View>
    );
}
