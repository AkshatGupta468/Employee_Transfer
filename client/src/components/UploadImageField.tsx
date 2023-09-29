import React, { useState, useEffect } from 'react';
import { Image, View, Platform, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { AntDesign,Feather } from '@expo/vector-icons';
import { FAB } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

export default function UploadImageField() {
    const [image, setImage] = useState('');
    let base64=null;
    const addImage = async () => {
        let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [3,3],
          quality: 1,
          allowsMultipleSelection:false
        });
        if (!_image.canceled) {
            base64 = await FileSystem.readAsStringAsync(_image.assets[0].uri, { encoding: 'base64' });
            setImage(base64);
        }
      };
  return (
        <View style={{flexDirection:'row',height:200,width:200,}}>
            <View style={imageUploaderStyles.container}>
                {
                    image==='' ?<Feather name='user' size={100} color={'#6B6764'} style={{alignSelf:'center',verticalAlign:'middle'}}/> 
                    :<Image source={{ uri: `data:image/png;base64,${image}`}} style={{ width: 200, height: 200,zIndex:0}} />
                }
            </View>
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