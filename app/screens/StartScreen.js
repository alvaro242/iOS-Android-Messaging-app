import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';


function StartScreen(props) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/background.jpeg")} > 
            <View style={styles.logoContainer}>
                <Image style={styles.logo} source={require("../assets/logo.png")}/>
                <Text>Welcome!!</Text>
            </View>
            <View style={styles.login}>
                <Text>Login</Text>
            </View>
            <View style={styles.signup}>
                <Text>Sign Up</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    login : {
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
        width: 70,
        height: 70,
        
    },
    logoContainer : {
        top: 100,
        flex: 1,
    }
})

export default StartScreen;