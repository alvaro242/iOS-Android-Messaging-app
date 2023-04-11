import { View, Text, ActivityIndicator } from "react-native";
import React, { Component } from "react";
import { styles } from "../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import * as RootNavigation from "../../components/utils/RootNavigation";

export default class ChatScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    //New header and disable default
    let chatInfo = this.props.route.params;

    return (
      <View>
        <View style={styles.chatHeader}>
          <View>
            <MaterialCommunityIcons
              name="information-outline"
              size="25"
              onPress={() => RootNavigation.navigate("AboutChat", chatInfo)}
            />
          </View>
          <View>
            <Text>ChatScreen</Text>
          </View>
        </View>
      </View>
    );
  }
}
