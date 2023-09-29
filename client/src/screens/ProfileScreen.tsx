import React,{useEffect, useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView,} from 'react-native';
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
    setSelectedCurrentLocations:React.Dispatch<React.SetStateAction<object>>
    setPhoneNumber:React.Dispatch<React.SetStateAction<string>>
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
    const [selectedCurrentLocation,setSelectedCurrentLocations]=useState<object>([]);
    const [phoneNumber,setPhoneNumber]=useState<string>('');
    const [loading,setLoading]=useState<boolean>(false);
    const [email,setEmail]=useState<string>('');
    const states:profileStates={
        setName:setName,
        setLocation:setLocation,
        setSelectedCurrentLocations:setSelectedCurrentLocations,
        setPhoneNumber:setPhoneNumber,
        setLoading:setLoading
    }
    useEffect(()=>{
        getProfile()
    },[])
    const getProfile=async()=>{
        const token=await getToken();
        if(token===null){
            console.log("HERE")
            goToSignInPage({route,navigation})
        }
        try{
            setLoading(true)
            const response=await axios.get(`${BACKEND_BASE_URL}/profile`,{headers:{Authorization:`Bearer ${token}`}})
            let userData=response.data.data.user
            console.log("======================================================")
            console.log(userData)
            console.log("======================================================")
            setName(userData.name)
            setLocation(userData.location)
            setPhoneNumber(userData.phone_number)
            setEmail(userData.email)
            setLoading(false)
            Toast.show({type:'success',text1:'Recieved Profile Successfully',position:'bottom'})
        }catch(error){
            Toast.show({type:'error',text1:"Couldn't retrieve profile"});
        }
    }
    const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  }

  const closeMenu = () => setVisible(false);
    const deactivateAccount=()=>{

    }
    const signOut=()=>{

    }
    const changePassword=()=>{   

    }
    return(
        <View style={styles.container}>
            <PaperProvider>
            <View style={{flexDirection:'row-reverse',marginTop:(StatusBar.currentHeight||20)+40,justifyContent:'center'}}>
                <View style={{position:'absolute',left:0,marginHorizontal:20}}>
                    <Menu
                        anchorPosition='top'
                        visible={visible}
                        onDismiss={closeMenu}
                        contentStyle={{backgroundColor:'white'}}
                        anchor={<Feather name='menu' size={24} color={'#25D366'} onPress={openMenu}/>}>
                        <Menu.Item leadingIcon={()=><AntDesign name="delete" size={20} color="black" />} onPress={() => {deactivateAccount}} title="Deactivate Account"/>
                        <Divider />
                        <Menu.Item leadingIcon={()=><Ionicons name="exit-outline" size={24} color="black" />}  onPress={() => {signOut}} title="Sign Out" />
                        <Divider />
                        <Menu.Item leadingIcon={()=><MaterialCommunityIcons name="form-textbox-password" size={24} color="black" />}  onPress={() => {changePassword}} title="Change Password" />
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
             iconSize={20} 
             help={helpName} 
             editable={true} 
             setName={setName} 
             setLocation={setLocation} 
             setPhoneNumber={setPhoneNumber} 
             setSelectedCurrentLocations={setSelectedCurrentLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>

             <Divider/>

             <EditableTextField icon='map-pin' 
             fieldName='Location' 
             fieldValue={location} 
             iconSize={20} 
             help={``}
             editable={true} 
             setName={setName} 
             setLocation={setLocation} 
             setPhoneNumber={setPhoneNumber} 
             setSelectedCurrentLocations={setSelectedCurrentLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>

             <Divider/>

            <EditableTextField icon='mail' 
             fieldName='Email' 
             fieldValue={email} 
             iconSize={20} 
             help={`This is the registered email id`}
             editable={false} 
             setName={setName} 
             setLocation={setLocation} 
             setPhoneNumber={setPhoneNumber} 
             setSelectedCurrentLocations={setSelectedCurrentLocations}
             setLoading={setLoading}
             route={route}
             navigation={navigation}></EditableTextField>
            <Toast/>
            {loading?<ActivityIndicator animating={loading} hidesWhenStopped={true} color={'#25D366'} size={'large'} style={styles.loading}/>:<View/>}
             </PaperProvider>
        </View>
    );
}

const styles=StyleSheet.create({
    container:{
        backgroundColor:'white',
        flex:1
    },
    roundIcon:{
        backgroundColor:'#25D366',
        marginVertical:10,
        width:160,
        height:160,
        borderRadius:80,
        alignItems:'center',
        justifyContent:'center',
        alignSelf:'center'
    },
    textInput:{
        marginTop:30,
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
        marginBottom:20,
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
    loading: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        flex:1,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center'
      }
});