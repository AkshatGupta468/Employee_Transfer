import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MessagingStyles } from "../utils/styles";
import { Message} from "../interfaces/app_interfaces";
import { showTime } from "../utils/datetimeformat";

export default function MessageComponent({ message }:{message:Message}) {
    
    const status = message.sender !== currentUser?._id;

    return (
        <View>
            <View
                style={
                    status
                        ? MessagingStyles.mmessageWrapper
                        : [MessagingStyles.mmessageWrapper, { alignItems: "flex-end" }]
                }
            >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View
                        style={MessagingStyles.mmessage}
                    >
                        <Text>{message.content}</Text>
                    </View>
                </View>
                <Text style={{ 
                                marginLeft:5,
                                color: '#888',
                                fontSize: 11,
                            }}>{ showTime(message.createdAt)}</Text>
            </View>
        </View>
    );
}

