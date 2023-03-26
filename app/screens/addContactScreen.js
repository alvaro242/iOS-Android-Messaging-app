import { TextInput, View, Button, Image } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { styles } from "./../components/Styles/customStyle";
import React, { Component, useState, useEffect } from "react";

import { loadKey } from "../components/utils/loadKey";
import { addFriend } from "../components/utils/API";

export default function AddContactScreen({ navigation }) {
  //const [Key, setKey] = useState();

  let authKey = "";

  loadKey().then((key) => (authKey = key));

  const [friendID, setText] = useState("");
  return (
    <View style={styles.addContactContainer}>
      <TextInput
        name="friendID"
        onChangeText={(friendID) => setText(friendID)}
        keyboardType={"number-pad"}
        style={styles.inputFormAddContact}
        placeholder="ID"
      ></TextInput>

      <Button
        style={styles.submitButton}
        title="Add Friend"
        onPress={() => addFriend(friendID, authKey)}
      />
    </View>
  );
}

/*Class component but cant use useState hook

export default class addContactScreen extends Component {
  render() {
    return (
      <View style={styles.addContactContainer}>
      <TextInput
        name="friendID"
        onChangeText={(friendID) => setText(friendID)}
        keyboardType={"number-pad"}
        style={styles.inputFormAddContact}
        placeholder="ID"
      ></TextInput>

      <Button
        style={styles.submitButton}
        title="Add Friend"
        onPress={() => addFriend(friendID, authKey)}
      />
    </View>
    )
  }
}

*/
