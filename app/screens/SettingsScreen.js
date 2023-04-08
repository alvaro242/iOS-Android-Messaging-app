import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { styles } from "./../components/Styles/customStyle";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View style={styles.settingsScreen}>
        <View style={styles.settingsContainer}>
          <Text
            style={styles.settingsOption}
            onPress={() => {
              this.props.navigation.navigate("blockedUsersScreen");
            }}
          >
            Blocked users
          </Text>
        </View>
      </View>
    );
  }
}
