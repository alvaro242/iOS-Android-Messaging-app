import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  ScrollView,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";
import { loadKey } from "../components/utils/utils";
import { getAllChats } from "../components/utils/API";
import { styles } from "./../components/Styles/customStyle";
import { RefreshControl } from "react-native-web-refresh-control";
import { showTime } from "../components/utils/utils";

export default class ChatsScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      allchatsdata: [],
      refreshing: false,
      key: "",
    };
  }

  componentDidMount() {
    loadKey().then(
      (key) =>
        this.setState({ key: key }) &
        getAllChats(key).then((responseJson) =>
          this.setState({
            isLoading: false,
            allchatsdata: responseJson.reverse(), //invert older so newest will appear first
          })
        )
    );
  }

  refresh = () => {
    this.setState({ refreshing: true });
    loadKey().then((key) =>
      getAllChats(key).then((responseJson) =>
        this.setState({
          refreshing: false,
          allchatsdata: responseJson.reverse(),
        })
      )
    );
  };

  renderLastMessage(message) {
    //cut the message if is too long

    if (message.length < 40) {
      return message;
    } else {
      let arraymessages = message.match(/.{1,40}/g);

      return arraymessages[0] + "...";
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <ScrollView>
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
          data={this.state.allchatsdata}
          renderItem={({ item }) => {
            // If there are any messages on the conversation
            if (Object.keys(item.last_message).length != 0) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ChatScreen", {
                      item: item,
                      key: this.state.key,
                    });
                  }}
                  style={styles.conversationPreview}
                >
                  <View style={styles.convTitleAndTime}>
                    <View>
                      <Text style={styles.conversationTitle}>{item.name}</Text>
                    </View>
                    <View>
                      <Text>{showTime(item.last_message.timestamp)}</Text>
                    </View>
                  </View>
                  <View style={styles.authLastMessage}>
                    <View>
                      <Text>
                        {item.last_message.author.first_name} {""}
                        {item.last_message.author.last_name}
                      </Text>
                    </View>
                  </View>
                  <View style={styles.lastMessageAndNotifications}>
                    <View>
                      <Text>
                        {this.renderLastMessage(item.last_message.message)}
                      </Text>
                    </View>
                    <View></View>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.navigate("ChatScreen", { item });
                  }}
                  style={styles.conversationPreview}
                >
                  <View>
                    <Text style={styles.conversationTitle}>{item.name}</Text>
                  </View>
                  <View>
                    <Text>No messages</Text>
                  </View>
                </TouchableOpacity>
              );
            }
          }}
          keyExtractor={({ chat_id }, index) => chat_id}
        />
      </ScrollView>
    );
  }
}
