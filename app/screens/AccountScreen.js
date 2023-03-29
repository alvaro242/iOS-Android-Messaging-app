import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import { loadKeyAndID } from "../components/utils/asyncStorage";
import { styles } from "./../components/Styles/customStyle";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      accountData: [],
    };
  }

  getUserInformation(token, userID) {
    const localIP = "10.182.22.162";
    let url = "http://" + localIP + ":3333/api/1.0.0/user/" + userID;

    return fetch(url, {
      method: "GET",
      headers: {
        "X-Authorization": token,
      },
    })
      .then((response) => response.json())
      .then((responseJson) => {
        //this makes exporting to API very difficult
        this.setState({ isLoading: false, accountData: responseJson });
      })
      .catch((error) => {
        console.log("No response / not auth");
        console.log(error);
      });
  }

  componentDidMount() {
    loadKeyAndID().then((response) =>
      this.getUserInformation(response[0], response[1])
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
    console.log(this.state.accountData);
    return (
      <View>
        <TextInput
          editable={false}
          selectTextOnFocus={false}
          name="id"
          style={styles.inputFormBlocked}
          //onChangeText={handleChange("email")}
          //onBlur={handleBlur("email")}
          defaultValue={this.state.accountData.user_id}
        />
        <TextInput
          name="name"
          style={styles.inputForm}
          //onChangeText={handleChange("email")}
          //onBlur={handleBlur("email")}
          defaultValue={this.state.accountData.first_name}
        />
        <TextInput
          name="lastname"
          style={styles.inputForm}
          //onChangeText={handleChange("email")}
          //onBlur={handleBlur("email")}
          defaultValue={this.state.accountData.last_name}
        />
        <TextInput
          name="email"
          style={styles.inputForm}
          //onChangeText={handleChange("email")}
          //onBlur={handleBlur("email")}
          defaultValue={this.state.accountData.email}
        />
      </View>
    );
  }
}
