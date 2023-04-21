import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TextInput,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { getLanguage, getLanguagePreference, t } from "../../../locales";
import { Button } from "native-base";

export default class SettingsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueLanguage: "Default",
      options: ["Default", "English", "Spanish"],
    };
  }

  componentDidMount() {}

  onChange = (e) => {
    this.setState({ valueLanguage: e.target.value });
  };

  async handleSubmit() {
    console.log(this.state.valueLanguage);
    let language = "";

    if (this.state.valueLanguage == "Default") {
      try {
        await AsyncStorage.removeItem("language");
      } catch {
        console.log("already deleted so default language");
      }
    } else {
      if (this.state.valueLanguage == "Spanish") {
        language = "es";
      }
      if (this.state.valueLanguage == "English") {
        language = "en";
      }
      try {
        await AsyncStorage.setItem("language", language);
      } catch (error) {
        throw error;
      }
    }
  }

  render() {
    const { valueLanguage, options } = this.state;
    return (
      <ScrollView style={styles.settingsScreen}>
        <View style={styles.settingsContainer}>
          <Text
            style={styles.settingsOption}
            onPress={() => {
              this.props.navigation.navigate("blockedUsersScreen");
            }}
          >
            {t("blockedUsers")}
          </Text>
          <View>
            <Text>
              <form>
                <label htmlFor="options">{t("selectLanguage")}: </label>
                <select
                  id="options"
                  value={valueLanguage}
                  onChange={this.onChange}
                >
                  {options.map((val, index) => {
                    return (
                      <option key={index} value={val}>
                        {val}
                      </option>
                    );
                  })}
                </select>
                <Button onPress={() => this.handleSubmit()}>Submit</Button>
              </form>
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}
