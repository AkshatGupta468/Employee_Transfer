import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import AppNavigator from './src/utils/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './src/screens/ProfileScreen';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import React, { useState } from 'react';
import WithinAppNavigator from './src/utils/WithinAppNavigator';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import {MuiTelInput} from 'mui-tel-input';
import { Button, Divider, Drawer, Menu, PaperProvider } from 'react-native-paper';
import EditableTextField from './src/components/EditableTextField';
import { Feather} from '@expo/vector-icons';
import UploadImageField from './src/components/UploadImageField';
import ProfileFormScreen from './src/screens/ProfileFormScreen';
import ListItem from './src/components/ListItem';
import ProfilePictureScreen from './src/screens/ProfilePictureScreen';
// import 'react-native-gesture-handler';

export default function App() {
  console.log("App load...");
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => {
    console.log("clicked")
    setVisible(true);
  }

  const closeMenu = () => setVisible(false);
  return (
    <NavigationContainer>
      <StatusBar style='dark'/>
      <AppNavigator/>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex:1,
  },
});
