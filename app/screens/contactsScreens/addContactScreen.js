import {
  TextInput,
  View,
  Button,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { styles } from "../../components/Styles/customStyle";
import React, { Component, useState, useEffect } from "react";

import { loadKey } from "../../components/utils/utils";
import {
  addFriend,
  searchBetweenAllUsers,
  getAllContacts,
} from "../../components/utils/API";

export default class AddContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      friendID: "",
      usersContacts: [],
      NewUsers: [],
      SearchWord: "",
      isLoading: "false",
      clearText: "",
      NoteForUser: "",
      isLoading: false,
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getAllContacts(key).then((responseJson) =>
        this.setState({
          isLoading: false,
          usersContacts: responseJson,
        })
      )
    );
  }

  IDChangeHandler = (e) => {
    this.setState({
      friendID: e.target.value,
    });
  };

  SearchChangeHandler = (e) => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  searchNewContacts = () => {
    this.setState({ isLoading: true });

    //get between all Contacts
    loadKey()
      .then((key) => searchBetweenAllUsers(this.state.searchWord, key))
      .then(
        (AllContactsFound) =>
          this.compare(AllContactsFound, this.state.usersContacts) /* &
          this.setState({
            contactsFound: AllContactsFound,
            isLoading: false,
            
          })
          */
      );
  };

  compare(contactsfound, AlreadyMyContacts) {
    // We will compare the contacts found with the ones are already our contacts
    console.log(contactsfound);
    console.log(AlreadyMyContacts);

    //code found on https://stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript
    const results = contactsfound.filter(
      ({ user_id: id1 }) =>
        !AlreadyMyContacts.some(({ user_id: id2 }) => id2 === id1)
    );

    this.setState({
      isLoading: false,
      NewUsers: results,
      NoteForUser:
        "Note: Friends that are already your friends won't appear here.",
      clearText: "Clear Search",
    });

    console.log(results);
  }

  clearSearch = () => {
    this.setState({
      NewUsers: [],
      clearText: "",
      NoteForUser: "",
    });
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
      <ScrollView style={styles.addContactContainer}>
        <View style={styles.searchContactsContainer}>
          <TextInput
            style={styles.inputInsertID}
            name="friendID"
            placeholder="Insert ID"
            onChange={this.IDChangeHandler}
            keyboardType={"number-pad"}
          />
          <View style={styles.submitButton}>
            <Button
              title="Add Friend"
              onPress={() =>
                loadKey().then((key) => addFriend(this.state.friendID, key))
              }
            />
          </View>
        </View>
        <View style={styles.searchText}>
          <Text>Or search by Name, Last Name or Email:</Text>
        </View>

        <View style={styles.searchContactsContainer}>
          <TextInput
            style={styles.inputSearch}
            name="Search"
            placeholder="Search Contacts"
            onChange={this.SearchChangeHandler}
            keyboardType="text"
          />
          <View style={styles.submitButton}>
            <Button title="Search" onPress={() => this.searchNewContacts()} />
          </View>
        </View>

        <FlatList
          data={this.state.NewUsers}
          renderItem={({ item }) => (
            <View style={styles.contactsFound}>
              <Text>
                {item.given_name} {item.family_name}
              </Text>
              <View style={styles.submitButton}>
                <Button
                  title="Add Contact  "
                  onPress={() =>
                    loadKey().then((key) => addFriend(item.user_id, key))
                  }
                />
              </View>
            </View>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
        <Text>{this.state.NoteForUser}</Text>
        <Text
          style={styles.clearSearch}
          onPress={() => {
            this.clearSearch();
          }}
        >
          {this.state.clearText}
        </Text>
      </ScrollView>
    );
  }
}
