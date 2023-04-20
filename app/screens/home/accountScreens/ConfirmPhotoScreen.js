import React, { Component } from "react";
import { View, Text, Image, Button } from "react-native";
import { styles } from "../../../components/Styles/customStyle";
import { loadKeyAndID } from "../../../components/utils/utils";
import { uploadProfilePic } from "../../../components/utils/API";
import { t } from "../../../../locales";

export default class ConfirmPhotoScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  async handleSubmission() {
    await loadKeyAndID().then((keyAndID) =>
      uploadProfilePic(
        keyAndID[0],
        keyAndID[1],
        this.props.route.params.photoData.uri
      )
    );
    await this.props.navigation.navigate("AccountScreen");
  }

  render() {
    console.log(this.props.route.params);

    return (
      <View>
        <Image
          style={styles.myPic}
          source={this.props.route.params.photoData.uri}
        />
        <Text>{t("confirmTheNewPicture")}</Text>
        <Button
          color="#F93939"
          title="No"
          onPress={() => this.props.navigation.navigate("AccountScreen")}
        />
        <Button title={t("yes")} onPress={() => this.handleSubmission()} />
      </View>
    );
  }
}
