import { StyleSheet } from "react-native";
import { Dimensions, StatusBar } from "react-native";
import React from "react";

let ScreenHeight = Dimensions.get("window").height;
let ScreenWidth = Dimensions.get("window").width;

export const styles = StyleSheet.create({
  root: {
    flex: 1,
  },

  // start screen

  background: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loginContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
  },

  signupContainer: {
    width: "100%",
    height: 60,
    backgroundColor: "yellow",
    alignItems: "center",
    justifyContent: "center",
  },
  logoStart: {
    width: 120,
    height: 90,
    top: -10,
  },
  logoContainer: {
    top: 120,
    flex: 1,
    alignItems: "center",
  },

  //login screen

  LoginContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoLogin: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainerLogin: {
    alignItems: "center",
  },
  formContainerLogin: {
    width: "80%",
    alignItems: "center",
    backgroundColor: "white",
    padding: 10,
    elevation: 10,
  },

  inputForm: {
    height: 50,
    padding: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  inputFormBlocked: {
    height: 50,
    padding: 10,
    width: "90%",
    margin: 10,
    backgroundColor: "#EBEBEB",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  errorLogin: {
    fontSize: 14,
    color: "red",
  },

  // Sign Up Screen

  containerSignUp: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  logoSignUp: {
    width: 60,
    height: 45,
    margin: 10,
  },
  logoContainerSignUp: {
    alignItems: "center",
    backgroundColor: "white",
  },
  formContainerSignUp: {
    alignItems: "center",

    padding: 10,
    elevation: 10,
  },

  //header

  header: {
    flexDirection: "row",
    alignContent: "space-around",
    height: 50,
    width: ScreenWidth,
    alignItems: "center",
    justifyContent: "space-between",
  },

  titleOnHeader: {},

  addOnHeader: {
    alignItems: "center",
    height: 50,
    width: 50,
    justifyContent: "center",
  },

  //contacts Screen
  /*
  contactsContainer: {
    width: "100%",
    height: ScreenHeight,
    alignItems: "center",
    justifyContent: "center",
  },
  */
  /*
  contactsContentContainer: {
    flex: 1,
    width: "100%",
    height: ScreenHeight,
    backgroundColor: "salmon",
    alignItems: "center",
    justifyContent: "center",
  },
*/
  inputInsertID: {
    height: 50,
    padding: 10,
    width: "30%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  searchText: {
    alignItems: "center",
    justifyContent: "center",
  },

  inputFormAddContact: {
    height: 50,
    padding: 10,
    width: "30%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  contact: {
    backgroundColor: "white",
    padding: 35,
    marginBottom: 2,
    justifyContent: "center",
  },

  myAccount: {
    backgroundColor: "#EBF2F7",
    padding: 30,
    marginBottom: 2,
    justifyContent: "center",
  },

  settingsContainer: {
    height: 40,
    paddingHorizontal: 40,
    width: "100%",
    height: 120,
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 5,

    backgroundColor: "white",
    elevation: 10,
  },

  settingsOption: {
    borderBottomWidth: 0.5,
    borderColor: "grey",
    //padding: 10,
    paddingVertical: 15,
  },

  settingsScreen: {
    alignSelf: "center",
  },

  myPic: {
    width: 200,
    height: 200,
    alignSelf: "center",
    borderRadius: 100,
  },

  searchContactsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#EBF2F7",
  },

  inputSearch: {
    height: 50,
    padding: 10,
    width: "80%",
    margin: 10,
    backgroundColor: "white",
    borderColor: "gray",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 10,
  },

  searchContactsButton: {
    height: "70%",
  },

  submitButton: {
    justifyContent: "space-around",
  },
  clearSearch: { alignSelf: "center", padding: 50 },

  contactsFound: {
    flexDirection: "row",
    backgroundColor: "white",
    padding: 30,
    marginBottom: 2,
    justifyContent: "space-between",
  },

  conversationPreview: {
    backgroundColor: "white",
    padding: 30,
    marginBottom: 2,
    justifyContent: "center",
  },

  convTitleAndTime: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  conversationTitle: {
    fontWeight: "bold",
  },

  lastMessageAndNotifications: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  chatHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#5D80F0",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
  },
  nameChat: {
    color: "white",
    fontSize: 20,
  },
  aboutContainer: {
    padding: 20,
  },

  membersContainer: {
    //paddingVertical: 40,
    //paddingHorizontal: 20,
    justifyContent: "center",
    //alignItems: "center",
    borderCurve: "circular",
    width: "100%",
    borderColor: "black",

    borderRadius: 100,
  },
  memberContainer: {
    flexDirection: "row",
    backgroundColor: "white",
    paddingVertical: 10,
    marginBottom: 2,
    justifyContent: "space-between",

    alignItems: "center",
  },

  nameMember: {
    paddingHorizontal: 10,
    justifyContent: "flex-start",
    alignSelf: "center",
  },
  sendMessageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#EBF2F7",
    justifyContent: "flex-end",
    position: "absolute",
    height: 70,
    top: ScreenHeight - 70,
    width: ScreenWidth,
    left: 0,
  },
  amendContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    paddingHorizontal: 20,
    paddingVertical: 5,
    backgroundColor: "#EBF2F7",
    justifyContent: "flex-end",
    position: "absolute",
    height: 70,
    top: ScreenHeight - 140,
    width: ScreenWidth,
    left: 0,
  },

  screenContainer: { flex: 1, backgroundColor: "white" },

  memberpic: {
    width: 50,
    height: 50,
    alignSelf: "center",
    borderRadius: 100,
    alignContent: "content",
    justifyContent: "center",
    borderRadius: 100,
  },

  membersHeader: {
    justifyContent: "space-between",
    backgroundColor: "#EBF2F7",
    height: 60,
    alignItems: "center",
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  membersPicsRow: {
    flexDirection: "row",
  },

  conversationContainer: {
    flex: 1,
    height: "100%",
  },

  outerContainer: { padding: 5 },

  messageContainer: {
    padding: 10,
    backgroundColor: "#33B7FF",
    width: "70%",
    borderRadius: 15,
    alignSelf: "flex-start",
  },

  myMessageContainer: {
    flexDirection: "row",
    padding: 10,
    width: "70%",
    backgroundColor: "#63D25C",
    borderRadius: 15,
    alignSelf: "flex-end",
  },

  textMessage: {
    fontSize: "80%",
  },

  timeMessage: {
    fontSize: "50%",
    color: "#ECECEC",
    alignSelf: "flex-end",
    fontWeight: "bold",
    paddingHorizontal: 1,
  },

  sendButton: {
    justifyContent: "center",
    alignSelf: "center",
    height: "30%",
  },

  menuContainer: {
    height: ScreenHeight * 0.6,
    top: ScreenHeight / 2,
    justifyContent: "center",
    alignItems: "center",
  },

  membersListHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // paddingHorizontal: 15,
    //paddingVertical: 20,
    backgroundColor: "#EBF2F7",
    marginBottom: 2,
  },

  chatTitle: {
    //alignItems: "center",
    justifyContent: "center",
  },
});
