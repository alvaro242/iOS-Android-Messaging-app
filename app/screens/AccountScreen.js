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
import { loadKeyAndID } from "../components/utils/asyncStorage";
import { styles } from "./../components/Styles/customStyle";
import { getUserInformation } from "../components/utils/API";
import { UpdateUserInformation } from "../components/utils/API";
import { getProfilePicture } from "../components/utils/API";
import * as yup from "yup";
import { Formik } from "formik";

export default class AccountScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      accountData: [],
      token: "",
      photo: "",
    };
  }

  componentDidMount() {
    this.unsubscribe = this.props.navigation.addListener("focus", () => {
      console.log("Triggered");
      loadKeyAndID().then((response) =>
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
      );
    });
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    const UpdateAccountValidationSchema = yup.object().shape({
      first_name: yup.string(), //empty so we dont show any message is is not completed
      last_name: yup.string(),
      email: yup.string().email("Email must be valid"),
    });

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    console.log(this.state.accountData);
    return (
      <ScrollView>
        <View style={styles.myAccount}>
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
              onSubmit={(values) =>
                UpdateUserInformation(
                  values,
                  this.state.accountData.user_id,
                  this.state.token
                )
              }
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
                    placeholder="First Name"
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
                    placeholder="Last Name"
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
                    placeholder="Email Address"
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
                    title="Update details"
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
                Change Password
              </Text>
              <Text
                style={styles.settingsOption}
                onPress={() => {
                  this.props.navigation.navigate("CameraComponent");
                }}
              >
                Change Profile Picture
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}
