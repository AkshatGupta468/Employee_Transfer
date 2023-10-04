import { View, Text, Pressable } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MessagingStyles } from "../utils/styles";
import { ChatThumb } from "../interfaces/app_interfaces";
import { showTime } from "../utils/datetimeformat";

const messageLim=40;

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
                        {(chatThumb?.lastMessage?.content)?(chatThumb.lastMessage?.content.length>messageLim?chatThumb.lastMessage?.content.slice(0,messageLim).trim()+"...":chatThumb.lastMessage?.content):"Tap to Start Chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={MessagingStyles.ctime}>
                        {chatThumb.lastMessage?.createdAt ? showTime(chatThumb.lastMessage?.createdAt):""}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;

