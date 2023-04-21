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
import { styles } from "../../../components/Styles/customStyle";
import { UpdateUserInformation } from "../../../components/utils/API";
import { loadKeyAndID } from "../../../components/utils/utils";
import * as yup from "yup";
import { Formik } from "formik";
import {
  successAlert,
  warningAlert,
  errorAlert,
} from "../../../components/utils/errorHandling";
import { getLanguage, getLanguagePreference, t } from "../../../../locales";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);

    this.state = {
      keyAndId: [],
      alertMessage: <View></View>,
    };
  }

  componentDidMount() {
    loadKeyAndID().then((result) => this.setState({ keyAndId: result })); //keyid will be an array with key and ID
  }

  handleFeedback(response) {
    console.log(response);
    if (response.status == 200) {
      this.setState({
        alertMessage: successAlert(t("passwordAmended")),
      });
    } else if (
      response.status == 400 ||
      response.status == 401 ||
      response.status == 403 ||
      response.status == 404
    ) {
      this.setState({
        alertMessage: warningAlert(t("passwordNotAmended")),
      });
    } else {
      his.setState({
        alertMessage: errorAlert(t("passwordAmendmentError")),
      });
    }
  }

  render() {
    const UpdatePasswordAccountValidationSchema = yup.object().shape({
      password: yup
        .string()
        .min(9, ({ min }) => `Password must be at least ${min} characters`)
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
          "Weak password. Make sure to include upper, lower and special characters"
        ),
      confirmPassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords do not match")
        .required(""),
    });

    return (
      <View style={styles.myAccount}>
        <Formik
          validationSchema={UpdatePasswordAccountValidationSchema}
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(values) =>
            delete values["confirmPassword"] &&
            UpdateUserInformation(
              values,
              this.state.keyAndId[1], //key
              this.state.keyAndId[0] //id
            )
              .then((response) => this.handleFeedback(response))
              .catch((error) => this.handleFeedback(error))
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
                name="password"
                placeholder={t("password")}
                style={styles.inputForm}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                secureTextEntry
              />
              {errors.password && (
                <Text style={styles.errorLogin}>{errors.password}</Text>
              )}
              <TextInput
                name="confirmPassword"
                placeholder={t("confirmpassword")}
                style={styles.inputForm}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
                secureTextEntry
              />
              {errors.confirmPassword && (
                <Text style={styles.errorLogin}>{errors.confirmPassword}</Text>
              )}

              <Button
                onPress={handleSubmit}
                title={t("updatePassword")}
                disabled={!isValid}
              />
            </>
          )}
        </Formik>
        {this.state.alertMessage}
      </View>
    );
  }
}
