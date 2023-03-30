import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setChanged } from "../../screens/ContactsScreen";
import React, { useCallback } from "react";
import { getServerIP } from "./utils";

export function addFriend(friendID, authKey) {
  let url =
    "http://" + getServerIP() + "/api/1.0.0/user/" + friendID + "/contact";

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
          navigation.navigate("ContactsScreen");
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
    .post("http://" + serverIP + "/api/1.0.0/user/", values)
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
    .post("http://" + getServerIP() + "/api/1.0.0/login/", values)
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
      } catch {
        throw "Something went wrong";
      }
    })
    .catch((error) => {
      //error handling pending
      console.log(error);
    });
}

export function logOut(token) {
  console.log(token);
  return fetch("http://" + getServerIP() + "/api/1.0.0/logout", {
    method: "POST",
    headers: {
      "X-Authorization": token,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");
        console.log("the error is in navigatin");
        navigation.navigate("StartScreen");
      } else if (response.status == 401) {
        console.log("Unauthorized");
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");
        navigation.navigate("StartScreen");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

export function removeContact(userID, key) {
  return fetch(
    "http://" + getServerIP() + "/api/1.0.0/user/" + userID + "/contact",
    {
      method: "DELETE",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been removed");
        navigation.navigate("ContactsScreen");
      } else if (response.status == 400) {
        console.log("You can´t remove yourself as a contact");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

export function blockContact(userID, key) {
  return fetch(
    "http://" + getServerIP() + "/api/1.0.0/user/" + userID + "/block",
    {
      method: "POST",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been blocked");
        navigation.navigate("ContactsScreen");
      } else if (response.status == 400) {
        console.log("You can´t block yourself");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}

export function unblockContact(userID, key) {
  return fetch(
    "http://" + getServerIP() + "/api/1.0.0/user/" + userID + "/block",
    {
      method: "DELETE",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been unblocked");
        navigation.navigate("blockedUsersScreen");
      } else if (response.status == 400) {
        console.log("You can´t block yourself");
      } else if (response.status == 401) {
        console.log("Unauthorized");
      } else if (response.status == 404) {
        console.log("Not Found");
      } else if (response.status == 500) {
        console.log("Server error");
      } else {
        throw "Error";
      }
    })
    .catch((error) => {
      console.log("error");
    });
}
