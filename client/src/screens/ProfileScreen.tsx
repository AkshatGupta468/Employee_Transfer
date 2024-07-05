import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StatusBar,
  TextInput,
  Pressable,
  Dimensions,
  ScrollView,
  Alert,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { SelectList } from "react-native-dropdown-select-list";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../interfaces/app_interfaces";
import { getToken, saveToken, removeToken } from "../utils/TokenHandler";
import { BACKEND_BASE_URL } from "@env";
import axios from "axios";
import { Toast } from "react-native-toast-message/lib/src/Toast";
import { StackActions } from "@react-navigation/native";
import { getError } from "../utils/ErrorClassifier";
import PhoneInput from "react-native-phone-input";
import {
  ActivityIndicator,
  Divider,
  Menu,
  Button,
  PaperProvider,
} from "react-native-paper";
import EditableTextField from "../components/EditableTextField";
import {
  AntDesign,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import UploadImageField from "../components/UploadImageField";
import ChangePasswordScreen from "./ChangePasswordScreen";
import { AppStyles } from "../utils/styles";

const helpName = `This is not your username or pin.This name will be visible to other users`;

const data = [
  { key: "1", value: "1" },
  { key: "2", value: "2" },
  { key: "3", value: "3" },
  { key: "4", value: "4" },
  { key: "5", value: "5" },
  { key: "6", value: "6" },
  { key: "7", value: "7" },
  { key: "8", value: "8" },
  { key: "9", value: "9" },
  { key: "10", value: "10" },
  { key: "11", value: "11" },
  { key: "12", value: "12" },
  { key: "13", value: "13" },
  { key: "14", value: "14" },
  { key: "15", value: "15" },
  { key: "16", value: "16" },
];
const DeptData = [
  { key: "1", value: "Dept1" },
  { key: "2", value: "Dept2" },
  { key: "3", value: "Dept3" },
  { key: "4", value: "Dept4" },
  { key: "5", value: "Dept5" },
];

interface ProfileDataStructure {
  name: string;
  phoneNumber: string;
  location: string;
}

interface profileStates {
  setName: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setDepartment: React.Dispatch<React.SetStateAction<string>>;
  setPreferredLocations: React.Dispatch<React.SetStateAction<string[]>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

type TabsScreenProps = NativeStackScreenProps<
  RootStackParamList,
  "WithinAppNavigator"
>;

export default function ProfileScreen({ route, navigation }: TabsScreenProps) {
  const [name, setName] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [email, setEmail] = useState<string>();
  const [department, setDepartment] = useState<string>("");
  const [preferredLocations, setPreferredLocations] = useState<string[]>([]);
  const states: profileStates = {
    setName: setName,
    setLocation: setLocation,
    setDepartment: setDepartment,
    setPreferredLocations: setPreferredLocations,
    setLoading: setLoading,
  };
  const goToSignInPage = () => {
    Toast.show({ type: "error", text1: "Log In again to continue" });
    navigation.dispatch(StackActions.replace("SignIn"));
    navigation.navigate("SignIn");
  };

  useEffect(() => {
    getProfile();
  }, [currentUser]);
  const getProfile = async () => {
    if (token === null) {
      console.log("empty token");
      goToSignInPage();
    }
    if (currentUser && currentUser.name) {
      setName(currentUser.name);
    }
    if (currentUser && currentUser.location) {
      setLocation(currentUser.location);
    }
    if (currentUser && currentUser.department) {
      setLocation(currentUser.department);
    }
    if (currentUser && currentUser.email) {
      setEmail(currentUser.email);
    }
    if (currentUser && currentUser.preferredLocations) {
      setPreferredLocations(currentUser.preferredLocations);
    }
  };
  const [visible, setVisible] = React.useState(false);

  const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => setVisible(false);
  const deactivateAccount = async () => {
    closeMenu();
    Alert.alert(
      "Deactivate Account",
      "Are you sure you want to deactivate your account? ",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
        {
          text: "OK",
          onPress: async () => {
            if (token === null) {
              console.log("empty token");
              goToSignInPage();
            }
            await axios
              .patch(
                `${BACKEND_BASE_URL}/profile`,
                { deactivated: true },
                { headers: { Authorization: `Bearer ${token}` } }
              )
              .then((response) => {
                console.log(response.data);
                removeToken();
                goToSignInPage();
              })
              .catch((error) => {
                if (getError(error.response.data).name === "USER_DELETED") {
                  removeToken();
                  goToSignInPage();
                }
                Toast.show({
                  type: "error",
                  text1: "Couldn't retrieve profile",
                });
              });
          },
        },
      ]
    );
  };
  const signOut = () => {
    closeMenu();
    Alert.alert("Sign Out", "Are you sure you want to Sign Out? ", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "OK",
        onPress: () => {
          removeToken();
          currentUser = null;
          goToSignInPage();
        },
      },
    ]);
  };
  const changePassword = () => {
    closeMenu();
    navigation.navigate("ChangePassword");
  };
  return (
    <View style={AppStyles.container}>
      <PaperProvider>
        <View
          style={[
            AppStyles.topMostItem,
            { flexDirection: "row-reverse", justifyContent: "center" },
          ]}
        >
          <View style={{ position: "absolute", left: 0, marginHorizontal: 20 }}>
            <Menu
              anchorPosition="top"
              visible={visible}
              onDismiss={closeMenu}
              contentStyle={{ backgroundColor: "white" }}
              anchor={
                <Feather
                  name="menu"
                  size={24}
                  color={"#25D366"}
                  onPress={openMenu}
                />
              }
            >
              <Menu.Item
                leadingIcon={() => (
                  <AntDesign name="delete" size={20} color="black" />
                )}
                onPress={() => {
                  deactivateAccount();
                }}
                title="Deactivate Account"
              />
              <Divider />
              <Menu.Item
                leadingIcon={() => (
                  <Ionicons name="exit-outline" size={24} color="black" />
                )}
                onPress={() => {
                  signOut();
                }}
                title="Sign Out"
              />
              <Divider />
              <Menu.Item
                leadingIcon={() => (
                  <MaterialCommunityIcons
                    name="form-textbox-password"
                    size={24}
                    color="black"
                  />
                )}
                onPress={() => {
                  changePassword();
                }}
                title="Change Password"
              />
            </Menu>
          </View>
          <View>
            <Text style={{ fontSize: 24 }}>Profile</Text>
          </View>
        </View>
        <View style={{ alignSelf: "center", margin: 20 }}>
          <UploadImageField />
        </View>
        <EditableTextField
          icon="user"
          fieldName="Name"
          fieldValue={name}
          fieldObj={[]}
          iconSize={20}
          help={helpName}
          editable={true}
          setName={setName}
          setLocation={setLocation}
          setDepartment={setDepartment}
          setPreferredLocations={setPreferredLocations}
          setLoading={setLoading}
          route={route}
          navigation={navigation}
        ></EditableTextField>

        <Divider />

        <EditableTextField
          icon="map-pin"
          fieldName="Location"
          fieldValue={location}
          fieldObj={[]}
          iconSize={20}
          help={``}
          editable={true}
          setName={setName}
          setLocation={setLocation}
          setDepartment={setDepartment}
          setPreferredLocations={setPreferredLocations}
          setLoading={setLoading}
          route={route}
          navigation={navigation}
        ></EditableTextField>
        <Divider />

        <EditableTextField
          icon="map-pin"
          fieldName="Department"
          fieldValue={department}
          fieldObj={[]}
          iconSize={20}
          help={``}
          editable={true}
          setName={setName}
          setLocation={setLocation}
          setDepartment={setDepartment}
          setPreferredLocations={setPreferredLocations}
          setLoading={setLoading}
          route={route}
          navigation={navigation}
        ></EditableTextField>

        <Divider />

        <EditableTextField
          icon="search-location"
          fieldName="Preferred Locations"
          fieldValue={""}
          fieldObj={preferredLocations}
          iconSize={20}
          help={""}
          editable={true}
          setName={setName}
          setLocation={setLocation}
          setDepartment={setDepartment}
          setPreferredLocations={setPreferredLocations}
          setLoading={setLoading}
          route={route}
          navigation={navigation}
        ></EditableTextField>
        <Toast />
        {loading ? (
          <ActivityIndicator
            animating={loading}
            hidesWhenStopped={true}
            color={"#25D366"}
            size={"large"}
            style={AppStyles.loading}
          />
        ) : (
          <View />
        )}

        <Divider />

        <EditableTextField
          icon="mail"
          fieldName="Email"
          fieldValue={email}
          fieldObj={[]}
          iconSize={20}
          help={`This is the registered email id`}
          editable={false}
          setName={setName}
          setLocation={setLocation}
          setDepartment={setDepartment}
          setPreferredLocations={setPreferredLocations}
          setLoading={setLoading}
          route={route}
          navigation={navigation}
        ></EditableTextField>
      </PaperProvider>
    </View>
  );
}
