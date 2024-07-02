import React,{useEffect, useState,useRef} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView, Touchable, TouchableHighlight, Button,Image} from 'react-native';
import { Feather} from '@expo/vector-icons';
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
import {Header} from 'react-native-elements'
import { Ionicons } from '@expo/vector-icons'; 

interface ProfilePictureScreenProps{
    route:RouteProp<RootStackParamList, "ProfilePictureScreen">,
    navigation:NativeStackNavigationProp<RootStackParamList, "ProfilePictureScreen", undefined>
}

// interface props{
//     image:string
// }
//{route,navigation}:ProfilePictureScreenProps
export default function ProfilePictureScreen({route,navigation}:ProfilePictureScreenProps){
    return(
        <View style={{flex:1,backgroundColor:colors.dark,alignItems:'center'}}>
            <Header
            backgroundColor={colors.green}
            leftComponent={<Ionicons name="arrow-back-outline" size={30} color={colors['dark']} onPress={()=>navigation.goBack()}/>}
            centerComponent={<Text style={{alignSelf:'center',textAlignVertical:'center',fontSize:24}}>Profile Picture</Text>}/>
        <View style={{justifyContent:'center',flex:1}}>
            <Image source={{ uri: `file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252Fclient-162891d1-a54e-44ec-b7e7-6cf420091406/ImagePicker/c625fc6e-8d6e-44f4-a182-bc7162e0c581.jpeg`,height:Dimensions.get('window').width,width:Dimensions.get('window').width}} style={{}}/>           
        </View>
        </View>
    )
}