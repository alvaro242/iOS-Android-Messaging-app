import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View, TouchableHighlight} from 'react-native';

export default function StartScreen({ navigation }) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/background.jpeg")} > 
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text>Telechat</Text>
            </View>
            <TouchableHighlight style={styles.privisionalHomeButton} onPress={()=> {
                
                navigation.push("HomeScreen");
                }}>
                <Text>Provisional: Home</Text>
             </TouchableHighlight>
            <TouchableHighlight style={styles.loginContainer} onPress={()=> {
                console.log('Login Button!');
                navigation.push("LogInScreen");
                }}>
                <Text>Log In</Text>
             </TouchableHighlight>
            <TouchableHighlight style={styles.signup} onPress={()=> {
                console.log('Sign Up Button!');
                navigation.push("SignUpScreen");
                }}>
                <Text>Sign Up</Text>
            </TouchableHighlight>
        </ImageBackground>
        
    );
}
    

const styles = StyleSheet.create({
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
   
    signup : {
        width: "100%",
        height: 60,
        backgroundColor: "yellow",
        alignItems: 'center',
        justifyContent: 'center',
    },
    logo : {
        width: 120,
        height: 90 ,
        top: -10,
        
    },
    logoContainer : {
        top: 120,
        flex: 1,
        alignItems: 'center',
    },
  
})

