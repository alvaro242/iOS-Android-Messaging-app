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
  showOnlyDate,
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
import { t } from "../../../../locales";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { date } from "yup";

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
      draftMenuVisible: false,
      originalMessage: "",
      amendedMessage: "",
      amendContainer: <View></View>,
      valueMessage: "",
      DateMessage: "",
    };
  }
  componentDidMount() {
    const subscription = this.props.navigation.addListener("focus", () => {
      window.addEventListener("contextmenu", function (event) {
        //prevents contextmenu on long press

        event.preventDefault();
      });

      this.getData();

      //if navigator has passed a prop then message will equal that prop
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
      (response) => this.changeMessagesOrder(response)
      //I change the order of messages and store it conversation state
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

  changeMessagesOrder(conversation) {
    let messages = conversation.messages;

    let newConversation = conversation;
    newConversation.messages = messages.reverse();

    this.setState({ conversation: newConversation });
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

  //Message Menu

  _openMenu = () => this.setState({ menuVisible: true });

  _closeMenu = () => this.setState({ menuVisible: false });

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

  handleDeleteMessage() {
    this.getData();
    this._closeMenu();
    deleteMessage(
      this.state.chatInfo.chat_id,
      this.state.messageID,
      this.state.key
    );
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
            <Button
              title={t("amend")}
              onPress={() => this.AmendMessageHandler()}
            />
          </View>
        </View>
      ),
    });
  }

  hideAmendContainerMessage() {
    this.setState({ amendContainer: <View></View> });
  }

  //

  _openDraftMenu = () => this.setState({ draftMenuVisible: true });

  _closeDraftMenu = () => this.setState({ draftMenuVisible: false });

  async handleSaveAsDraft(newDraft) {
    // check if drafts exist in local memory. If exist then add to the array of obj. If it doesnt then create

    try {
      let savedDrafts = await AsyncStorage.getItem("drafts");

      if (savedDrafts !== null) {
        let arrayOfDrafts = JSON.parse(savedDrafts);

        arrayOfDrafts[arrayOfDrafts.length] = newDraft;

        try {
          await AsyncStorage.setItem("drafts", JSON.stringify(arrayOfDrafts));
        } catch (error) {
          throw error;
        }
      } else {
        //new array of objects

        try {
          await AsyncStorage.setItem("drafts", JSON.stringify([newDraft]));
        } catch (error) {
          throw error;
        }
      }
    } catch (err) {
      console.log(err);
    }
    this.setState({ message: "" });
    this._closeDraftMenu();
  }

  //

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

  handleSendMessage() {
    sendNewMessage(
      this.state.message,
      this.state.chatInfo.chat_id,
      this.state.key
    );
    this.getData();
    this.textInput.clear();
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

  renderDate(Date) {
    return (
      <View style={styles.messageDay}>
        <Text>{Date}</Text>
      </View>
    );
  }

  render() {
    let previousDate = "";
    let renderDate = (
      <View>
        <Text></Text>
      </View>
    );

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
                  visible={this.state.menuVisible}
                  onDismiss={this._closeMenu}
                  anchor={
                    <ScrollView>
                      <FlatList
                        data={this.state.conversation.messages}
                        inverted={false}
                        renderItem={({ item, index }) => {
                          let currentDate = showOnlyDate(item.timestamp);

                          if (previousDate != currentDate) {
                            renderDate = this.renderDate(currentDate);
                          } else {
                            renderDate = (
                              <View>
                                <Text></Text>
                              </View>
                            );
                          }

                          previousDate = currentDate;

                          return (
                            <View style={styles.outerContainer}>
                              {renderDate}
                              <TouchableWithoutFeedback
                                onLongPress={() => {
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
                          );
                        }}
                        keyExtractor={({ message_id }, index) => message_id}
                      />
                    </ScrollView>
                  }
                >
                  <Menu.Item
                    onPress={() => {
                      this.openAmendContainer(this.state.originalMessage);
                    }}
                    title={t("amend")}
                  />
                  <Menu.Item
                    onPress={() => {
                      this.handleDeleteMessage();
                    }}
                    title={t("delete")}
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
              <Menu
                style={styles.menuContainer}
                visible={this.state.draftMenuVisible}
                onDismiss={this._closeDraftMenu}
                anchor={
                  <View style={styles.sendButton}>
                    <TouchableWithoutFeedback
                      onPress={() => this.handleSendMessage()}
                      onLongPress={() => this._openDraftMenu()}
                    >
                      <Text>Send</Text>
                    </TouchableWithoutFeedback>
                  </View>
                }
              >
                <Menu.Item
                  onPress={() => {
                    RootNavigation.navigate("draftsScreen");
                  }}
                  title={t("drafts")}
                />
                <Menu.Item
                  onPress={() => {
                    this.handleSaveAsDraft(this.state.message);
                  }}
                  title={t("savedraft")}
                />
              </Menu>
            </View>
          </View>
        </View>
      </Provider>
    );
  }
}
