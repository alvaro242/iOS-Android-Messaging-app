import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import { styles } from "./../components/Styles/customStyle";
import { loadKeyAndID } from "../components/utils/asyncStorage";
import { uploadProfilePic } from "../components/utils/API";

export default class ConfirmPhotoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    let newPicUri = this.props.route.params.photoData.uri;

    console.log(newPicUri);
    return (
      <View>
        <Image
          style={styles.myPic}
          source={this.props.route.params.photoData.uri}
        />
        <Text>
          Would you like to replace your current profile picture to this one?
        </Text>
        <Button
          color="#F93939"
          title="No"
          onPress={() => this.props.navigation.navigate("AccountScreen")}
        />
        <Button
          title="Yes"
          onPress={() =>
            loadKeyAndID().then((keyAndID) =>
              uploadProfilePic(keyAndID[0], keyAndID[1], newPicUri)
            )
          }
        />
      </View>
    );
  }
}
