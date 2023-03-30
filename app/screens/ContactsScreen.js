import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  ScrollView,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { styles } from "./../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { addcontactScreen } from "./addContactScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loadKey } from "../components/utils/asyncStorage";
import { getAllContacts } from "../components/utils/API";
import SettingsScreen from "./SettingsScreen";
import { getServerIP } from "../components/utils/utils";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      contactsData: [],
    };
  }

  getAllContacts(token) {
    let url = "http://" + getServerIP() + "/api/1.0.0/contacts";

    return fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //this makes exporting to my API component very difficult
        this.setState({ isLoading: false, contactsData: responseJson });
      })
      .catch((error) => {
        console.log("No response / not auth");
        console.log(error);
      });
  }

  componentDidMount() {
    loadKey().then((key) => this.getAllContacts(key));
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView style={styles.contactsContainer}>
        <FlatList
          data={this.state.contactsData}
          renderItem={({ item }) => (
            <Text
              style={styles.contact}
              onPress={() => {
                this.props.navigation.navigate("viewContactScreen", { item });
              }}
            >
              {item.first_name} {item.last_name}
            </Text>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
      </ScrollView>
    );
  }
}
