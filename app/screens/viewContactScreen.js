import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import { styles } from "./../components/Styles/customStyle";
import { removeContact, blockContact } from "../components/utils/API";
import { loadKey } from "../components/utils/utils";
import { getProfilePicture } from "../components/utils/API";

export default class ViewContactScreen extends Component {
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
    console.log(contact);
    console.log(this.state.photo);
    return (
      <View>
        <View style={styles.picture}>
          <Image style={styles.myPic} source={this.state.photo} />
        </View>
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
          title="Block"
          onPress={() =>
            loadKey().then((key) => blockContact(contact.user_id, key))
          }
        />
      </View>
    );
  }
}
