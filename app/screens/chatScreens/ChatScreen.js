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
      chatInfo: this.props.route.params,
      nameChat: this.props.route.params.item.name,
      conversation: "",
      isLoading: true,
      arrayofPics: [],
      key: "",
      message: "",
    };
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
      arrayofPics: arrayOfMemberPics,
    });

    return arrayOfMemberPics;
  }

  componentDidMount() {
    loadKey().then(
      (key) =>
        this.setState({ key: key }) &
        getChatDetails(this.props.route.params.item.chat_id, key).then(
          (responseJson) =>
            this.getPicsOfMembers(responseJson.members) &
            this.setState({
              conversation: responseJson,
            })
        )
    );
  }

  renderPics(arrayOfPics) {
    const Images = [];

    for (let i = 0; i < arrayOfPics.length; i++) {
      Images.push(
        <Image
          style={styles.memberpic}
          source={arrayOfPics[i]}
          key={"MemberPic" + i}
        />
      );
    }

    return <View style={styles.membersPicsRow}>{Images}</View>;
  }

  MessageChangeHandler = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  render() {
    //New header and disable default

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
              <Text style={styles.nameChat}>{this.state.nameChat}</Text>
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
            {this.renderPics(this.state.arrayofPics)}
          </View>
          <View style={styles.conversationContent}>
            <Text>Conversation</Text>
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
                  this.state.chatInfo.item.chat_id,
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
