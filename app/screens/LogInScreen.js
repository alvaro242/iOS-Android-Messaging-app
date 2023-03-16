
import { StyleSheet, Text, View, Image, TextInput, Button, Alert} from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";





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
    .then ((response) => {

      console.log(response.data.token);
  
  })
  .catch ((error) =>{
    
      console.log(error);
   
    });

  }

  
  return (

    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo.png")}/>
        </View>
        
        <Text>Create a new account</Text>

        <View style={styles.formContainer}>
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
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                  keyboardType="text"
                />
                {errors.email &&
                    <Text style={styles.error}>{errors.email}</Text>
                }
                <TextInput
                  name="password"
                  placeholder="Password"
                  autoCapitalize='none'
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password &&
                    <Text style={styles.error}>{errors.password}</Text>
                }
                
                <Button onPress={handleSubmit} title="Log In" disabled={!isValid} />
              </>
            )}
          </Formik>
        </View>
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