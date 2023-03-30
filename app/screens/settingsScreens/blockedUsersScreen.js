import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { styles } from "./../../components/Styles/customStyle";
import { removeContact, blockContact } from "../../components/utils/API";
import { loadKey } from "../../components/utils/asyncStorage";
import { getBlockedContacts } from "../../components/utils/API";

export default class BlockedUsersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blockedContacsData: [],
    };
  }
  /*

  getBlockedContacts(token) {
    let url = "http://" + getServerIP() + "/api/1.0.0/blocked";

    return fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //this makes exporting to API very difficult
        this.setState({ isLoading: false, blockedContacsData: responseJson });
      })
      .catch((error) => {
        console.log("No response / not auth");
        console.log(error);
      });
  }
*/
  componentDidMount() {
    loadKey().then((key) =>
      getBlockedContacts(key).then((responseJson) =>
        this.setState({ isLoading: false, blockedContacsData: responseJson })
      )
    );
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
          data={this.state.blockedContacsData}
          renderItem={({ item }) => (
            <Text
              style={styles.contact}
              onPress={() => {
                this.props.navigation.navigate("unblockUserScreen", { item });
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
