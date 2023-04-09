import {
  Text,
  View,
  FlatList,
  ActivityIndicator,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
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
import { getAllContacts, searchCurrentUsers } from "../components/utils/API";
import { RefreshControl } from "react-native-web-refresh-control";

export default class ContactsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true,
      contactsData: [],
      searchWord: "",
      clearFilter: "",
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
          clearFilter: "",
        })
      )
    );
  };

  changeHandler = (e) => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  showFilteredContacts = () => {
    this.setState({ isLoading: true });

    loadKey()
      .then((key) => searchCurrentUsers(this.state.searchWord, key))
      .then((responseJson) =>
        this.setState({
          contactsData: responseJson,
          isLoading: false,

          clearFilter: "Clear search",
        })
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
      <ScrollView>
        <View style={styles.searchContactsContainer}>
          <TextInput
            style={styles.inputSearch}
            name="Search"
            placeholder="Search Contacts"
            onChange={this.changeHandler}
            keyboardType="text"
          />
          <View style={styles.submitButton}>
            <Button
              title="Search"
              onPress={() => this.showFilteredContacts()}
            />
          </View>
        </View>

        <View>
          <FlatList
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={this.refresh}
              />
            }
            data={this.state.contactsData}
            renderItem={({ item }) => (
              <Text
                style={styles.contact}
                onPress={() => {
                  this.props.navigation.navigate("viewContactScreen", {
                    item,
                  });
                }}
              >
                {/* Firstname and lastname only will show when executing getallcontacts and given namy and family name when executing searchCurrentUsers*/}
                {item.first_name} {item.last_name} {item.given_name}{" "}
                {item.family_name}
              </Text>
            )}
            keyExtractor={({ user_id }, index) => user_id}
          />
        </View>
        <Text
          style={styles.clearSearch}
          onPress={() => {
            this.refresh();
          }}
        >
          {this.state.clearFilter}
        </Text>
      </ScrollView>
    );
  }
}
