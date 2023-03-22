import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    root: {
        flex: 1,
        },

    // start screen

    background : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
       
    },
    loginContainer : {
        width: "100%",
        height: 60,
        backgroundColor: "salmon",
        alignItems: 'center',
        justifyContent: 'center',
    },
   
    signupContainer : {
        width: "100%",
        height: 60,
        backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStart : {
        width: 120,
        height: 90 ,
        top: -10,
        
    },
    logoContainer : {
        top: 120,
        flex: 1,
        alignItems: 'center',
    },

    //login screen

    LoginContainer: {
        
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
  },
    logoLogin : {
        width: 60,
        height: 45 ,
        margin: 10,
    
    }   ,
    logoContainerLogin : {
        
      alignItems: 'center',
    },
    formContainerLogin : {
        width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
   
    },
 
    inputForm : {

    height: 50,
    padding: 10,
    width: '90%',
    margin: 10,
    backgroundColor: 'white',
    borderColor: 'gray',
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
    },

    errorLogin :{
    fontSize: 14,
    color: 'red',
    },

    // Sign Up Screen

    containerSignUp: {
        
        justifyContent: 'center',
        alignItems: "center",
        backgroundColor: "white",
  },
    logoSignUp : {
        width: 60,
        height: 45 ,
        margin: 10,
    
    }   ,
    logoContainerSignUp : {
        
      
        alignItems: 'center',
    },
    formContainerSignUp : {
        width: '80%',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
   
    },
  
});
    


