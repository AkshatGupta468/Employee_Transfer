import React,{useEffect, useState} from 'react';
import { StyleSheet,View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import Tabs from '../components/Tabs';
import { RootStackParamList } from './AppNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';



export default function WithinAppNavigator(){
    return (   
          <Tabs />
      )
}
