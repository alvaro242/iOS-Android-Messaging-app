import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import { styles } from "./../../components/Styles/customStyle";
import {
  removeContact,
  unblockContact,
  getProfilePicture,
} from "../../components/utils/API";
import { loadKey } from "../../components/utils/asyncStorage";

export default class UnblockUserScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      photo: "",
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getProfilePicture(this.props.route.params.item.user_id, key).then(
        (response) => this.setState({ photo: response, isLoading: false })
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

    let contact = this.props.route.params.item;
    console.log(this.props.route.params.item);
    return (
      <View>
        <View style={styles.picture}>
          <Image style={styles.myPic} source={this.state.photo} />
        </View>
        <Text>Name : {contact.first_name}</Text>
        <Text>Last Name : {contact.last_name}</Text>
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
