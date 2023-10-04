import React, { useEffect,useState } from "react";
import { View, Text, Pressable, SafeAreaView, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import ChatComponent from "../components/ChatComponent";
import { ChatThumb } from "../interfaces/app_interfaces";
import { AppStyles, MessagingStyles } from "../utils/styles";

const ChatScreen = ({chatsList,onChatOpen,refreshChatList}:
    {chatsList:[ChatThumb]|undefined,
        onChatOpen:(chatThumb:ChatThumb)=>void,
        refreshChatList:()=>void}) => {
    
    return (
        <SafeAreaView style={AppStyles.container}>
            <View style={MessagingStyles.chattopContainer}>
                <View style={[MessagingStyles.chatheader,{justifyContent:'space-between'}]}>
                    <Text style={MessagingStyles.chatheading}> Chats</Text>
                    <Pressable onPress={refreshChatList} style={{paddingHorizontal:10}}>
                        <MaterialCommunityIcons name='reload'  size={30} color='green'  />
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
