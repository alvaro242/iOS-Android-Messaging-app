
import {  Text, View, Button, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from "axios";
import {styles} from './../components/Styles/customStyle';

const loginValidationSchema = yup.object().shape({

  first_name: yup
    .string()
    .required(''), //empty so we dont show any message is is not completed
  last_name: yup
    .string()
    .required(''),
  email: yup
    .string()
    .email(" ")
    .required(''),
  password: yup
    .string()
    .min(9, ({ min }) => `Password must be at least ${min} characters`)
    .matches(

        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{9,})/,
        "Weak password. Make sure to include upper, lower and special characters"
      ),
  confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords do not match')
      .required(''),
})




export default function SignUpScreen({ navigation }) {

  //Meter cada llamada a API dentro de un componente
  function callToApiRegister(values){
    console.log(values);
    axios.post("http://localhost:3333/api/1.0.0/user/", values)
    .then ((response) => {

      //returns user ID on response.data.user_id, pending autologin
      console.log(response);
      //if response 201 I should make a logged in. 
  
  })
  .catch ((error) =>{
    
      //Error handling pending
      console.log(error);
   
    });

  }
  
  return (
    
    <View style={styles.containerSignUp}>
        <View style={styles.logoContainerSignUp}>
            <Image style={styles.logoSignUp} source={require("../assets/logo.png")}/>
        </View>
        
        <Text>Create a new account</Text>

        <View style={styles.formContainerSignUp}>
            <Formik
            validationSchema={loginValidationSchema}
            
            
            initialValues={{ first_name:'', last_name:'',  email: '', password: '', confirmPassword: ''}}
            onSubmit={values => 
                
                
                delete values["confirmPassword"] &&
                callToApiRegister(values)
                
            }
          >
        
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <>
                <TextInput
                  name="first_name"
                  placeholder="First Name"
                  style={styles.inputForm}
                  onChangeText={handleChange('first_name')}
                  onBlur={handleBlur('first_name')}
                  value={values.first_name}
                  keyboardType="email-address"
                />
                {errors.first_name &&
                    <Text style={styles.errorLogin}>{errors.first_name}</Text>
                }
                <TextInput
                  name="last_name"
                  placeholder="Last Name"
                  style={styles.inputForm}
                  onChangeText={handleChange('last_name')}
                  onBlur={handleBlur('last_name')}
                  value={values.last_name}
                  keyboardType="text"
                />
                {errors.last_name &&
                    <Text style={styles.errorLogin}>{errors.last_name}</Text>
                }
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  autoCapitalize='none'
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
                  style={styles.inputForm}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password &&
                    <Text style={styles.errorLogin}>{errors.password}</Text>
                }
                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.inputForm}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {errors.confirmPassword &&
                    <Text style={styles.errorLogin}>{errors.confirmPassword}</Text>
                }
                
                <Button onPress={handleSubmit} title="Sign Up" disabled={!isValid} />
                
              </>
            )}
          </Formik>
        </View>
    </View>
    
  );
}

