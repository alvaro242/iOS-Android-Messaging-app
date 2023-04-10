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
    };
  }

  componentDidMount() {
    loadKey().then((key) =>
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
        {console.log(this.state.allchatsdata)}
        <FlatList
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this.refresh}
            />
          }
          data={this.state.allchatsdata}
          renderItem={({ item }) => {
            if (Object.keys(item.last_message).length != 0) {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("press");
                    this.props.navigation.navigate("SettingsScreen");
                  }}
                  style={styles.conversation}
                >
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                  <View>
                    <Text>{item.last_message.message}</Text>
                  </View>
                  <View>
                    <Text>
                      By: {item.last_message.author.first_name} {""}
                      {item.last_message.author.last_name}
                    </Text>
                  </View>
                  <View>
                    <Text>
                      {showTime(item.last_message.timestamp - 604800000)}
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            } else {
              return (
                <TouchableOpacity
                  onPress={() => {
                    console.log("press");
                    this.props.navigation.navigate("SettingsScreen");
                  }}
                  style={styles.conversation}
                >
                  <View>
                    <Text>{item.name}</Text>
                  </View>
                  <View>
                    <Text>No messages</Text>
                  </View>
                  <View>
                    <Text></Text>
                  </View>
                  <View></View>
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
