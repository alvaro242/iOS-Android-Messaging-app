import { View, TextInput } from "react-native";
import React, { Component } from "react";
import { styles } from "../../../components/Styles/customStyle";
import { createConversation } from "../../../components/utils/API";
import { loadKey } from "../../../components/utils/utils";
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../../components/utils/errorHandling";
import { Button } from "native-base";
import { getLanguage, getLanguagePreference, t } from "../../../../locales";

export default class CreateChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      alertMessage: <View></View>,
    };
  }

  TitleChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  handleFeedback(response) {
    if (response.status == 201) {
      this.setState({
        alertMessage: successAlert(t("conversationCreated")),
      });
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningAlert(t("unableCreate")),
      });
    } else if (response.status == 401) {
      this.setState({
        alertMessage: warningAlert(t("notAuthorized")),
      });
    } else {
      this.setState({
        alertMessage: errorAlert(t("serverError")),
      });
    }
  }

  componentDidMount() {}

  render() {
    const objectToAPI = { name: this.state.name };

    return (
      <View>
        <TextInput
          maxLength={50}
          style={styles.inputForm}
          name="ConversationTItle"
          placeholder={t("titleOfConversation")}
          onChange={this.TitleChangeHandler}
          keyboardType={"Text"}
        />
        <View style={styles.submitButton}>
          <Button
            onPress={() =>
              loadKey().then((key) =>
                createConversation(objectToAPI, key)
                  .catch((response) => this.handleFeedback(response))
                  .then((error) => this.handleFeedback(error))
              )
            }
          >
            {t("createConversation")}
          </Button>
        </View>
        {this.state.alertMessage}
      </View>
    );
  }
}
