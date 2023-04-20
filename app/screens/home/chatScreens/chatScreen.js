import {
  View,
  Text,
  ActivityIndicator,
  TextInput,
  Button,
  Image,
  FlatList,
  TouchableWithoutFeedback,
  ScrollView,
} from "react-native";
import React, { Component } from "react";
import { styles } from "../../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "../../../components/utils/RootNavigation";
import {
  loadKey,
  loadCurrentUser,
  showOnlyTime,
} from "../../../components/utils/utils";
import {
  getChatDetails,
  getProfilePicture,
  sendNewMessage,
  updateMessage,
  deleteMessage,
} from "../../../components/utils/API";
import { Menu, Provider } from "react-native-paper";
import { TouchableOpacity } from "react-native-web";

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
      user_id: "",
      menuVisible: false,
      originalMessage: "",
      amendedMessage: "",
      amendContainer: <View></View>,
      valueMessage: "",
    };
  }
  componentDidMount() {
    const subscription = this.props.navigation.addListener("focus", () => {
      this.getData();
    });
    return () => {
      subscription.remove();
    };
  }

  async getData() {
    await loadKey().then((response) => this.setState({ key: response }));

    await loadCurrentUser().then((response) =>
      this.setState({ user_id: response })
    );

    await getChatDetails(this.state.chatInfo.chat_id, this.state.key).then(
      (response) => this.setState({ conversation: response })
    );

    this.loadPicsOfAuthors(this.state.conversation.messages, this.state.key);

    //if any member, load the pics and render then in the member bar
    if (Object.keys(this.state.conversation.members).length != 0) {
      await this.getPicsOfMembers(this.state.conversation.members);
      this.renderpicsMembers(
        this.state.arrayOfUris,
        this.state.conversation.members
      );
    }
  }

  async loadPicsOfAuthors(messages, key) {
    //this function will load the pic inside of Author
    messages.forEach(getPicofAuthor);

    async function getPicofAuthor(item) {
      let promise = getProfilePicture(item.author.user_id, key);
      const picture = await Promise.resolve(promise);

      item.author.picture = picture;
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

  renderpicsMembers(arrayOfUris, members) {
    //render into members bar
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

  AmendMessageInputChangeHandler = (e) => {
    this.setState({
      amendedMessage: e.target.value,
    });
  };

  messageStyleHandler(userID, authorID) {
    if (userID == authorID) {
      return styles.myMessageContainer;
    } else {
      return styles.messageContainer;
    }
  }

  _openMenu = () => this.setState({ visible: true });

  _closeMenu = () => this.setState({ visible: false });

  handleMenu(message) {
    //run the following only if user is author

    if (this.state.user_id == message.author.user_id) {
      this._openMenu();
      this.setState({
        originalMessage: message.message,
        messageIdToAmmend: message.chat_id,
        messageID: message.message_id,
      });
    }
  }

  handleSendMessage() {
    sendNewMessage(
      this.state.message,
      this.state.chatInfo.chat_id,
      this.state.key
    );
    this.getData();
    this.textInput.clear();
  }

  AmendMessageHandler() {
    this.hideAmendContainerMessage();
    updateMessage(
      this.state.chatInfo.chat_id,
      this.state.messageID,
      this.state.key,
      this.state.amendedMessage
    );
    this.getData();
  }

  openAmendContainer(originalMessage) {
    this._closeMenu();

    this.setState({
      amendContainer: (
        <View style={styles.amendContainer}>
          <MaterialCommunityIcons
            name="close-circle-outline"
            size={15}
            color="black"
            onPress={() => this.hideAmendContainerMessage()}
          />
          <TextInput
            name="Message"
            onChange={this.AmendMessageInputChangeHandler}
            keyboardType={"Text"}
            defaultValue={originalMessage}
            style={styles.inputForm}
          ></TextInput>
          <View style={styles.sendButton}>
            <Button title="amend" onPress={() => this.AmendMessageHandler()} />
          </View>
        </View>
      ),
    });
  }

  handleDeleteMessage() {
    this.getData();
    this._closeMenu();
    deleteMessage(
      this.state.chatInfo.chat_id,
      this.state.messageID,
      this.state.key
    );
  }

  hideAmendContainerMessage() {
    this.setState({ amendContainer: <View></View> });
  }

  renderAuthorDetails(author, LoggedUser) {
    // render only pic for other users
    if (LoggedUser != author.user_id) {
      return (
        <TouchableOpacity style={{ padding: 10 }}>
          <Image style={styles.authorPic} source={author.picture} />
          <Text
            style={{
              fontSize: "10px",
              color: "white",
              alignContent: "flex-end",
            }}
          >
            {author.first_name}
          </Text>
        </TouchableOpacity>
      );
    }
  }

  render() {
    //New header and disable default

    let user_id = this.state.user_id;
    let chatInfo = this.state.chatInfo;
    let key = this.state.key;

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <Provider>
        <View style={styles.ChatScreenContainer}>
          <View>
            <View style={styles.chatHeader}>
              <View>
                <MaterialCommunityIcons
                  name="arrow-left"
                  size={25}
                  color="white"
                  onPress={() => RootNavigation.navigate("Chats")}
                />
              </View>
              <View>
                <Text style={styles.nameChat}>
                  {this.state.conversation.name}
                </Text>
              </View>
              <View>
                <MaterialCommunityIcons
                  name="information-outline"
                  size={25}
                  color="white"
                  onPress={() =>
                    RootNavigation.navigate(
                      "AboutChat",

                      { chatInfo, user_id, key }
                    )
                  }
                />
              </View>
            </View>
            <View style={styles.membersHeader}>
              <View style={styles.membersPicsRow}>
                {this.renderpicsMembers(this.state.arrayOfUris)}
              </View>
            </View>
            <View>
              <View>
                <Menu
                  style={styles.menuContainer}
                  visible={this.state.visible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <ScrollView>
                      <FlatList
                        data={this.state.conversation.messages}
                        inverted={true}
                        renderItem={({ item }) => (
                          <View style={styles.outerContainer}>
                            <TouchableWithoutFeedback
                              onPress={() => {
                                this.handleMenu(item);
                              }}
                            >
                              <View>
                                <View
                                  style={this.messageStyleHandler(
                                    this.state.user_id,
                                    item.author.user_id
                                  )}
                                >
                                  {this.renderAuthorDetails(
                                    item.author,
                                    this.state.user_id
                                  )}
                                  <Text style={styles.textMessage}>
                                    {item.message}
                                  </Text>
                                  <Text style={styles.timeMessage}>
                                    {showOnlyTime(item.timestamp)}
                                  </Text>
                                </View>
                              </View>
                            </TouchableWithoutFeedback>
                          </View>
                        )}
                        keyExtractor={({ message_id }, index) => message_id}
                      />
                    </ScrollView>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      this.openAmendContainer(this.state.originalMessage);
                    }}
                    title="Amend"
                  />
                  <Menu.Item
                    onPress={() => {
                      this.handleDeleteMessage();
                    }}
                    title="Delete"
                  />
                </Menu>
              </View>
            </View>

            {this.state.amendContainer}

            <View style={styles.sendMessageContainer}>
              <TextInput
                name="Message"
                onChange={this.MessageChangeHandler}
                keyboardType={"Text"}
                ref={(input) => {
                  this.textInput = input;
                }}
                style={styles.inputForm}
              ></TextInput>
              <View style={styles.sendButton}>
                <Button title="send" onPress={() => this.handleSendMessage()} />
              </View>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}
