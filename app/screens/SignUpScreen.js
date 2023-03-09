
import { StyleSheet, Text, View, Button } from 'react-native';


export default function SignUpScreen({ navigation }) {
  
  return (
    <View style={styles.container}>
      <Text>Sign Up Screen!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});