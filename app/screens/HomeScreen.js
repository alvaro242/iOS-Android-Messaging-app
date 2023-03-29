import {
  StyleSheet,
  Icon,
  Text,
  View,
  Button,
  Image,
  TextInput,
} from "react-native";
import axios from "axios";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ChatsScreen from "./ChatsScreen";
import AccountScreen from "./AccountScreen";
import ContactsScreen from "./ContactsScreen";
import SettingsScreen from "./SettingsScreen";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logOut } from "../components/utils/API";
import { loadKey } from "../components/utils/asyncStorage";

const HomeTab = createBottomTabNavigator();

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.checkLoggedIn();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    if (value == null) {
      this.props.navigation.push("StartScreen");
    }
  };

  render() {
    return (
      <HomeTab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: {
            height: 60,
            paddingHorizontal: 5,
            paddingTop: 0,
            backgroundColor: "#EBF2F7",
            //rgba(34,36,40,1) is cool
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: "#AEE6FF",
          },
          headerTitleStyle: {
            color: "#fff",
          },
        })}
      >
        <HomeTab.Screen
          name="Contacts"
          component={ContactsScreen}
          options={{
            tabBarLabel: "Contacts",
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
                color="black"
                size="25"
                onPress={() =>
                  this.props.navigation.navigate("addContactScreen", {
                    screen: "addContactScreen",
                  })
                }
              />
            ),
          }}
        />
        <HomeTab.Screen
          name="Chats"
          component={ChatsScreen}
          options={{
            tabBarLabel: "Chats",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="chat" color={color} size={size} />
            ),
          }}
        />
        <HomeTab.Screen
          name="AccountScreen"
          component={AccountScreen}
          options={{
            title: "My Account",
            tabBarLabel: "Account",
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
                size="25"
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
            title: "Settings",
            tabBarLabel: "Settings",
            headerShown: true,
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
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
    backgroundColor: "white",
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
