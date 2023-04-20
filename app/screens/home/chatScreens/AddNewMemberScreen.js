import React, { Component } from "react";
import {
  View,
  TextInput,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { loadKey } from "../../../components/utils/utils";
import {
  searchCurrentUsers,
  getAllContacts,
  addNewMemberToChat,
} from "../../../components/utils/API";
import { styles } from "../../../components/Styles/customStyle";
import { Button } from "native-base";
import {
  successAlert,
  warningAlert,
  errorAlert,
  informativeAlert,
} from "../../../components/utils/errorHandling";

export default class AddNewMemberScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: "",
      isLoading: "",
      members: this.props.route.params.members,
      chat_id: this.props.route.params.chat_id,
      NewPossibleMembers: "",
      alertMessage: <View></View>,
      clearText: <View></View>,
      noteForUser: <View></View>,
    };
  }
  componentDidMount() {
    this.setState({ alert: informativeAlert("hola") });
    loadKey().then(
      (key) =>
        this.setState({ key: key }) &
        getAllContacts(key).then((responseJson) =>
          this.setState({
            isLoading: false,
            usersContacts: responseJson,
          })
        )
    );
  }

  SearchChangeHandler = (e) => {
    this.setState({
      searchWord: e.target.value,
    });
  };

  loadContactsNotInChat = () => {
    this.setState({ isLoading: true });

    //get between all Contacts
    loadKey()
      .then((key) => searchCurrentUsers(this.state.searchWord, key))
      .then((AllMyContacts) => this.compare(AllMyContacts, this.state.members));
  };

  compare(contactsfound, AlreadyMembers) {
    // We will compare the contacts found with the ones are already members
    //code found on https://stackoverflow.com/questions/21987909/how-to-get-the-difference-between-two-arrays-of-objects-in-javascript

    const results = contactsfound.filter(
      ({ user_id: id1 }) =>
        !AlreadyMembers.some(({ user_id: id2 }) => id2 === id1)
    );

    this.setState({
      isLoading: false,
      NewPossibleMembers: results,
      NoteForUser: (
        <View>
          {informativeAlert(
            "Note: Friends that are already members won't appear here."
          )}
        </View>
      ),
      clearText: (
        <Button
          onPress={() => {
            this.clearSearch();
          }}
        >
          Clear Search
        </Button>
      ),
    });

    console.log(results);
  }

  handleFeedback(response) {
    console.log(response);

    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert("The user has been added"),
      });
    } else if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 403 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert("The user can´t be added"),
      });
    } else {
      this.setState({
        alertMessage: errorAlert("Error. Unable to add this user as a member"),
      });
    }
  }

  clearSearch = () => {
    this.setState({
      NewPossibleMembers: [],
      clearText: <View></View>,
      NoteForUser: <View></View>,
    });
  };

  async addMember(userID) {
    addNewMemberToChat(this.state.chat_id, userID, this.state.key)
      .then((response) => this.handleFeedback(response))
      .catch((error) => this.handleFeedback(error));

    //feedbackpending
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
        <View style={styles.searchContactsContainer}>
          <TextInput
            style={styles.inputSearch}
            name="Search"
            placeholder="Search Contacts"
            onChange={this.SearchChangeHandler}
            keyboardType="text"
          />
          <View style={styles.submitButton}>
            <Button onPress={() => this.loadContactsNotInChat()}>Search</Button>
          </View>
        </View>

        <FlatList
          data={this.state.NewPossibleMembers}
          renderItem={({ item }) => (
            <View style={styles.contactsFound}>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("viewContactScreen", {
                    item,
                  });
                }}
              >
                <Text>
                  {item.given_name} {item.family_name}
                </Text>
              </TouchableOpacity>
              <View style={styles.submitButton}>
                <Button onPress={() => this.addMember(item.user_id)}>
                  Add Member
                </Button>
              </View>
            </View>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
        <Text>{this.state.NoteForUser}</Text>
        {this.state.alertMessage}
        {this.state.clearText}
      </View>
    );
  }
}
