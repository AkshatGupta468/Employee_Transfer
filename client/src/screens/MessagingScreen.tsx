import React, { useLayoutEffect, useState } from "react";
import { View, TextInput, Text, FlatList, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../interfaces/app_interfaces';

import MessageComponent from "../components/MessageComponent";
import { MessagingStyles } from "../utils/styles";
import {Message, User,Chat} from "../interfaces/app_interfaces"
type MessagingProps=NativeStackScreenProps<RootStackParamList,"MessagingScreen">;

const MessagingScreen = ({ route, navigation }:MessagingProps) => {
    const [chatMessages, setChatMessages] = useState<Message[]>([
        {
            id: "1",
            content: "Hello guys, welcome!",
            timestamp: "07:50",
            sender: "Tomer",
            chatId:"asdf"
        },
        {
            id: "2",
            content: "Hi Tomer, thank you! 😇",
            timestamp: "08:50",
            sender: "David",
            chatId:"asdf",
        },
    ]);

    const [sendText, setSendText] = useState("");
    const [user, setUser] = useState<User>({
        id:"1",
        name:"Tomer",
        location:"Banglore",
        role:"user",
        email:"tomer@gmail.com",
    });

    //👇🏻 Access the chatroom's name and id

//👇🏻 This function gets the username saved on AsyncStorage
    const getUsername = async () => {
        try {
            // const value = await AsyncStorage.getItem("username");
            // if (value !== null) {
            //     setUser(value);
            // }
        } catch (e) {
            console.error("Error while loading username!");
        }
    };

    //👇🏻 Sets the header title to the name chatroom's name
    useLayoutEffect(() => {
        console.log(props)
        // navigation.setOptions({ title: name });
        // getUsername()
    }, []);

    const handleNewMessage = () => {
        console.log({
            sendText,
            user,
        });
        
        setChatMessages((chatMessages)=>{
            const {chat,sendTo}=route.params;

            const newMessage:Message={
                id:"4",
                content:sendText,
                sender: user.name as String,
                chatId:chat.id,
                timestamp:new Date().getHours().toString(),
            }
            chatMessages.push(newMessage);
            return chatMessages;
        })
        setSendText("");
    };

    return (
        <View style={MessagingStyles.messagingscreen}>
            <View style={MessagingStyles.chattopContainer}>
                <View style={MessagingStyles.chatheader}>
                    <Text style={MessagingStyles.chatheading}> {route.params.chat.title} </Text>
                </View>
            </View>
            <View
                style={[
                    MessagingStyles.messagingscreen,
                    { paddingVertical: 15, paddingHorizontal: 10 },
                ]}
            >
                {chatMessages[0] ? (
                    <FlatList
                        data={chatMessages}
                        renderItem={(e) => (
                            <MessageComponent message={e.item} user={user} />
                        )}
                        keyExtractor={(item,index)=>{return  String(item.chatId)}}
                    />
                ) : (
                    ""
                )}
            </View>

            <View style={MessagingStyles.messaginginputContainer}>
                <TextInput
                    style={MessagingStyles.messaginginput}
                    onChangeText={(value) => setSendText(value)}
                />
                <Pressable
                    style={MessagingStyles.messagingbuttonContainer}
                    onPress={handleNewMessage}
                >
                    <View>
                        <Text style={{ color: "#f2f0f1", fontSize: 15 }}>SEND</Text>
                    </View>
                </Pressable>
            </View>
        </View>
    );
};

export default MessagingScreen;