import AsyncStorage from "@react-native-async-storage/async-storage";

export const loadKey = async () => {
  try {
    let key = await AsyncStorage.getItem("whatsthat_session_token");

    if (key !== null) {
      console.log(key);
      return key;
    } else {
      return "error";
    }
  } catch (err) {
    console.log("login again");
  }
};
