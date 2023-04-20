import I18n from "ex-react-native-i18n";
import * as Localization from "expo-localization";

import en from "./en.json";
import es from "./es.json";

I18n.translations = { en, es };

export function getLanguage() {
  try {
    const choice = Localization.locale;
    console.log("choice is " + choice);
    I18n.locale = choice.substring(0, 2);
    I18n.initAsync();
  } catch (err) {
    console.log(err);
  }
}

export function t(name) {
  return I18n.t(name);
}
