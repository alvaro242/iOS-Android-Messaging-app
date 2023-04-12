import { View, Text, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "../../components/utils/RootNavigation";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chatInfo: this.props.route.params,
      nameChat: this.props.route.params.item.name,
    };
  }

  componentDidMount() {}

  render() {
    //New header and disable default

    return (
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
      </View>
    );
  }
}
