import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MessagingStyles } from "../utils/styles";
import { Chat,ChatThumb,Message } from "../interfaces/app_interfaces";


const ChatComponent = ({ chatThumb,onChatOpen }:{chatThumb:ChatThumb,onChatOpen:(chatThumb:ChatThumb)=>void}) => {
    return (
        <Pressable style={MessagingStyles.cchat} onPress={()=>{onChatOpen(chatThumb)}}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={MessagingStyles.cavatar}
            />

            <View style={MessagingStyles.crightContainer}>
                <View>
                    <Text style={MessagingStyles.cusername}>{chatThumb.title}</Text>

                    <Text style={MessagingStyles.cmessage}>
                        {chatThumb.lastMessage?.content ? chatThumb.lastMessage.content : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={MessagingStyles.ctime}>
                        {chatThumb.lastMessage?.createdAt ? chatThumb.lastMessage.createdAt : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;

