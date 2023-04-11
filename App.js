import { SafeAreaView } from "react-native";
import StartScreen from "./app/screens/StartScreen";
import LogInScreen from "./app/screens/LogInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import addContactScreen from "./app/screens/contactsScreens/addContactScreen";
import blockedUsersScreen from "./app/screens/settingsScreens/blockedUsersScreen";
import unblockUserScreen from "./app/screens/settingsScreens/unblockUserScreen";
import viewContactScreen from "./app/screens/contactsScreens/viewContactScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import { styles } from "./app/components/Styles/customStyle";
import ChangePassword from "./app/screens/settingsScreens/ChangePasswordScreen";
import CameraComponent from "./app/components/utils/camera";
import ConfirmPhotoScreen from "./app/screens/accountScreens/ConfirmPhotoScreen";
import { navigationRef } from "./app/components/utils/RootNavigation";
import ChatScreen from "./app/screens/chatScreens/chatScreen";
import CreateChatScreen from "./app/screens/chatScreens/createChatScreen";
import AboutChat from "./app/screens/chatScreens/AboutChat";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "./app/components/utils/RootNavigation";

const Stack = createNativeStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  /*
  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    if (value == null) {
      this.props.navigation.navigate("LogInScreen");
    }
  };
*/
  render() {
    return (
      //SafeArea for iPhoneX+ devices
      //<SafeAreaView edges={["right", "left", "top"]} style={styles.root}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator
          initialRouteName="Home"
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
            options={{ title: "Welcome", headerShown: false }}
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
            options={{ title: "Log In" }}
          />

          <Stack.Screen
            name="SignUpScreen"
            component={SignUpScreen}
            options={{ title: "Sign Up" }}
          />

          <Stack.Screen
            name="addContactScreen"
            component={addContactScreen}
            options={{
              title: "Add Contact",
              headerShown: true,
              gestureEnabled: true,
            }}
          />

          <Stack.Screen
            name="viewContactScreen"
            component={viewContactScreen}
            options={{
              title: "Contact",
              headerShown: true,
              gestureEnabled: true,
            }}
          />

          <Stack.Screen
            name="blockedUsersScreen"
            component={blockedUsersScreen}
            options={{
              title: "Blocked Users",
              headerShown: true,
              gestureEnabled: true,
            }}
          />

          <Stack.Screen
            name="unblockUserScreen"
            component={unblockUserScreen}
            options={{
              title: "Blocked User",
              headerShown: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="ChangePassword"
            component={ChangePassword}
            options={{
              title: "Change Password",
              headerShown: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="CameraComponent"
            component={CameraComponent}
            options={{
              title: "Take a new profile pic",
              headerShown: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="ConfirmPhotoScreen"
            component={ConfirmPhotoScreen}
            options={{
              title: "Confirm new picture",
              headerShown: true,
              gestureEnabled: true,
            }}
          />
          <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{
              title: "Conversation",
              headerShown: true,
              gestureEnabled: true,
              headerRightContainerStyle: {
                paddingRight: 25,
              },
              headerRight: () => (
                <MaterialCommunityIcons
                  name="information-outline"
                  size="25"
                  onPress={() => RootNavigation.navigate("AboutChat")}
                />
              ),
            }}
          />
          <Stack.Screen
            name="CreateChatScreen"
            component={CreateChatScreen}
            options={{
              title: "Create a new chat",
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
        </Stack.Navigator>
      </NavigationContainer>
      //</SafeAreaView>
    );
  }
}
