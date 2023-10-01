import { View, Text, TextInput, Pressable } from "react-native"
import React, { useState } from "react"
import { MessagingStyles } from "../utils/styles"

const Modal = ({setVisible}:{setVisible:React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [groupName, setGroupName] = useState("")

  //👇🏻 Function that closes the Modal component
  const closeModal = () => setVisible(false)

  //👇🏻 Logs the group name to the console
  const handleCreateRoom = () => {
    console.log({ groupName })
    closeModal()
  }
  return (
    <View style={MessagingStyles.modalContainer}>
      <Text style={MessagingStyles.modalsubheading}>Enter your Group name</Text>
      <TextInput
        style={MessagingStyles.modalinput}
        placeholder="Group name"
        onChangeText={(value) => setGroupName(value)}
      />

      <View style={MessagingStyles.modalbuttonContainer}>
        <Pressable style={MessagingStyles.modalbutton} onPress={handleCreateRoom}>
          <Text style={MessagingStyles.modaltext}>CREATE</Text>
        </Pressable>
        <Pressable
          style={[MessagingStyles.modalbutton, { backgroundColor: "#E14D2A" }]}
          onPress={closeModal}
        >
          <Text style={MessagingStyles.modaltext}>CANCEL</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Modal
