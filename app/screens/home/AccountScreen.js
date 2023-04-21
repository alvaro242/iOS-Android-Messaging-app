import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
  ScrollView,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React, { Component } from "react";
import { loadKeyAndID } from "../../components/utils/utils";
import { styles } from "../../components/Styles/customStyle";
import { getUserInformation, logOut } from "../../components/utils/API";
import { UpdateUserInformation } from "../../components/utils/API";
import { getProfilePicture } from "../../components/utils/API";
import {
  errorAlert,
  successAlert,
  warningAlert,
} from "../../components/utils/errorHandling";

import * as yup from "yup";
import { Formik } from "formik";
import { getLanguagePreference, t } from "../../../locales";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      accountData: [],
      errorLoading: false,
      errorLoadingMessage: "error",
      token: "",
      photo: "",
      alertMessage: <View></View>,
    };
  }

  componentDidMount() {
    const subscription = this.props.navigation.addListener("focus", () => {
      loadKeyAndID()
        .then(
          (response) =>
            getUserInformation(response[0], response[1]).then(
              (responseJson) =>
                this.setState({
                  isLoading: false,
                  accountData: responseJson,
                  token: response[0],
                }) &
                getProfilePicture(response[1], response[0]).then((response) =>
                  this.setState({ photo: response })
                )
            )
          //
        )
        .catch((error) =>
          this.setState({
            errorLoading: true,
            errorLoadingMessage: error,
          })
        );
    });
    return () => {
      subscription.remove();
    };
  }

  handleFeedback(response) {
    console.log(response);
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert(t("detailsAmended")),
      });
    } else if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 403 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert(t("noAmend")),
      });
    } else {
      his.setState({
        alertMessage: errorAlert(t("unableAmend")),
      });
    }
  }

  render() {
    const UpdateAccountValidationSchema = yup.object().shape({
      first_name: yup.string(), //empty so we dont show any message is is not completed
      last_name: yup.string(),
      email: yup.string().email(t("emailNoValid")),
    });

    if (this.state.errorLoading) {
      return (
        <View>
          <Text>{this.state.errorLoadingMessage}</Text>
        </View>
      );
    }
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <ScrollView>
        <View style={styles.myAccount}>
          {this.state.alertMessage}
          <View style={styles.picture}>
            <Image style={styles.myPic} source={this.state.photo} />
          </View>

          <View style={styles.formContainerSignUp}>
            <Formik
              validationSchema={UpdateAccountValidationSchema}
              initialValues={{
                first_name: this.state.accountData.first_name,
                last_name: this.state.accountData.last_name,
                email: this.state.accountData.email,
              }}
              onSubmit={(values) => {
                //We send to API only necessary info = whatever hasn´t changed
                let originalName = this.state.accountData.first_name;
                let originalLastName = this.state.accountData.last_name;
                let originalEmail = this.state.accountData.email;

                const objectToAPI = {};

                if (originalName != values.first_name) {
                  objectToAPI.first_name = values.first_name;
                }

                if (originalLastName != values.last_name) {
                  objectToAPI.last_name = values.last_name;
                }

                if (originalEmail != values.email) {
                  objectToAPI.email = values.email;
                }

                UpdateUserInformation(
                  objectToAPI,
                  this.state.accountData.user_id,
                  this.state.token
                )
                  .then((response) => this.handleFeedback(response))
                  .catch((error) => this.handleFeedback(error));
              }}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,

                errors,
                isValid,
              }) => (
                <>
                  <TextInput
                    name="user_id"
                    style={styles.inputFormBlocked}
                    onChangeText={handleChange("user_id")}
                    onBlur={handleBlur("first_name")}
                    value={this.state.accountData.user_id}
                    editable={false}
                  />
                  <TextInput
                    name="first_name"
                    placeholder={t("FirtName")}
                    style={styles.inputForm}
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    defaultValue={this.state.accountData.first_name}
                    keyboardType="email-address"
                  />
                  {errors.first_name && (
                    <Text style={styles.errorLogin}>{errors.first_name}</Text>
                  )}
                  <TextInput
                    name="last_name"
                    placeholder={t("LastName")}
                    style={styles.inputForm}
                    onChangeText={handleChange("last_name")}
                    onBlur={handleBlur("last_name")}
                    defaultValue={this.state.accountData.last_name}
                    keyboardType="text"
                  />
                  {errors.last_name && (
                    <Text style={styles.errorLogin}>{errors.last_name}</Text>
                  )}
                  <TextInput
                    name="email"
                    placeholder={t("email")}
                    autoCapitalize="none"
                    style={styles.inputForm}
                    onChangeText={handleChange("email")}
                    onBlur={handleBlur("email")}
                    defaultValue={this.state.accountData.email}
                    keyboardType="text"
                  />
                  {errors.email && (
                    <Text style={styles.errorLogin}>{errors.email}</Text>
                  )}

                  <Button
                    onPress={handleSubmit}
                    title={t("updateDetails")}
                    disabled={!isValid}
                  />
                </>
              )}
            </Formik>
            <View style={styles.settingsContainer}>
              <Text
                style={styles.settingsOption}
                onPress={() => {
                  this.props.navigation.navigate("ChangePassword");
                }}
              >
                {t("changePassword")}
              </Text>
              <Text
                style={styles.settingsOption}
                onPress={() => {
                  this.props.navigation.navigate("CameraComponent");
                }}
              >
                {t("changePic")}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
