import React, { useEffect,useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import ChatComponent from "../components/ChatComponent";
import { Chat, ChatThumb } from "../interfaces/app_interfaces";
import { MessagingStyles } from "../utils/styles";
import socket, { NEW_CHAT } from "../utils/socket";

const ChatScreen = ({chatsList,onChatOpen,refreshChatList}:
    {chatsList:[ChatThumb]|undefined,
        onChatOpen:(chatThumb:ChatThumb)=>void,
        refreshChatList:()=>void}) => {
            
    
    return (
        <SafeAreaView style={MessagingStyles.chatscreen}>
            <View style={MessagingStyles.chattopContainer}>
                <View style={MessagingStyles.chatheader}>
                    <Text style={MessagingStyles.chatheading}> Chats</Text>
                    <Pressable onPress={refreshChatList}>
                        <MaterialCommunityIcons name='reload' size={24} color='green' />
                    </Pressable>
                </View>
            </View>

            <View style={MessagingStyles.chatlistContainer}>
                {(chatsList && chatsList.length > 0) ? (
                    <FlatList
                        data={chatsList}
                        renderItem={(e) => <ChatComponent chatThumb={e.item} onChatOpen={onChatOpen}/>}
                    />
                ) : (
                    <View style={MessagingStyles.chatemptyContainer}>
                        <Text style={MessagingStyles.chatemptyText}>No Chats Started!</Text>
                        <Text>Search Users to Trasfer with and Start Chatting</Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
};

export default ChatScreen;
