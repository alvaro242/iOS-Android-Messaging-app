import I18n from "ex-react-native-i18n";
import * as Localization from "expo-localization";
import { loadLanguagePreference } from "../app/components/utils/utils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import en from "./en.json";
import es from "./es.json";

I18n.translations = { en, es };

function getDefaultLanguage() {
  try {
    const choice = Localization.locale;
    console.log("Default langauge " + choice);
    I18n.locale = choice.substring(0, 2);
    I18n.initAsync();
  } catch (err) {
    console.log(err);
  }
}

export async function getLanguagePreference() {
  try {
    let language = await AsyncStorage.getItem("language");

    if (language !== null) {
      I18n.locale = language;
      //I18n.initAsync();
      console.log("language preference is " + language);
    } else {
      getDefaultLanguage();
    }
  } catch (err) {
    console.log("error");
  }
}

export function t(name) {
  return I18n.t(name);
}
