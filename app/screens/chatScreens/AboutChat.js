import React, { Component } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import {
  getChatDetails,
  getProfilePicture,
  removeMember,
  updateChatName,
} from "../../components/utils/API";
import { showAlert } from "../../components/utils/utils";
import { styles } from "../../components/Styles/customStyle";
import { TouchableOpacity } from "react-native-web";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default class AboutChat extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      chatInfo: "",
      creator: "",
      members: [],
      key: this.props.route.params.key,
      membersWithPic: "",
      chatInfo: this.props.route.params.chatInfo,
      chatDetails: "",
      currentUserID: this.props.route.params.user_id,
      newTitle: "",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      this.getData();
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  async getData() {
    await getChatDetails(this.state.chatInfo.chat_id, this.state.key).then(
      (responseJson) =>
        this.setState({
          chatDetails: responseJson,
          creator: responseJson.creator,
          members: responseJson.members,
        })
    );
    await this.getPicsOfMembers(this.state.members);
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
    });

    for (let i = 0; i < members.length; i++) {
      members[i].picUri = arrayOfMemberPics[i];
    }

    this.setState({ membersWithPic: members });
  }

  async handleMemberRemoval(memberID) {
    await removeMember(this.state.chatInfo.chat_id, memberID, this.state.key);
    this.getData();
  }

  checkAmItheMember(memberID, currentUserID) {
    if (memberID != currentUserID) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.handleMemberRemoval(memberID);
          }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            color="red"
            size={30}
          />
        </TouchableOpacity>
      );
    } else {
      return (
        //empty View to keep the format
        <View>
          <MaterialCommunityIcons
            name="trash-can-outline"
            color="grey"
            size={30}
          />
        </View>
      );
    }
  }

  titleChangeHandler = (e) => {
    this.setState({
      newTitle: e.target.value,
    });
  };

  render() {
    let chatDetails = this.state.chatDetails;
    let creator = this.state.creator;
    let members = this.state.members;
    let chat_id = this.state.chatInfo.chat_id;

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.aboutContainer}>
        <View>
          <View>
            <Text>
              Created by: {creator.first_name} {creator.last_name}
            </Text>
            <Text>Total of messages:{chatDetails.messages.length}</Text>
          </View>

          <View style={styles.searchContactsContainer}>
            <View style={styles.chatTitle}>
              <Text>Title: </Text>
            </View>
            <TextInput
              style={styles.inputSearch}
              name="Amend"
              defaultValue={chatDetails.name}
              onChange={this.titleChangeHandler}
              keyboardType="text"
            />
            <View style={styles.submitButton}>
              <Button
                title="Amend"
                onPress={() =>
                  updateChatName(this.state.newTitle, chat_id, this.state.key)
                }
              />
            </View>
          </View>
        </View>
        <View style={styles.membersContainer}>
          <View style={styles.membersListHeader}>
            <Text>Members: </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AddNewMemberScreen", {
                    members,
                    chat_id,
                  });
                }}
              >
                <MaterialCommunityIcons
                  name="account-multiple-plus"
                  color="black"
                  size={30}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <FlatList
              data={this.state.membersWithPic}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.memberContainer}
                  onPress={() => {
                    this.props.navigation.navigate("viewContactScreen", {
                      item,
                    });
                  }}
                >
                  <Image style={styles.memberpic} source={item.picUri} />
                  <Text style={styles.nameMember}>
                    {item.first_name} {item.last_name}
                  </Text>
                  {this.checkAmItheMember(
                    item.user_id,
                    this.state.currentUserID
                  )}
                </TouchableOpacity>
              )}
              keyExtractor={({ user_id }, index) => user_id}
            />
          </View>
        </View>
        <TouchableOpacity
          style={styles.abandonChat}
          onPress={() => {
            removeMember(
              this.state.chatInfo.chat_id,
              this.state.currentUserID,
              this.state.key
            ) & this.props.navigation.navigate("Chats");
          }}
        >
          <Text>Abandon Chat</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
