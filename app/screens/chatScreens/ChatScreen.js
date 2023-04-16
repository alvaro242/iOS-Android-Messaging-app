import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
  FlatList,
  TouchableWithoutFeedback,
} from "react-native";
import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "../../components/utils/RootNavigation";
import {
  loadKey,
  loadCurrentUser,
  showOnlyTime,
} from "../../components/utils/utils";
import {
  getChatDetails,
  getProfilePicture,
  sendNewMessage,
} from "../../components/utils/API";
import { Menu, Provider } from "react-native-paper";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInfo: this.props.route.params.item,
      key: "",
      conversation: "",
      arrayOfUris: [],
      arrayOfMemberImages: "",
      isLoading: true,
      message: "",
      userID: "",
      menuVisible: false,
    };
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  async componentDidMount() {
    await loadKey().then((response) => this.setState({ key: response }));

    await loadCurrentUser().then((response) =>
      this.setState({ userID: response })
    );

    await getChatDetails(this.state.chatInfo.chat_id, this.state.key).then(
      (response) =>
        this.setState({ conversation: response }) & console.log(response)
    );
    //if any member, load the pics
    if (Object.keys(this.state.conversation.members).length != 0) {
      await this.getPicsOfMembers(this.state.conversation.members);
      this.renderpicsMembers(this.state.arrayOfUris);
    }
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

  MessageChangeHandler = (e) => {
    this.setState({
      message: e.target.value,
    });
  };

  messageStyleHandler(userID, authorID) {
    if (userID == authorID) {
      return styles.myMessageContainer;
    } else {
      return styles.messageContainer;
    }
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
      <Provider>
        <View style={styles.screenContainer}>
          <View>
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
            <View style={styles.conversationContainer}>
              <Menu
                style={styles.menuContainer}
                visible={this.state.visible}
                onDismiss={this._closeMenu}
                anchor={
                  <FlatList
                    data={this.state.conversation.messages}
                    inverted={true}
                    renderItem={({ item }) => (
                      <View style={styles.outerContainer}>
                        <TouchableWithoutFeedback onPress={this._openMenu}>
                          <View
                            style={this.messageStyleHandler(
                              this.state.userID,
                              item.author.user_id
                            )}
                          >
                            <Text style={styles.textMessage}>
                              {item.message}
                            </Text>
                            <Text style={styles.timeMessage}>
                              {showOnlyTime(item.timestamp)}
                            </Text>
                          </View>
                        </TouchableWithoutFeedback>
                      </View>
                    )}
                    keyExtractor={({ message_id }, index) => message_id}
                  />
                }
              >
                <Menu.Item
                  onPress={() => {
                    console.log("1");
                  }}
                  title="Amend"
                />
                <Menu.Item
                  onPress={() => {
                    console.log("2");
                  }}
                  title="Delete"
                />
              </Menu>
            </View>

            <View style={styles.sendMessageContainer}>
              <TextInput
                name="Message"
                onChange={this.MessageChangeHandler}
                keyboardType={"Text"}
                style={styles.inputForm}
              ></TextInput>
              <View style={styles.sendButton}>
                <Button
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
        </View>
      </Provider>
    );
  }
}
