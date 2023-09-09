import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,SafeAreaView } from 'react-native';
import AppNavigator from './src/utils/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import ProfileScreen from './src/screens/ProfileScreen';
import { MultipleSelectList } from 'react-native-dropdown-select-list';
import { useState } from 'react';
import WithinAppNavigator from './src/utils/WithinAppNavigator';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';

export default function App() {
  console.log("App load...");
  return (
    <NavigationContainer>
      <StatusBar style='dark'/>
      <AppNavigator/>      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'yellow',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
