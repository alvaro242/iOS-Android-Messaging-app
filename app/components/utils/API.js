import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ContactsScreen from "../../screens/ContactsScreen";

const localIP = "10.182.23.11";

export function addFriend(friendID, authKey) {
  let url =
    "http://" + localIP + ":3333/api/1.0.0/user/" + friendID + "/contact";

  axios
    .post(
      url,
      {},
      {
        headers: {
          "X-Authorization": authKey,
        },
      }
    )
    .then((response) => {
      //returns user ID on response.data.user_id, pending autologin
      //if response 201 I should make a logged in.

      if (response.status == 200) {
        if (response.data === "Already a contact") {
          console.log("Already a contact");
        } else {
          console.log("Contact added");
        }
      } else {
        //show error informing about error from API
      }
    })
    .catch((error) => {
      //Error handling pending
      console.log(error);

      if (error.response.status == 401) {
        console.log("not auth");
      } else if (error.response.status == 400) {
        console.log("You can´t add yourself as a contact");
      } else if (error.response.status == 404) {
        console.log("This friend ID doesn´t exist");
      } else {
        console.log("Error.  try again  later");
      }
    });
}

export function registerUser(values) {
  console.log(values);
  axios
    .post("http://" + localIP + ":3333/api/1.0.0/user/", values)
    .then((response) => {
      //returns user ID on response.data.user_id, pending autologin
      console.log(response.status);
      //if response 201 I should make a logged in.

      if (response.status == 201) {
        navigation.navigate("LogInScreen"); // or go to root
        // pending: auto-login
      } else {
        //show error informing about error from API
      }
    })
    .catch((error) => {
      //Error handling pending
      console.log(error);
    });
}

export function logIn(values) {
  console.log(values);

  axios
    .post("http://" + localIP + ":3333/api/1.0.0/login/", values)
    .then(async (response) => {
      try {
        await AsyncStorage.setItem(
          "whatsthat_user_id",
          response.data.id.toString()
        ); //expo recomends to stringify this
        await AsyncStorage.setItem(
          "whatsthat_session_token",
          response.data.token
        );
        console.log(response.data.token);
        navigation.navigate("HomeScreen");

        //this.setState({"submitted": false}); This seems like its not working
      } catch {
        throw "Something went wrong";
      }
    })
    .catch((error) => {
      //error handling pending
      console.log(error);
    });
}
