import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { Component } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles } from "../../../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default class DraftScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      drafts: [],
    };
  }

  componentDidMount() {
    const subscription = this.props.navigation.addListener("focus", () => {
      this.getDrafts();
    });
    return () => {
      subscription.remove();
    };
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
    } catch (error) {}
  }

  async remove(itemToRemove) {
    let Drafts = this.state.drafts;

    var index = Drafts.indexOf(itemToRemove);
    if (index > -1) {
      // only splice array when item is found
      Drafts.splice(index, 1);
    }

    try {
      await AsyncStorage.setItem("drafts", JSON.stringify(Drafts));
    } catch (error) {
      throw error;
    }

    this.getDrafts(); //reload drafts so the content refreshs
  }

  //load drafts from local memory,

  render() {
    return (
      <View>
        <View>
          <View>
            <FlatList
              data={this.state.drafts}
              renderItem={({ item }) => (
                <View>
                  <TouchableOpacity style={styles.memberContainer}>
                    <Text style={styles.nameMember}>{item}</Text>

                    <TouchableOpacity onPress={() => this.remove(item)}>
                      <MaterialCommunityIcons
                        name="trash-can-outline"
                        color="red"
                        size={30}
                      />
                    </TouchableOpacity>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={({ item }, index) => index}
              //avoid error unique key
            />
          </View>
        </View>
      </View>
    );
  }
}
