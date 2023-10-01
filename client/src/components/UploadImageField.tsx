import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { AntDesign,Feather } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { BACKEND_BASE_URL } from '@env';
import { getToken } from '../utils/TokenHandler';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { StackActions } from '@react-navigation/native';
import { RootStackParamList } from '../utils/AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import ProfilePictureScreen from '../screens/ProfilePictureScreen';
import { getUserData, saveUserPhoto } from '../utils/LocalStorageHandler';

export default function UploadImageField() {
    const [image, setImage] = useState('');
    useEffect(()=>{
        getUserData().then(response=>{
            if(response!==undefined&&response.hasOwnProperty("photo")){
                console.log(response)
                setImage(response?.photo)
            }
        })
    },[image])
    let base64:string;
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3,3],
          quality: 1,
          allowsMultipleSelection:false
        });
        if (!_image.canceled) {
            let token=await getToken();
            if(token===null){
                //TODO                
            }else{
                base64 = await FileSystem.readAsStringAsync(_image.assets[0].uri, { encoding: 'base64' });
                console.log(_image.assets[0].uri)
                await saveUserPhoto(base64)
                axios.patch(`${BACKEND_BASE_URL}/profile`,{photo:base64},{headers:{Authorization:`Bearer ${token}`}}).
                then(async response=>{
                    Toast.show({type:'success',text1:'Image uploaded successfully',position:'bottom'})                
                })
                .catch(error=>{
                    Toast.show({type:'error',text1:"Couldn't upload",position:'bottom'})
                })
                setImage(base64);
            }
        }
      };
  return (
        <View style={{flexDirection:'row',height:200,width:200,}}>
            <TouchableHighlight style={imageUploaderStyles.container} onPress={()=>{}}>
                {
                    image==='' ?<Feather name='user' size={100} color={'#6B6764'} style={{alignSelf:'center',verticalAlign:'middle'}}/> 
                    :<Image source={{ uri: `data:image/png;base64,${image}`}} style={{ width: 200, height: 200,zIndex:0}} />
                }
            </TouchableHighlight>
            <FAB onPress={addImage} style={imageUploaderStyles.uploadBtn} rippleColor={'#6B6764'} icon={()=><Feather name='camera' size={20} color="white" style={{alignSelf:'center'}}/>}/>
        </View>
  );
}
const imageUploaderStyles=StyleSheet.create({
    container:{
        elevation:2,
        height:200,
        width:200,
        backgroundColor:'gray',
        borderRadius:100,
        overflow:'hidden',
        alignSelf:'center',
        justifyContent:'center'
    },
    uploadBtn:{
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#25D366',
        height:50,
        width:50,
        zIndex:1,
        verticalAlign:'bottom',
        position:'absolute',
        right:0,
        bottom:0,
        borderRadius:25,
    }
})