
import { StyleSheet, Text, View, Image, TextInput} from 'react-native';


export default function LogInScreen({ navigation }) {
  
  return (
    
    <View style={styles.container}>
        <View style={styles.logoContainer}>
        <Image style={styles.logo} source={require("../assets/logo.png")}/>
            
        </View>


        <View style={styles.formContainer}>
    
                <TextInput placeholder="Insert username" style={styles.input} />
           
            
            <TextInput placeholder="Insert username" style={styles.input} />

        </View>
    </View>
    
  );
}

const styles = StyleSheet.create({
  
    container: {
        
        justifyContent: 'center',
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
        flex: 1,
        backgroundColor: '#ebebeb',
        
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
    },
 
    input : {

        alignItems: 'center',
        justifyContent: 'center',
        
        backgroundColor: 'white',
        borderWidth: 0.2,
        borderRadius: 4,
        paddingHorizontal: 10,
        marginVertical: 5
    }
  
});