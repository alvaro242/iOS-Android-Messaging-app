import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";

import React, { Component } from "react";
import { styles } from "./../components/Styles/customStyle";

export default class SettingsScreen extends Component {
  render() {
    return (
      <ScrollView style={styles.settingsScreen}>
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
      </ScrollView>
    );
  }
}
