import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
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
import { loadKey } from "../components/utils/loadKey";
import { getAllContacts } from "../components/utils/API";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      contactsData: [],
    };
  }

  getAllContacts(token) {
    let url = "http://localhost:3333/api/1.0.0/contacts";
    //let token = "f9db1b258e24eed052094b402c422f9c";

    return fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          //this makes taking this to the API component difficult
          isLoading: false,
          contactsData: responseJson,
        });
      })
      .catch((error) => {
        console.log("Not authorized");
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
      <View>
        <Text>Hola! </Text>
        <FlatList
          data={this.state.contactsData}
          renderItem={({ item }) => (
            <Text>
              {item.first_name} {item.last_name}
            </Text>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
      </View>
    );
  }
}
