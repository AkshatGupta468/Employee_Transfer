import { View, Text, Pressable } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { MessagingStyles } from "../utils/styles";
import { Chat,Message } from "../interfaces/app_interfaces";


const ChatComponent = ({ chat }:{chat:Chat}) => {
    const navigation = useNavigation();
    const [lastMessage, setLastMessage] = useState<Message>();

    //👇🏻 Retrieves the last message in the array from the item prop
    useLayoutEffect(() => {
        setLastMessage(chat.messages[chat.messages.length - 1]);
    }, []);

    ///👇🏻 Navigates to the Messaging screen
    const handleNavigation = () => {
        navigation.navigate("Messaging", {
            chat:chat,
        });
    };

    return (
        <Pressable style={MessagingStyles.cchat} onPress={handleNavigation}>
            <Ionicons
                name='person-circle-outline'
                size={45}
                color='black'
                style={MessagingStyles.cavatar}
            />

            <View style={MessagingStyles.crightContainer}>
                <View>
                    <Text style={MessagingStyles.cusername}>{lastMessage?.sender}</Text>

                    <Text style={MessagingStyles.cmessage}>
                        {lastMessage?.content ? lastMessage.content : "Tap to start chatting"}
                    </Text>
                </View>
                <View>
                    <Text style={MessagingStyles.ctime}>
                        {lastMessage?.timestamp ? lastMessage.timestamp : "now"}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
};

export default ChatComponent;

