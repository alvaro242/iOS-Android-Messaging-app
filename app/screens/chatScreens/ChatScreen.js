import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
} from "react-native";
import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "../../components/utils/RootNavigation";
import { loadKey } from "../../components/utils/utils";
import {
  getChatDetails,
  getProfilePicture,
  sendNewMessage,
} from "../../components/utils/API";
import { array } from "yup";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInfo: this.props.route.params.item,
      key: this.props.route.params.key,
      conversation: "",
      arrayOfUris: [],
      arrayOfMemberImages: "",
      isLoading: true,
      message: "",
    };
  }

  async componentDidMount() {
    await getChatDetails(this.state.chatInfo.chat_id, this.state.key).then(
      (response) => this.setState({ conversation: response })
    );

    await this.getPicsOfMembers(this.state.conversation.members);
    this.renderpicsMembers(this.state.arrayOfUris);

    console.log(this.state.conversation);
  }

  async getPicsOfMembers(members) {
    let arrayOfPromisesMemberPics = [];

    for (let i = 0; i < members.length; i++) {
      arrayOfPromisesMemberPics.push(
        getProfilePicture(members[i].user_id, this.state.key)
      );
    }

    const arrayOfMemberPics = await Promise.all(arrayOfPromisesMemberPics);

    this.setState({
      isLoading: false,
      arrayOfUris: arrayOfMemberPics,
    });
  }

  renderpicsMembers(arrayOfUris) {
    const Images = [];

    for (let i = 0; i < arrayOfUris.length; i++) {
      Images.push(
        <Image
          style={styles.memberpic}
          source={arrayOfUris[i]}
          key={"MemberPic" + i}
        />
      );
    }

    return Images;
  }

  render() {
    //New header and disable default

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View>
        <View style={styles.screenContainer}>
          <View style={styles.chatHeader}>
            <View style={styles.headerTopLeft}>
              <MaterialCommunityIcons
                name="arrow-left"
                size={25}
                color="white"
                onPress={() => RootNavigation.navigate("Chats")}
              />
            </View>
            <View>
              <Text style={styles.nameChat}>{this.state.chatInfo.name}</Text>
            </View>
            <View style={styles.topRight}>
              <MaterialCommunityIcons
                name="information-outline"
                size={25}
                color="white"
                onPress={() =>
                  RootNavigation.navigate("AboutChat", this.state.chatInfo)
                }
              />
            </View>
          </View>
          <View style={styles.membersHeader}>
            <View style={styles.membersPicsRow}>
              {this.renderpicsMembers(this.state.arrayOfUris)}
            </View>
          </View>
          <View style={styles.conversationContent}>
            <Text>{this.state.conversation.name}</Text>
          </View>
          <View style={styles.sendMessageContainer}>
            <TextInput
              name="Message"
              onChange={this.MessageChangeHandler}
              keyboardType={"Text"}
              style={styles.inputForm}
            ></TextInput>
            <Button
              style={styles.submitButton}
              title="send"
              onPress={() =>
                sendNewMessage(
                  this.state.message,
                  this.state.chatInfo.chat_id,
                  this.state.key
                )
              }
            />
          </View>
        </View>
      </View>
    );
  }
}
