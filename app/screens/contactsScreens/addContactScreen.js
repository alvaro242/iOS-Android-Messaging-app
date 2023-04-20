import {
  TextInput,
  View,
  Button,
  ScrollView,
  Text,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { styles } from "../../components/Styles/customStyle";
import React, { Component } from "react";

import { loadKey } from "../../components/utils/utils";
import {
  addFriend,
  searchBetweenAllUsers,
  getAllContacts,
} from "../../components/utils/API";
import {
  informativeAlert,
  errorAlert,
  successAlert,
  warningAlert,
} from "../../components/utils/errorHandling";
import { NativeBaseProvider } from "native-base";
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
      alertMessage: "",
    };
  }

  handleFeedback(response) {
    let positiveFeedback = successAlert("The contact has been added");
    let informativeFeedback = informativeAlert(
      "You can't add yourself as a contact"
    );
    let warningFeedback401 = warningAlert("You are not authorized");
    let warningFeedbackAlready = warningAlert(
      "It seems this is already a contact!"
    );
    let warningFeedback404 = warningAlert("The contact has not been found");

    let errorFeedback = errorAlert("Server error. Please try it later");

    if (response.status == 200) {
      //it seems like api returns 200 when already a contact so this will handle that response as an
      if (response.data === "Already a contact") {
        this.setState({
          alertMessage: warningFeedbackAlready,
        });
      } else {
        this.setState({
          alertMessage: positiveFeedback,
        });
      }
    } else if (response.status == 400) {
      this.setState({
        alertMessage: informativeFeedback,
      });
    } else if (response.status == 401) {
      this.setState({
        alertMessage: warningFeedback401,
      });
    } else if (response.status == 404) {
      this.setState({
        alertMessage: warningFeedback404,
      });
    } else {
      this.setState({
        alertMessage: errorFeedback,
      });
    }
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
      .then((AllContactsFound) =>
        this.compare(AllContactsFound, this.state.usersContacts)
      );
  };

  compare(contactsfound, AlreadyMyContacts) {
    // We will compare the contacts found with the ones are already our contacts

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
                loadKey().then((key) =>
                  addFriend(this.state.friendID, key)
                    .then((response) => this.handleFeedback(response))
                    .catch((error) => this.handleFeedback(error))
                )
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
                    loadKey().then((key) =>
                      addFriend(item.user_id, key)
                        .then((response) => this.handleFeedback(response))
                        .catch((error) => this.handleFeedback(error))
                    )
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
        <NativeBaseProvider>{this.state.alertMessage}</NativeBaseProvider>
      </ScrollView>
    );
  }
}
