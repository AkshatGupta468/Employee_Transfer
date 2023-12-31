import React from 'react'
import { Feather,Entypo } from '@expo/vector-icons';
import { View,Text,StyleSheet, Pressable } from 'react-native';
import { Divider } from 'react-native-paper';


export default function ListItem({user,onNewChatHandler}:{user:User,onNewChatHandler:(sendTo:User)=>void}){
    return(
        <View>
        <View style={styles.item}>
            <View style={{flexDirection:'row',alignItems:'center'}}>
                <View style={styles.roundIcon}>
                    <Feather name={'user'} size={15} color={'white'}/>    
                </View>   
                <Text style={styles.itemText}>{user.name}</Text>   
            </View>   
            <View>
                <Pressable onPress={()=>{onNewChatHandler(user)}}>
                    <Entypo name={'chat'} size={25} color={'#25D366'}/>    
                </Pressable>
            </View>
        </View>
        <Divider/>
        </View>
    )
}

const styles=StyleSheet.create({
    item:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'white',
        borderRadius:10,
        margin:10,
        padding :10,
        justifyContent:'space-between',
        alignItems:'center'
    },
    itemText:{
        margin:2,
        fontSize:16
    },
    roundIcon:{
        backgroundColor:'#25D366',
        width:30,
        height:30,
        borderRadius:15,
        alignItems:'center',
        justifyContent:'center',
        margin:10,
    }
})