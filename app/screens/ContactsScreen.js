
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {styles} from './../components/Styles/customStyle';

let pageName = "Contacts";


export default function ContactsScreen({ navigation }) {


  return (
    <div>
    <View style={styles.header}>
    <Text>{pageName}</Text>
    </View>
    <View style={styles.contactsContainer}>
      <Text>Content</Text>
    </View>
    </div>
  
  );
}

