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

export default class ChatsScreen extends Component {
  render() {
    return (
      <View>
        <Text>Chat test</Text>
      </View>
    );
  }
}
