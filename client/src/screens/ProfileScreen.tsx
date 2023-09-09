import React,{useState} from 'react';
import { Text,View,StyleSheet,StatusBar,TextInput, Pressable,Dimensions, ScrollView} from 'react-native';
import { Feather} from '@expo/vector-icons';
import {  SelectList } from 'react-native-dropdown-select-list';
import PhoneInput from "react-native-phone-input";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../utils/AppNavigator';

const data = [
    {key:'1',value:'Jammu & Kashmir'},
    {key:'2',value:'Gujrat'},
    {key:'3',value:'Maharashtra'},
    {key:'4',value:'Goa'},
    {key:'5',value:'X'},
    {key:'6',value:'Y'},
    {key:'7',value:'Z'},
    {key:'8',value:'W'},
    {key:'9',value:'A'},
    {key:'10',value:'B'},
    {key:'11',value:'C'},
    {key:'12',value:'D'},
    {key:'13',value:'E'},
    {key:'14',value:'F'},
    {key:'15',value:'G'},
    {key:'16',value:'H'},
  ];


export default function ProfileScreen(){

    const [name,setName]=useState('');
    const [location,setLocation]=useState('');
    const [selectedCurrentLocation,setSelectedCurrentLocations]=useState([]);
    const [phoneNumber,setPhoneNumber]=useState('');
    const [id,setId]=useState('');
    const [visible, setVisible] = useState(false);

    const SaveProfile=()=>{}
    const deactivateAccount=()=>{}
    const changePassword=()=>{      
    }
    let shouldRender=true;
    return(
        <ScrollView style={styles.container} contentContainerStyle={{alignItems:'center'}}>
            <View style={styles.roundIcon}>
                <Feather name={'user'} size={40} color={'white'}/>    
            </View>     
            <Text style={{fontSize:24,marginTop:20}}>Profile</Text>
            <TextInput onChangeText={setName}
             placeholder='Name*'
             autoFocus={true}
             style={styles.textInput}/>
             <TextInput onChangeText={setId}
              placeholder='Empoyee Id*'
              autoFocus={true}
              style={styles.textInput}/>
             <PhoneInput 
             onChangePhoneNumber={setPhoneNumber}
             initialCountry='in'
             style={styles.textInput}/>
             <SelectList
             setSelected={setSelectedCurrentLocations}
             data={data}
             boxStyles={styles.textInput}
             placeholder={'Current Location*'}
             searchPlaceholder={'Select Option*'} />
            <Pressable onPress={SaveProfile} style={styles.button}>
                <Text style={styles.buttonText}>Save</Text> 
            </Pressable>
            {shouldRender?
            <View style={{marginBottom:50}}>
                 <Text style={styles.linkText} onPress={deactivateAccount}>Deactivate Account</Text>
            </View>:<View>
            </View>}
            {shouldRender?
            <View style={{marginBottom:50}}>
                 <Text style={styles.linkText} onPress={changePassword}>Change Password</Text>
            </View>:<View>
            </View>}
        </ScrollView>
    );
}

const styles=StyleSheet.create({
    container:{
        height:Dimensions.get('screen').height-(StatusBar.currentHeight||0),
        backgroundColor:'yellow',
    },
    roundIcon:{
        backgroundColor:'black',
        width:80,
        height:80,
        borderRadius:40,
        alignItems:'center',
        justifyContent:'center',
        marginTop:StatusBar.currentHeight||20
    },
    textInput:{
        marginTop:30,
        borderWidth:2,
        borderRadius:10,
        width:250,
        height:50,
        padding:10,
        backgroundColor:'white'
    },
    button:{
        width:125,
        height:40,
        marginTop:40,
        marginBottom:20,
        backgroundColor:'black',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10
    },
    buttonText:{
        color:'white',
        fontWeight:'bold',
        fontSize:16
    },
    linkText:{
        color:'red'
    }
});