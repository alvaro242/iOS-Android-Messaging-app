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
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { Component } from "react";

export default class SettingsScreen extends Component {
  render() {
    return (
      <View>
        <Text>Settings test</Text>
      </View>
    );
  }
}
