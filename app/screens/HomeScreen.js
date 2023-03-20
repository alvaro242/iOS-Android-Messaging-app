
import { StyleSheet, Text, View, Button, Image, TextInput } from 'react-native';
import axios from "axios";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import ChatsScreen from "./ChatsScreen";
import AccountScreen from "./AccountScreen";
import ContactsScreen from "./ContactsScreen";

const HomeTab = createBottomTabNavigator()

export default function HomeScreen({ navigation }) {

  return (
    
    <HomeTab.Navigator initialRouteName="Home">
          <HomeTab.Screen name="Contacts" component={ContactsScreen} options={{title: "Contacts", headerShown: false} }/>
          <HomeTab.Screen name="Chats" component={ChatsScreen} options={{title: "Chats", headerShown: false} }/>
          <HomeTab.Screen name="AccountScreen" component={AccountScreen} options={{title: "Account", headerShown: false} } />
    </HomeTab.Navigator>
   
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