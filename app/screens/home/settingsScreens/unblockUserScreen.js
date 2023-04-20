import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
} from "react-native";
import { styles } from "../../../components/Styles/customStyle";
import {
  removeContact,
  unblockContact,
  getProfilePicture,
} from "../../../components/utils/API";
import { loadKey } from "../../../components/utils/utils";
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../../components/utils/errorHandling";

export default class UnblockUserScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      photo: "",
      alertMessage: <View></View>,
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getProfilePicture(this.props.route.params.item.user_id, key).then(
        (response) => this.setState({ photo: response, isLoading: false })
      )
    );
  }

  handleFeedbackDelete(response) {
    console.log(response);
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert("The contact has been deleted"),
      });
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningAlert("You can´t remove yourself"),
      });
    } else if (response.status == 401) {
      his.setState({
        alertMessage: warningAlert("You are not authorized"),
      });
    } else if (response.status == 404) {
      his.setState({
        alertMessage: warningAlert("User not found"),
      });
    } else {
      his.setState({
        alertMessage: errorAlert("Server error"),
      });
    }
  }

  handleFeedbackUnblock(response) {
    console.log(response);
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert("The contact has been unblocked"),
      });
    } else if (
      response.status == 400 ||
      response.status == 400 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert("Unable to process the unblock action"),
      });
    } else {
      this.setState({
        alertMessage: errorAlert(
          "Server error. Please try again later or try with a different user"
        ),
      });
    }
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
            loadKey().then((key) =>
              removeContact(contact.user_id, key)
                .then((response) => this.handleFeedbackDelete(response))
                .catch((error) => this.handleFeedbackDelete(response))
            )
          }
        />
        <Button
          title="Unblock"
          onPress={() =>
            loadKey().then((key) =>
              unblockContact(contact.user_id, key)
                .then((response) => this.handleFeedbackUnblock(response))
                .catch((error) => this.handleFeedbackUnblock(error))
            )
          }
        />
        {this.state.alertMessage}
      </View>
    );
  }
}
