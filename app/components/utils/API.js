import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import * as RootNavigation from "./RootNavigation";

let serverIP = "localhost:3333";

export function registerUser(values) {
  let url = "http://" + serverIP + "/api/1.0.0/user/";
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(values),
  })
    .then((response) => {
      //returns user ID on response.data.user_id, pending autologin

      return response;
    })
    .catch((error) => {
      //Error handling pending

      return error;
    });
} //validation on front end

export function getUserInformation(token, userID) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("No response / not auth");
      console.log(error);
    });
}

export function UpdateUserInformation(values, userID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID;

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(values),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export function logIn(values) {
  let url = "http://" + serverIP + "/api/1.0.0/login/";

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(values),
  })
    .then(async (response) => {
      let responseToReturn = response;
      const responseJson = await response.json();

      try {
        await AsyncStorage.setItem(
          "whatsthat_user_id",
          responseJson.id.toString()
        ); //expo recomends to stringify this
        await AsyncStorage.setItem(
          "whatsthat_session_token",
          responseJson.token
        );
      } catch (error) {
        throw error;
      }
      return responseToReturn;
    })

    .catch((error) => {
      return error;
    });
}

export function logOut(token) {
  console.log(token);
  return fetch("http://" + serverIP + "/api/1.0.0/logout", {
    method: "POST",
    headers: {
      "X-Authorization": token,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");

        RootNavigation.navigate("StartScreen");
      } else if (response.status == 401) {
        console.log("Unauthorized");
        await AsyncStorage.removeItem("whatsthat_session_token");
        await AsyncStorage.removeItem("whatsthat_user_id");
        RootNavigation.navigate("StartScreen");
      } else {
        throw RootNavigation.navigate("StartScreen");
      }
    })
    .catch((error) => {
      RootNavigation.navigate("StartScreen");
      console.log("error");
    });
}

export function getProfilePicture(userID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + userID + "/photo";

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "image/png",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.blob();
    })
    .then((resBlob) => {
      let data = URL.createObjectURL(resBlob);
      return data;
    })
    .catch((error) => console.log(error));
}

export async function uploadProfilePic(token, id, photo) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + id + "/photo";
  let fetchpic = await fetch(photo);
  let blob = await fetchpic.blob();

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "image/png",
      "X-Authorization": token,
    },
    body: blob,
  })
    .then((response) => {
      console.log(response);
    })

    .catch((error) => console.log(error));
}

export function searchCurrentUsers(searchWord, token) {
  let url =
    "http://" +
    serverIP +
    "/api/1.0.0/search?q=" +
    searchWord +
    "&limit=999&search_in=contacts";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function searchBetweenAllUsers(searchWord, token) {
  let url =
    "http://" +
    serverIP +
    "/api/1.0.0/search?q=" +
    searchWord +
    "&limit=999&search_in=all";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      console.log(response);
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function getAllContacts(token) {
  let url = "http://" + serverIP + "/api/1.0.0/contacts";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function addFriend(friendID, authKey) {
  let url = "http://" + serverIP + "/api/1.0.0/user/" + friendID + "/contact";

  return axios
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

      return response;
    })
    .catch((error) => {
      //Error handling pending

      return error;
    });
}

export function removeContact(userID, key) {
  return fetch(
    "http://" + serverIP + "/api/1.0.0/user/" + userID + "/contact",
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
        alert("The Contact has been removed");
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

export function getBlockedContacts(token) {
  let url = "http://" + serverIP + "/api/1.0.0/blocked";

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("No response / not auth");
      console.log(error);
    });
}

export function blockContact(userID, key) {
  return fetch("http://" + serverIP + "/api/1.0.0/user/" + userID + "/block", {
    method: "POST",
    headers: {
      "X-Authorization": key,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been blocked");
        alert("The contact has been blocked");
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
  return fetch("http://" + serverIP + "/api/1.0.0/user/" + userID + "/block", {
    method: "DELETE",
    headers: {
      "X-Authorization": key,
    },
  })
    .then(async (response) => {
      if (response.status == 200) {
        console.log("The contact has been unblocked");
        RootNavigation.navigate("blockedUsersScreen");
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

export function getAllChats(token) {
  let url = "http://" + serverIP + "/api/1.0.0/chat";

  return fetch(url, {
    method: "GET",
    headers: {
      accept: "application/json",
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log(error);
    });
}

export function createConversation(title, key) {
  let url = "http://" + serverIP + "/api/1.0.0/chat/";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-Authorization": key,
    },
    body: JSON.stringify(title),
  })
    .then((response) => {
      if (response.status == 201) {
        alert("Conversation created: " + title);
      } else {
        console.log("error. Something went wrong");
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

export function getChatDetails(chatID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/chat/" + chatID;

  return fetch(url, {
    method: "GET",
    headers: {
      "X-Authorization": token,
    },
  })
    .then((response) => {
      return response.json();
    })

    .catch((error) => {
      console.log("No response / not auth");
      console.log(error);
    });
}

export function sendNewMessage(message, chatID, key) {
  const objectToAPI = { message: message };

  let url = "http://" + serverIP + "/api/1.0.0/chat/" + chatID + "/message";

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-Authorization": key,
    },
    body: JSON.stringify(objectToAPI),
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("Message sent: " + message);
      } else {
        console.log("error. Something went wrong");
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

export function addNewMemberToChat(chatID, userID, key) {
  let url =
    "http://" + serverIP + "/api/1.0.0/chat/" + chatID + "/user/" + userID;

  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
      "X-Authorization": key,
    },
  })
    .then((response) => {
      if (response.status == 200) {
        console.log("member added");
      } else {
        console.log("error. Something went wrong");
      }
    })

    .catch((error) => {
      console.log(error);
    });
}

export function removeMember(chatID, userID, key) {
  return fetch(
    "http://" + serverIP + "/api/1.0.0/chat/" + chatID + "/user/" + userID,
    {
      method: "DELETE",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

export function updateChatName(newName, chatID, token) {
  let url = "http://" + serverIP + "/api/1.0.0/chat/" + chatID;

  let nameToServer = { name: newName };

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(nameToServer),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export function updateMessage(chatID, messageID, token, newMessage) {
  let url =
    "http://" +
    serverIP +
    "/api/1.0.0/chat/" +
    chatID +
    "/message/" +
    messageID;
  let messageToServer = { message: newMessage };

  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "X-Authorization": token,
    },
    body: JSON.stringify(messageToServer),
  })
    .then((response) => console.log(response))
    .catch((error) => console.log(error));
}

export function deleteMessage(chatID, messageID, key) {
  return fetch(
    "http://" +
      serverIP +
      "/api/1.0.0/chat/" +
      chatID +
      "/message/" +
      messageID,
    {
      method: "DELETE",
      headers: {
        "X-Authorization": key,
      },
    }
  )
    .then(async (response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
}

// TO IMPLEMENT ALL CHAT
