import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chat, RootStackParamList } from '../interfaces/app_interfaces';

import MessageComponent from "../components/MessageComponent";
import { MessagingStyles } from "../utils/styles";
import {Message} from "../interfaces/app_interfaces"
import api from '../utils/api'

type MessagingProps=NativeStackScreenProps<RootStackParamList,"MessagingScreen">;

const MessagingScreen = ({ route, navigation }:MessagingProps) => {
    const {chatThumb}=route.params;
    const [chat,setChat]=useState<Chat>()
    useEffect(()=>{
        if(chatThumb._id){
            api.getChat(chatThumb._id).then((data)=>{
                console.log(data)
                if(data.status=="success"){
                    setChat(data.data.chat)
                }
            })
        }
    },[chatThumb])

    const appendNewMessage=(message:Message)=>{
        setChat((chat)=>{
            chat?.messages?.push(message)
            return chat;
        })
    }

    const [sendText, setSendText] = useState("");

    const handleNewMessage = async () => {      
        let data:any;
        if(chat?._id){
            data = await api.sendMessage({
                chatId:chat._id,
                content:sendText
            })
        }
        else{
            data = await api.sendMessage({
                sendTo:chatThumb.participants[0],
                content:sendText
            })
        }

        console.log(data)
        if(data && data.status=="success"){
            const {newMessageID,chatId}=data.data;
            data = await api.getMessage(newMessageID,chatId)
            if(data.status=="success"){
                const newMessage:Message= data.data.message
                appendNewMessage(newMessage)
                setSendText("")
            }
        }
        

    };

    return (
        <View style={MessagingStyles.messagingscreen}>
            <View style={MessagingStyles.chattopContainer}>
                <View style={MessagingStyles.chatheader}>
                    <Text style={MessagingStyles.chatheading}> {chat?.title} </Text>
                </View>
            </View>
            <View
                style={[
                    MessagingStyles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                { (chat?.messages?.[0]) ? (
                    <FlatList
                        data={chat?.messages}
                        renderItem={(e) => (
                            <MessageComponent message={e.item} />
                        )}
                        keyExtractor={(item,index)=>{return  String(item._id)}}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={MessagingStyles.messaginginputContainer}>
                <TextInput
                    style={MessagingStyles.messaginginput}
                    onChangeText={(value) => setSendText(value)}
                    value={sendText}
                />
                <Pressable
                    style={MessagingStyles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 15 }}>Send</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default MessagingScreen;