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

export const loadKeyAndID = async () => {
  try {
    let key = await AsyncStorage.getItem("whatsthat_session_token");
    let id = await AsyncStorage.getItem("whatsthat_user_id");
    if (key !== null) {
      return [key, id];
    } else {
      return "error";
    }
  } catch (err) {
    console.log("login again");
  }
};

export function showTime(messageTimeStamp) {
  console.log(messageTimeStamp);
  var currentDate = new Date();

  var today =
    currentDate.getDate() +
    "/" +
    currentDate.getMonth() +
    "/" +
    currentDate.getFullYear();

  "/" + currentDate.getMonth() + "/" + currentDate.getFullYear();

  var oneWeekAgoTimeStamp = Date.now() - 604800000;
  console.log(oneWeekAgoTimeStamp);

  //if it was more than 7 days ago, return full date
  //if it was between 1 and 7 days ago, return week day
  //if it was today, show time

  var weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";
  var dateMessage = new Date(messageTimeStamp);

  var writtenweekdaymessage = weekday[dateMessage.getDay()];

  var dayMessage =
    dateMessage.getDate() +
    "/" +
    dateMessage.getMonth() +
    "/" +
    dateMessage.getFullYear();

  var timeMessage = dateMessage.getHours() + ":" + dateMessage.getMinutes();

  if (today == dayMessage) {
    return timeMessage;
  } else if (messageTimeStamp > oneWeekAgoTimeStamp) {
    return writtenweekdaymessage;
  } else {
    return dayMessage;
  }
}
