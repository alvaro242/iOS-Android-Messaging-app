import { View, TextInput, Button } from "react-native";
import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { createConversation } from "../../components/utils/API";
import { loadKey } from "../../components/utils/utils";

export default class CreateChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
    };
  }

  TitleChangeHandler = (e) => {
    this.setState({
      name: e.target.value,
    });
  };

  render() {
    const objectToAPI = { name: this.state.name };

    return (
      <View>
        <TextInput
          maxLength={50}
          style={styles.inputForm}
          name="ConversationTItle"
          placeholder="Title of the conversation"
          onChange={this.TitleChangeHandler}
          keyboardType={"Text"}
        />
        <View style={styles.submitButton}>
          <Button
            title="Create Conversation"
            onPress={() =>
              loadKey().then((key) => createConversation(objectToAPI, key))
            }
          />
        </View>
      </View>
    );
  }
}
