import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SignInScreen from '../screens/SignInScreen';
import SignUpScreen from '../screens/SignUpScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import WithinAppNavigator from './WithinAppNavigator';
import ChangePasswordScreen from '../screens/ChangePasswordScreen';
import ProfileFormScreen from '../screens/ProfileFormScreen';
import ProfilePictureScreen from '../screens/ProfilePictureScreen';

export type RootStackParamList={
    "SignIn":undefined;
    "SignUp":undefined;
    "ForgotPassword":undefined;
    "WithinAppNavigator":undefined;
    "ChangePassword":undefined;
    "ProfileFormScreen":undefined;
    "ProfilePictureScreen":undefined
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
                <Screen name="ProfileFormScreen" component={ProfileFormScreen}/>
                <Screen name="ProfilePictureScreen" component={ProfilePictureScreen}/>
            </Group>
        </Navigator>
    );
}

export default AppNavigator;