import { View, Text } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { MessagingStyles } from "../utils/styles";
import { Message} from "../interfaces/app_interfaces";

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
                    <Ionicons
                        name='person-circle-outline'
                        size={30}
                        color='black'
                    />
                    <View
                        style={
                            status
                                ? MessagingStyles.mmessage
                                : [MessagingStyles.mmessage, { backgroundColor: "rgb(194, 243, 194)" }]
                        }
                    >
                        <Text>{message.content}</Text>
                    </View>
                </View>
                <Text style={{ marginLeft: 40 }}>{message.createdAt}</Text>
            </View>
        </View>
    );
}