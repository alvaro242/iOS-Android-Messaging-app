import React, { Component } from "react";
import { View, Text, ActivityIndicator, FlatList } from "react-native";
import { getChatDetails } from "../../components/utils/API";
import { loadKey } from "../../components/utils/utils";
import { styles } from "../../components/Styles/customStyle";

export default class AboutChat extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true, chatInfo: [], creator: [], members: [] };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getChatDetails(this.props.route.params.item.chat_id, key).then(
        (responseJson) =>
          this.setState({
            isLoading: false,
            chatInfo: responseJson,
            creator: responseJson.creator,
            members: responseJson.members,
          })
      )
    );
  }

  render() {
    //let chatinfo = this.props.route.params.item.chat_id.;
    //console.log(chatinfo);
    //let creatorID = chatinfo.creator.user_id;

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
              data={members}
              renderItem={({ item }) => (
                <Text style={styles.member}>
                  {item.first_name} {item.last_name}
                </Text>
              )}
              keyExtractor={({ user_id }, index) => user_id}
            />
          </View>
        </View>
      </View>
    );
  }
}
