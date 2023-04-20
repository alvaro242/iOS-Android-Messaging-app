import {
  StyleSheet,
  Icon,
  Text,
  View,
  Button,
  Image,
  TextInput,
} from "react-native";
import { t, getLanguage } from "../../locales";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./home/ChatsScreen";
import AccountScreen from "./home/AccountScreen";
import ContactsScreen from "./home/ContactsScreen";
import SettingsScreen from "./home/SettingsScreen";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React, { Component } from "react";

import { logOut } from "../components/utils/API";
import { loadKey } from "../components/utils/utils";

const HomeTab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getLanguage();
  }

  render() {
    return (
      <HomeTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          //headerShown: false,
          tabBarStyle: {
            height: 80,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: "#EBF2F7",
            //rgba(34,36,40,1) is cool for black theme
          },
          headerStyle: {
            backgroundColor: "#5D80F0",
          },
          headerTitleStyle: {
            color: "#fff",
            fontWeight: "bold",
          },
        })}
      >
        <HomeTab.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            tabBarLabel: t("contacts"),
            title: t("contacts"),
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="contacts"
                color={color}
                size={size}
              />
            ),
            headerRightContainerStyle: {
              paddingRight: 15,
            },
            headerRight: () => (
              <MaterialCommunityIcons
                name="account-plus"
                color="white"
                size={25}
                onPress={() =>
                  this.props.navigation.navigate("addContactScreen")
                }
              />
            ),
          }}
        />
        <HomeTab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarLabel: t("chats"),
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
            headerRightContainerStyle: {
              paddingRight: 15,
            },
            headerRight: () => (
              <MaterialCommunityIcons
                name="chat-plus"
                size={25}
                color="white"
                paddingHorizontal="25"
                onPress={() =>
                  this.props.navigation.navigate("CreateChatScreen")
                }
              />
            ),
          }}
        />
        <HomeTab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            title: t("myAccount"),
            tabBarLabel: t("account"),
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
            headerRightContainerStyle: {
              paddingRight: 15,
            },
            headerRight: () => (
              <MaterialCommunityIcons
                name="logout"
                //color="black"
                size={25}
                color="white"
                paddingHorizontal="30"
                onPress={() => loadKey().then((key) => logOut(key))}
              />
            ),
          }}
        />
        <HomeTab.Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: t("settings"),
            tabBarLabel: t("settings"),
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
            headerRightContainerStyle: {
              paddingRight: 15,
            },
            headerRight: () => (
              <MaterialCommunityIcons
                name="logout"
                color="white"
                size={25}
                paddingHorizontal="25"
                onPress={() => loadKey().then((key) => logOut(key))}
              />
            ),
          }}
        />
      </HomeTab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    //backgroundColor: "white",
  },
  logo: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainer: {
    alignItems: "center",
  },
  formContainer: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },

  input: {
    height: 50,
    padding: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  error: {
    fontSize: 14,
    color: "red",
  },
});
