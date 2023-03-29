import React, { Component } from "react";
import { TextInput, View, Text, Button } from "react-native";
import { styles } from "./../../components/Styles/customStyle";
import { removeContact, unblockContact } from "../../components/utils/API";
import { loadKey } from "../../components/utils/asyncStorage";

export default class UnblockUserScreen extends Component {
  render() {
    let contact = this.props.route.params.item;
    console.log(this.props.route.params.item);
    return (
      <View>
        <Text>Nombre : {contact.first_name}</Text>
        <Text>Apellido : {contact.last_name}</Text>
        <Text>ID : {contact.user_id}</Text>
        <Text>Email : {contact.email}</Text>
        <Button
          color="#F93939"
          title="Delete"
          onPress={() =>
            loadKey().then((key) => removeContact(contact.user_id, key))
          }
        />
        <Button
          title="Unblock"
          onPress={() =>
            loadKey().then((key) => unblockContact(contact.user_id, key))
          }
        />
      </View>
    );
  }
}
