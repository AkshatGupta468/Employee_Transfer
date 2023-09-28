import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import WithinAppNavigator from './WithinAppNavigator';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';

export type RootStackParamList={
    "SignIn":undefined;
    "SignUp":undefined;
    "ForgotPassword":undefined;
    "WithinAppNavigator":undefined;
    "ChangePassword":undefined;
}

const {Navigator,Screen,Group}=createNativeStackNavigator<RootStackParamList>();

const AppNavigator=()=>{
    return(
        <Navigator screenOptions={{headerShown:false}}>
            <Group>
                <Screen name="SignIn" component={SignInScreen}/>
                <Screen name="SignUp" component={SignUpScreen}/>
                <Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                <Screen name="WithinAppNavigator" component={WithinAppNavigator}/>
                <Screen name="ChangePassword" component={ChangePasswordScreen}/>
            </Group>
        </Navigator>
    );
}

export default AppNavigator;