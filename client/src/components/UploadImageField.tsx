import React from 'react';
import { Image, View, StyleSheet, TouchableHighlight } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { BACKEND_BASE_URL } from '@env';
import axios from 'axios';
import Toast from 'react-native-toast-message';

export default function UploadImageField() {
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
            if(token===null){
                //TODO                
            }else{
                base64 = await FileSystem.readAsStringAsync(_image.assets[0].uri, { encoding: 'base64' });
                if(base64 && currentUser)
                    currentUser.photo=base64
                axios.patch(`${BACKEND_BASE_URL}/profile`,{photo:base64},{headers:{Authorization:`Bearer ${token}`}}).
                then(async response=>{
                    Toast.show({type:'success',text1:'Image uploaded successfully',position:'bottom'})                
                })
                .catch(error=>{
                    Toast.show({type:'error',text1:"Couldn't upload",position:'bottom'})
                })
            }
        }
      };
  return (
        <View style={{flexDirection:'row',height:200,width:200,}}>
            <TouchableHighlight style={imageUploaderStyles.container} onPress={()=>{}}>
                {
                    currentUser?.photo==='' ?<Feather name='user' size={100} color={'#6B6764'} style={{alignSelf:'center',verticalAlign:'middle'}}/> 
                    :<Image source={{ uri: `data:image/png;base64,${currentUser?.photo}`}} style={{ width: 200, height: 200,zIndex:0}} />
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