import { StatusBar } from 'expo-status-bar';
import AppNavigator from './src/utils/AppNavigator';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
export default function App() {
  return (
    <NavigationContainer>
      <StatusBar style='dark'/>
      <AppNavigator/>      
    </NavigationContainer>
  );
}
