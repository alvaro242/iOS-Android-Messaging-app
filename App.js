import { StyleSheet, SafeAreaView } from 'react-native';
import StartScreen from "./app/screens/StartScreen";
import LogInScreen from "./app/screens/LogInScreen";
import SignUpScreen from "./app/screens/SignUpScreen";
import HomeScreen from "./app/screens/HomeScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from 'react'; 


const Stack = createNativeStackNavigator();


export default class App extends Component {

  render(){
  
  return (
    //SafeArea for iPhoneX+ devices
  <SafeAreaView style={styles.root}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="Start"
          component={StartScreen}
          options={{title: "Welcome", headerShown: false} }
        />
        <Stack.Screen 
          name="LogInScreen"
          component={LogInScreen}
          options={{title: "Log In", } }
        />
        <Stack.Screen 
          name="SignUpScreen"
          component={SignUpScreen}
          options={{title: "Sign Up", } }
        />
        <Stack.Screen 
          name="HomeScreen"
          component={HomeScreen}
          options={{title: "Home", headerShown: false, gestureEnabled: false} }
        />
      </Stack.Navigator>
    </NavigationContainer>
  </SafeAreaView>
);

}}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    
  },
});