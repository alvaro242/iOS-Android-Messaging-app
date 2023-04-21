import React from "react";
import {
  Image,
  ImageBackground,
  Text,
  View,
  TouchableHighlight,
} from "react-native";
import { styles } from "./../components/Styles/customStyle";
import { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { t, getLanguagePreference } from "../../locales";

export default class StartScreen extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const subscription = this.props.navigation.addListener("focus", () => {
      this.checkLoggedIn();
    });
    return () => {
      subscription.remove();
    };
  }

  checkLoggedIn = async () => {
    const value = await AsyncStorage.getItem("whatsthat_session_token");
    if (value != null) {
      this.props.navigation.navigate("HomeScreen");
    }
  };

  render() {
    const navigation = this.props.navigation;

    return (
      <ImageBackground
        style={styles.background}
        source={require("../assets/IntroBackground.jpeg")}
      >
        <View style={styles.logoContainer}>
          <Image
            style={styles.logoStart}
            source={require("../assets/logo.png")}
          />
          {<Text>{t("appName")}</Text>}
        </View>
        <TouchableHighlight
          style={styles.loginContainer}
          onPress={() => {
            navigation.push("LogInScreen");
          }}
        >
          <Text>{t("LogIn")}</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.signupContainer}
          onPress={() => {
            navigation.push("SignUpScreen");
          }}
        >
          <Text>{t("SignUp")}</Text>
        </TouchableHighlight>
      </ImageBackground>
    );
  }
}
