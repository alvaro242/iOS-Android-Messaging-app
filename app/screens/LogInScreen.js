import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  Button,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { styles } from "./../components/Styles/customStyle";
import { logIn } from "../components/utils/API";
import React, { Component } from "react";

export default class LogInScreen extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const loginValidationSchema = yup.object().shape({
      email: yup
        .string()
        .email("Please enter valid email")
        .required("Email is required"),
      password: yup
        .string()
        .min(9, ({ min }) => `Password must be at least ${min} characters`),
    });

    return (
      <View style={styles.LoginContainer}>
        <View style={styles.logoContainerLogin}>
          <Image
            style={styles.logoLogin}
            source={require("../assets/logo.png")}
          />
        </View>

        <Text>Create a new account</Text>

        <View style={styles.formContainerLogin}>
          <Formik
            validationSchema={loginValidationSchema}
            initialValues={{ email: "", password: "" }}
            onSubmit={(values) => logIn(values)}
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
                  name="email"
                  placeholder="Email Address"
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
                  autoCapitalize="none"
                  style={styles.inputForm}
                  onChangeText={handleChange("password")}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password && (
                  <Text style={styles.errorLogin}>{errors.password}</Text>
                )}

                <Button
                  onPress={handleSubmit}
                  title="Log In"
                  disabled={!isValid}
                />
              </>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}
