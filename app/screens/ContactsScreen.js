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
import { RefreshControl } from "react-native-web-refresh-control";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true,
      contactsData: [],
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getAllContacts(key).then((responseJson) =>
        this.setState({
          isLoading: false,
          contactsData: responseJson,
        })
      )
    );
  }

  refresh = () => {
    this.setState({ refreshing: true });

    loadKey().then((key) =>
      getAllContacts(key).then((responseJson) =>
        this.setState({
          contactsData: responseJson,
          refreshing: false,
        })
      )
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView
        style={styles.contactsContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
          />
        }
      >
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
