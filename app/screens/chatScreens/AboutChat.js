import React, { Component } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import {
  getChatDetails,
  getProfilePicture,
  removeMember,
} from "../../components/utils/API";
import { loadCurrentUser, loadKey } from "../../components/utils/utils";
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
      key: "",
      membersWithPic: "",
      chatID: this.props.route.params.chat_id,
      currentUserID: "",
    };
  }

  async componentDidMount() {
    await loadCurrentUser().then((response) =>
      this.setState({ currentUserID: response })
    );
    await loadKey().then((response) => this.setState({ key: response }));
    await getChatDetails(this.state.chatID, this.state.key).then(
      (responseJson) =>
        this.setState({
          chatInfo: responseJson,
          creator: responseJson.creator,
          members: responseJson.members,
        })
    );

    this.getPicsOfMembers(this.state.members);
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

  checkAmItheMember(memberID, currentUserID) {
    if (memberID != currentUserID) {
      return (
        <TouchableOpacity
          onPress={() => {
            removeMember(this.state.chatID, memberID, this.state.key);
          }}
        >
          <MaterialCommunityIcons
            name="trash-can-outline"
            color="red"
            size={30}
          />
        </TouchableOpacity>
      );
    }
  }

  render() {
    let chatInfo = this.state.chatInfo;
    let creator = this.state.creator;
    let members = this.state.members;
    let chatID = this.state.chatID;

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={styles.aboutContainer}>
        {console.log(this.state.key)}
        {console.log()}
        <View>
          <Text>Title: {chatInfo.name}</Text>
        </View>
        <View>
          <Text>
            Creator: {creator.first_name} {creator.last_name}
          </Text>
        </View>
        <View style={styles.membersContainer}>
          <View style={styles.membersListHeader}>
            <Text>Members: </Text>
            <View>
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.navigate("AddNewMemberScreen", {
                    members,
                    chatID,
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
      </View>
    );
  }
}
