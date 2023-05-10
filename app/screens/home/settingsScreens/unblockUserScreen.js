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
import { getLanguage, getLanguagePreference, t } from "../../../../locales";

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
    getLanguagePreference() &
      loadKey().then((key) =>
        getProfilePicture(this.props.route.params.item.user_id, key).then(
          (response) => this.setState({ photo: response, isLoading: false })
        )
      );
  }

  handleFeedbackDelete(response) {
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert(t("contactDeleted")),
      });
    } else if (
      rresponse.status == 400 ||
      response.status == 401 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert(t("cantDelete")),
      });
    } else {
      his.setState({
        alertMessage: errorAlert(t("serverError")),
      });
    }
  }

  handleFeedbackUnblock(response) {
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert(t("unblocked")),
      });
    } else if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert(t("unableUnblock")),
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
    console.log(this.props.route.params.item);
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
              removeContact(contact.user_id, key)
                .then((response) => this.handleFeedbackDelete(response))
                .catch((error) => this.handleFeedbackDelete(response))
            )
          }
        />
        <Button
          title={t("unblock")}
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
