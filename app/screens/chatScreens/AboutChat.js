import React, { Component } from "react";
import { View, Text, ActivityIndicator, FlatList, Image } from "react-native";
import { getChatDetails, getProfilePicture } from "../../components/utils/API";
import { loadKey } from "../../components/utils/utils";
import { styles } from "../../components/Styles/customStyle";
import { TouchableOpacity } from "react-native-web";

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
    };
  }

  async componentDidMount() {
    await loadKey().then((response) => this.setState({ key: response }));

    await getChatDetails(this.props.route.params.chat_id, this.state.key).then(
      (responseJson) =>
        this.setState({
          chatInfo: responseJson,
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

    console.log(arrayOfMemberPics);

    for (let i = 0; i < members.length; i++) {
      members[i].picUri = arrayOfMemberPics[i];
    }

    this.setState({ membersWithPic: members });
  }

  render() {
    let chatInfo = this.state.chatInfo;
    let creator = this.state.creator;
    let members = this.state.members;

    console.log(members);

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
          <Text>Title: {chatInfo.name}</Text>
        </View>
        <View>
          <Text>
            Creator: {creator.first_name} {creator.last_name}
          </Text>
        </View>
        <View style={styles.membersContainer}>
          <Text>Members: </Text>

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
