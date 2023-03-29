import { TextInput, View, Button, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { styles } from "./../components/Styles/customStyle";
import React, { Component, useState, useEffect } from "react";

import { loadKey } from "../components/utils/asyncStorage";
import { addFriend } from "../components/utils/API";

export default class AddContactScreen extends Component {
  constructor(props) {
    super(props);

    this.state = { friendID: "" };
  }

  changeHandler = (e) => {
    this.setState({
      friendID: e.target.value,
    });
  };

  render() {
    return (
      <View style={styles.addContactContainer}>
        <TextInput
          name="friendID"
          keyboardType={"number-pad"}
          style={styles.inputFormAddContact}
          placeholder="ID"
          Defaultalue={this.state.friendID}
          onChange={this.changeHandler}
        ></TextInput>

        <Button
          style={styles.submitButton}
          title="Add Friend"
          onPress={() =>
            loadKey().then((key) => addFriend(this.state.friendID, key))
          }
        />
      </View>
    );
  }
}
