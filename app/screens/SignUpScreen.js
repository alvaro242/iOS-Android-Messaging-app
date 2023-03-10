
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

const loginValidationSchema = yup.object().shape({

  firstName: yup
    .string()
    .required(''), //empty so we dont show any message is is not completed
  lastName: yup
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
  
  return (
    
    <View style={styles.container}>
        <View style={styles.logoContainer}>
            <Image style={styles.logo} source={require("../assets/logo.png")}/>
        </View>
        
        <Text>Create a new account</Text>

        <View style={styles.formContainer}>
            <Formik
            validationSchema={loginValidationSchema}
            
            
            initialValues={{ firstName:'', lastName:'',  email: '', password: '', confirmPassword: ''}}
            onSubmit={values => 
                
                
                delete values["confirmPassword"] &&
                console.log(values)
                
            }
          >
        
            {({ handleChange, handleBlur, handleSubmit, values, errors, isValid }) => (
              <>
                <TextInput
                  name="firstName"
                  placeholder="First Name"
                  style={styles.input}
                  onChangeText={handleChange('firstName')}
                  onBlur={handleBlur('firstName')}
                  value={values.firstName}
                  keyboardType="email-address"
                />
                {errors.firstName &&
                    <Text style={styles.error}>{errors.firstName}</Text>
                }
                <TextInput
                  name="lastName"
                  placeholder="Last Name"
                  style={styles.input}
                  onChangeText={handleChange('lastName')}
                  onBlur={handleBlur('lastName')}
                  value={values.lastName}
                  keyboardType="text"
                />
                {errors.lastName &&
                    <Text style={styles.error}>{errors.lastName}</Text>
                }
                <TextInput
                  name="email"
                  placeholder="Email Address"
                  autoCapitalize='none'
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
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  secureTextEntry
                />
                {errors.password &&
                    <Text style={styles.error}>{errors.password}</Text>
                }
                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  style={styles.input}
                  onChangeText={handleChange('confirmPassword')}
                  onBlur={handleBlur('confirmPassword')}
                  value={values.confirmPassword}
                  secureTextEntry
                />
                {errors.confirmPassword &&
                    <Text style={styles.error}>{errors.confirmPassword}</Text>
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