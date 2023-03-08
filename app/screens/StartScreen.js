import React from 'react';
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';

function StartScreen(props) {
    return (
        <ImageBackground 
        style={styles.background}
        source={require("../assets/background.jpeg")}
        > 
        <NavigationContainer>
        <View style={styles.background}>
        <Text>Hello world inside of a Navigation Container!</Text>
        <StatusBar style="auto" />
        </View>
        </NavigationContainer>

        </ImageBackground>

        
 
            
    );
}

const styles = StyleSheet.create({
    background : {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
})

export default StartScreen;