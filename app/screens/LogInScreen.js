
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeScreen from "./HomeScreen";
import {styles} from './../components/Styles/customStyle';




const loginValidationSchema = yup.object().shape({

  
  email: yup
    .string()
    .email("Please enter valid email")
    .required('Email is required'),
  password: yup
    .string()
    .min(9, ({ min }) => `Password must be at least ${min} characters`)
    
})




export default function LogInScreen({ navigation }) {


  //Meter cada llamada a API dentro de un componente
  function callToApi(values){
    axios.post("http://localhost:3333/api/1.0.0/login/", values)
    .then (async (response) => {

      

      try{
        await AsyncStorage.setItem("whatsthat_user_id", response.data.id)
        await AsyncStorage.setItem("whatsthat_session_token", response.data.token)
        console.log(response.data.token);
        navigation.push("HomeScreen");
       

        //this.setState({"submitted": false}); This seems like its not working

        //this.props.navigation.navigate("SignUpScreen"); This looks like is not working

      }
      catch{
        throw "Something went wrong"

      }
  
  })
  .catch ((error) =>{
    
      //error handling pending
      console.log(error);
   
    });

  }

  
  return (

    <View style={styles.LoginContainer}>
        <View style={styles.logoContainerLogin}>
            <Image style={styles.logoLogin} source={require("../assets/logo.png")}/>
        </View>
        
        <Text>Create a new account</Text>

        <View style={styles.formContainerLogin}>
            <Formik
            validationSchema={loginValidationSchema}
            initialValues={{   email: '', password: ''}}
            onSubmit={values => callToApi(values)}
          >
        
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <>
                
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  style={styles.inputForm}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="text"
                />
                {errors.email &&
                    <Text style={styles.errorLogin}>{errors.email}</Text>
                }
                <TextInput
                  name="password"
                  placeholder="Password"
                  autoCapitalize='none'
                  style={styles.inputForm}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password &&
                    <Text style={styles.errorLogin}>{errors.password}</Text>
                }
                
                <Button onPress={handleSubmit} title="Log In" disabled={!isValid} />
              </>
            )}
          </Formik>
        </View>
    </View>
    
  );
}


