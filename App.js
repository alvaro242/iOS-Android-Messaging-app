import { SafeAreaView } from "react-native";
import StartScreen from "./app/screens/StartScreen";
import LogInScreen from "./app/screens/LogInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import addContactScreen from "./app/screens/home/contactsScreens/addContactScreen";
import blockedUsersScreen from "./app/screens/home/settingsScreens/blockedUsersScreen";
import unblockUserScreen from "./app/screens/home/settingsScreens/unblockUserScreen";
import viewContactScreen from "./app/screens/home/contactsScreens/viewContactScreen";
import AddNewMemberScreen from "./app/screens/home/chatScreens/AddNewMemberScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import { styles } from "./app/components/Styles/customStyle";
import ChangePassword from "./app/screens/home/accountScreens/ChangePasswordScreen";
import CameraComponent from "./app/components/utils/camera";
import ConfirmPhotoScreen from "./app/screens/home/accountScreens/ConfirmPhotoScreen";
import { navigationRef } from "./app/components/utils/RootNavigation";
import ChatScreen from "./app/screens/home/chatScreens/chatScreen";
import CreateChatScreen from "./app/screens/home/chatScreens/CreateChatScreen";
import AboutChat from "./app/screens/home/chatScreens/AboutChat";
import { NativeBaseProvider } from "native-base";
import { t, getLanguagePreference } from "./locales/";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getLanguagePreference();
  }

  render() {
    return (
      //SafeArea for iPhoneX+ devices
      <NativeBaseProvider>
        <SafeAreaView edges={["right", "left", "top"]} style={styles.root}>
          <NavigationContainer ref={navigationRef}>
            <Stack.Navigator
              initialRouteName="StartScreen"
              screenOptions={({ route }) => ({
                headerStyle: {
                  backgroundColor: "#5D80F0",
                },
                headerTitleStyle: {
                  color: "#fff",
                  fontWeight: "bold",
                },
              })}
            >
              <Stack.Screen
                name="StartScreen"
                component={StartScreen}
                options={{ title: "welcome", headerShown: false }}
              />
              <Stack.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{
                  title: "Home",
                  headerShown: false,
                  gestureEnabled: false,
                }}
              />
              <Stack.Screen
                name="LogInScreen"
                component={LogInScreen}
                options={{ title: t("LogIn") }}
              />

              <Stack.Screen
                name="SignUpScreen"
                component={SignUpScreen}
                options={{ title: t("SignUp") }}
              />

              <Stack.Screen
                name="addContactScreen"
                component={addContactScreen}
                options={{
                  title: t("addContact"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />

              <Stack.Screen
                name="viewContactScreen"
                component={viewContactScreen}
                options={{
                  title: t("contact"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />

              <Stack.Screen
                name="blockedUsersScreen"
                component={blockedUsersScreen}
                options={{
                  title: t("blockedUsers"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />

              <Stack.Screen
                name="unblockUserScreen"
                component={unblockUserScreen}
                options={{
                  title: t("blockedUser"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="ChangePassword"
                component={ChangePassword}
                options={{
                  title: t("changePassword"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="CameraComponent"
                component={CameraComponent}
                options={{
                  title: t("takeAPic"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="ConfirmPhotoScreen"
                component={ConfirmPhotoScreen}
                options={{
                  title: t("confirmNewPicture"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="ChatScreen"
                component={ChatScreen}
                options={{
                  headerShown: false,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="CreateChatScreen"
                component={CreateChatScreen}
                options={{
                  title: t("createNewChat"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="AboutChat"
                component={AboutChat}
                options={{
                  title: "About",
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
              <Stack.Screen
                name="AddNewMemberScreen"
                component={AddNewMemberScreen}
                options={{
                  title: t("about"),
                  headerShown: true,
                  gestureEnabled: true,
                }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaView>
      </NativeBaseProvider>
    );
  }
}
