import { Text, View, Image, TextInput, Button, Alert } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import axios from "axios";

import { styles } from "./../components/Styles/customStyle";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { addcontactScreen } from "./addContactScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useState, useEffect } from "react";
import { loadKey } from "../components/utils/loadKey";
import { apiCallGetAllContacts } from "../components/utils/API";

export default function ContactsScreen({ navigation }) {
  loadKey().then((key) => apiCallGetAllContacts(key));

  return (
    <View>
      <Text>Hola!</Text>
    </View>
  );
}
