import { Text, View, Button, Image, TextInput } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { styles } from "./../components/Styles/customStyle";
import { registerUser } from "../components/utils/API";
import React, { Component } from "react";
import {
  informativeAlert,
  errorAlert,
  successAlert,
  warningAlert,
} from "../components/utils/errorHandling";
import { NativeBaseProvider } from "native-base";

export default class SignUpScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      alertMessage: "",
    };
  }

  componentDidMount() {}

  handleFeedback(response) {
    let positiveFeedback = successAlert(
      "The user has been created. Please log in using your new credentials"
    );
    let warningFeedback = warningAlert(
      "Invalid details. Please change these and try again."
    );

    let errorFeedback = errorAlert("Server error. Please try it later");

    if (response.status == 201) {
      this.setState({
        alertMessage: positiveFeedback,
      });
    } else if (response.status == 400) {
      this.setState({
        alertMessage: warningFeedback,
      });
    } else {
      this.setState({
        alertMessage: errorFeedback,
      });
    }
  }

  render() {
    const signUpvalidationSchema = yup.object().shape({
      first_name: yup.string().required(""), //empty so we dont show any message is is not completed
      last_name: yup.string().required(""),
      email: yup.string().email(" ").required(""),
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
      <View>
        <View>
          <View style={styles.logoContainerSignUp}>
            <Image
              style={styles.logoSignUp}
              source={require("../assets/logo.png")}
            />
          </View>
          <View style={styles.formContainerSignUp}>
            <Text>Create a new account</Text>
            <Formik
              validationSchema={signUpvalidationSchema}
              initialValues={{
                first_name: "",
                last_name: "",
                email: "",
                password: "",
                confirmPassword: "",
              }}
              onSubmit={(values) =>
                delete values["confirmPassword"] &
                registerUser(values)
                  .then((response) => this.handleFeedback(response))
                  .catch((error) => this.handleFeedback(error))
              }
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                isValid,
              }) => (
                <>
                  <TextInput
                    name="first_name"
                    placeholder="First Name"
                    style={styles.inputForm}
                    onChangeText={handleChange("first_name")}
                    onBlur={handleBlur("first_name")}
                    value={values.first_name}
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
                    value={values.last_name}
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
                    value={values.email}
                    keyboardType="text"
                  />
                  {errors.email && (
                    <Text style={styles.errorLogin}>{errors.email}</Text>
                  )}
                  <TextInput
                    name="password"
                    placeholder="Password"
                    style={styles.inputForm}
                    onChangeText={handleChange("password")}
                    onBlur={handleBlur("password")}
                    value={values.password}
                    secureTextEntry
                  />
                  {errors.password && (
                    <Text style={styles.errorLogin}>{errors.password}</Text>
                  )}
                  <TextInput
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    style={styles.inputForm}
                    onChangeText={handleChange("confirmPassword")}
                    onBlur={handleBlur("confirmPassword")}
                    value={values.confirmPassword}
                    secureTextEntry
                  />
                  {errors.confirmPassword && (
                    <Text style={styles.errorLogin}>
                      {errors.confirmPassword}
                    </Text>
                  )}

                  <Button
                    onPress={handleSubmit}
                    title="Sign Up"
                    disabled={!isValid}
                  />
                </>
              )}
            </Formik>
          </View>
          <View>
            <NativeBaseProvider>{this.state.alertMessage}</NativeBaseProvider>
          </View>
        </View>
      </View>
    );
  }
}
