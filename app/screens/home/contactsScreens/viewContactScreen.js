import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { styles } from "../../../components/Styles/customStyle";
import {
  removeContact,
  blockContact,
  getProfilePicture,
} from "../../../components/utils/API";
import { loadKey } from "../../../components/utils/utils";

import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../../components/utils/errorHandling";
import { getLanguage, getLanguagePreference, t } from "../../../../locales";

export default class ViewContactScreen extends Component {
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
        alertMessage: successAlert(t("contactDeleted")),
      });
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningAlert(t("cantremoveyourself")),
      });
    } else if (response.status == 401) {
      his.setState({
        alertMessage: warningAlert(t("notAuthorized")),
      });
    } else if (response.status == 404) {
      his.setState({
        alertMessage: warningAlert(t("contactNotFound")),
      });
    } else {
      his.setState({
        alertMessage: errorAlert(t("serverError")),
      });
    }
  }

  handleFeedbackBlock(response) {
    console.log(response);
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert(t("blocked")),
      });
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningAlert(t("unableBlock")),
      });
    } else if (response.status == 401) {
      this.setState({
        alertMessage: warningAlert(t("notAuthorized")),
      });
    } else if (response.status == 404) {
      this.setState({
        alertMessage: warningAlert(t("contactNotFound")),
      });
    } else {
      this.setState({
        alertMessage: errorAlert(t("serverError")),
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

    return (
      <View>
        <View style={styles.picture}>
          <Image style={styles.myPic} source={this.state.photo} />
        </View>
        <Text>
          {t("FirtName")} : {contact.first_name}
        </Text>
        <Text>
          {t("LastName")} : {contact.last_name}
        </Text>
        <Text>ID : {contact.user_id}</Text>
        <Text>
          {t("email")} : {contact.email}
        </Text>
        <Button
          color="#F93939"
          title={t("delete")}
          onPress={() =>
            loadKey().then((key) =>
              removeContact(contact.user_id, key).then((response) =>
                this.handleFeedbackDelete(response)
              )
            )
          }
        />
        <Button
          title={t("block")}
          onPress={() =>
            loadKey().then((key) =>
              blockContact(contact.user_id, key).then((response) =>
                this.handleFeedbackBlock(response)
              )
            )
          }
        />
        <TouchableOpacity>{this.state.alertMessage}</TouchableOpacity>
      </View>
    );
  }
}
