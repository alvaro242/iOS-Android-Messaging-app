import { View, Text } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default class DraftScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drafts: [],
    };
  }

  componentDidMount() {
    this.getDrafts();
  }

  async getDrafts() {
    try {
      let savedDrafts = await AsyncStorage.getItem("drafts");

      if (savedDrafts !== null) {
        let arrayOfDrafts = JSON.parse(savedDrafts);
        this.setState({ drafts: arrayOfDrafts });
      } else {
        this.setState({ drafts: [] });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //load drafts from local memory,

  render() {
    return (
      <View>
        {console.log(this.state.drafts)}
        <Text>Flatlist of drafts</Text>
      </View>
    );
  }
}
