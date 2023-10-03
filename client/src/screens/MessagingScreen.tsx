import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chat, RootStackParamList, id } from '../interfaces/app_interfaces';

import MessageComponent from "../components/MessageComponent";
import { MessagingStyles } from "../utils/styles";
import {Message} from "../interfaces/app_interfaces"
import api from '../utils/api'
import socket, { NEW_CHAT, NEW_MESSAGE } from "../utils/socket";

type MessagingProps=NativeStackScreenProps<RootStackParamList,"MessagingScreen">;

const MessagingScreen = ({ route, navigation }:MessagingProps) => {
    let {chatThumb}=route.params;
    const [chat,setChat]=useState<Chat>()
    useEffect(()=>{
        if(chatThumb._id){
            api.getChat(chatThumb._id).then((chat:Chat)=>{
                setChat(chat)
                
            }).catch((err)=>{

            })
        } else {
            api.getChatSendTo(chatThumb.participants[0]).then((chat:Chat)=>{
                setChat(chat)
                chatThumb=chat
            }).catch((err)=>{

            })
        }
    },[])

    useEffect(()=>{
        console.log("adding newmessage listenerr")
        socket.on(NEW_MESSAGE,({newMessageId,chatId})=>{
            console.log(`received messageId:${newMessageId} chatId:${chatId} and my ChatId is ${chat?._id} I am ${currentUser?.name}`)
            api.getMessage(newMessageId,chatId).then((message:Message)=>{
                appendNewMessage(message)
            })
        })

        return ()=>{
            console.log("turning of new_message listenrer")
            socket.off(NEW_MESSAGE)
        }
    },[])

    const appendNewMessage=(message:Message)=>{
        setChat((chat)=>{
            chat?.messages?.push(message)
            return chat;
        })
    }

    const [sendText, setSendText] = useState("");

    const handleSendNewMessage = async () => {      
        let data:{newMessageId:id,chatId:id};
        if(chat?._id){
            data = await api.sendMessage({
                chatId:chat._id,
                content:sendText
            })
            const {newMessageId,chatId}=data;
            api.getMessage(newMessageId,chatId).then((message:Message)=>{
                appendNewMessage(message)
                setSendText("")
            })
        }
        else{
            data = await api.sendMessage({
                sendTo:chatThumb.participants[0],
                content:sendText
            })
            setSendText("")
            api.getChat(data.chatId).then((chat:Chat)=>{
                setChat(chat)
            }).catch((err)=>{

            })
            socket.emit(NEW_CHAT,{userId:chatThumb.participants[0]})
        }

    };

    
    return (
        <View style={MessagingStyles.messagingscreen}>
            <View style={MessagingStyles.chattopContainer}>
                <View style={MessagingStyles.chatheader}>
                    <Text style={MessagingStyles.chatheading}> {chatThumb?.title} </Text>
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
                    onPress={handleSendNewMessage}
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