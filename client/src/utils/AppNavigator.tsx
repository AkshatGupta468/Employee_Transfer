import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer,useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

export type RootStackParamList={
    "SignIn":undefined;
    "SignUp":undefined;
    "ForgotPassword":undefined;
}

const {Navigator,Screen,Group}=createNativeStackNavigator<RootStackParamList>();

const AppNavigator=()=>{
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Group>
                <Screen name="SignIn" component={SignInScreen}/>
                <Screen name="SignUp" component={SignUpScreen}/>
                <Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            </Group>
        </Navigator>
    );
}

export default AppNavigator;