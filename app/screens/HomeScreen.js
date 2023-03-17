
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";


export default function HomeScreen({ navigation }) {

  return (
    
    <View style={styles.container}>
        <Text>Provisional</Text>
    </View>
    
  );
}
   
    
  
  
  




const styles = StyleSheet.create({
  
    container: {
        
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
  },
    logo : {
        width: 60,
        height: 45 ,
        margin: 10,
    
    }   ,
    logoContainer : {
        
      
        alignItems: 'center',
    },
    formContainer : {
        width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
   
    },
 
    input : {

    height: 50,
    padding: 10,
    width: '90%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    },

    error :{
    fontSize: 14,
    color: 'red',
    }
  
});