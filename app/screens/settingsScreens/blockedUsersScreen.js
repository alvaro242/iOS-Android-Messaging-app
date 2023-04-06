import React, { Component } from "react";
import {
  TextInput,
  View,
  Text,
  Button,
  ActivityIndicator,
  ScrollView,
  FlatList,
} from "react-native";
import { styles } from "./../../components/Styles/customStyle";
import { removeContact, blockContact } from "../../components/utils/API";
import { loadKey } from "../../components/utils/asyncStorage";
import { getBlockedContacts } from "../../components/utils/API";
import { RefreshControl } from "react-native-web-refresh-control";

export default class BlockedUsersScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      blockedContacsData: [],
      refreshing: false,
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
      getBlockedContacts(key).then((responseJson) =>
        this.setState({ blockedContacsData: responseJson, isLoading: false })
      )
    );
  }

  refresh = () => {
    this.setState({ refreshing: true });

    loadKey().then((key) =>
      getBlockedContacts(key).then((responseJson) =>
        this.setState({
          blockedContacsData: responseJson,
          isLoading: false,
          refreshing: false,
        })
      )
    );
  };

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView
        style={styles.contactsContainer}
        refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.refresh}
          />
        }
      >
        <FlatList
          data={this.state.blockedContacsData}
          renderItem={({ item }) => (
            <Text
              style={styles.contact}
              onPress={() => {
                this.props.navigation.navigate("unblockUserScreen", { item });
              }}
            >
              {item.first_name} {item.last_name}
            </Text>
          )}
          keyExtractor={({ user_id }, index) => user_id}
        />
      </ScrollView>
    );
  }
}
