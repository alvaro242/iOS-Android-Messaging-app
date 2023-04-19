import React, { Component } from "react";
import {
  View,
  TextInput,
  Button,
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import { loadKey } from "../../components/utils/utils";
import {
  searchCurrentUsers,
  getAllContacts,
  addNewMemberToChat,
} from "../../components/utils/API";
import { styles } from "../../components/Styles/customStyle";

export default class AddNewMemberScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchWord: "",
      isLoading: "",
      members: this.props.route.params.members,
      chat_id: this.props.route.params.chat_id,
      NewPossibleMembers: "",
      responseAPI: "",
    };
  }
  componentDidMount() {
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
      NoteForUser: "Note: Friends that are already members won't appear here.",
      clearText: "Clear Search",
    });

    console.log(results);
  }

  clearSearch = () => {
    this.setState({
      NewPossibleMembers: [],
      clearText: "",
      NoteForUser: "",
    });
  };

  async addMember(userID) {
    addNewMemberToChat(this.state.chat_id, userID, this.state.key);

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
            <Button
              title="Search"
              onPress={() => this.loadContactsNotInChat()}
            />
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
                <Button
                  title="Add Member"
                  onPress={() => this.addMember(item.user_id)}
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
          {this.state.responseAPI}
        </Text>
      </View>
    );
  }
}
