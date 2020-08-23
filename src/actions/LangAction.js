import {
    I18nManager  as RNI18nManager,
    AsyncStorage
} from 'react-native';
import i18n from '../../locale/i18n';
import Expo from "expo";
import { Util , Updates} from 'expo';
import RNRestart from 'react-native-restart'; // Import package from node modules





export const chooseLang = lang => {

     if (lang === 'en') {
        RNI18nManager.forceRTL(false);
    } else {
        RNI18nManager.forceRTL(true);
    }

    if(!lang){
        lang = 'ar'
    }
    i18n.locale = lang;
    setLang(lang);

    return {
        type: 'chooseLang',
        payload: lang
    }
};

const setLang = async lang => {


               // Updates.reloadFromCache();
               // Expo.DevUtil.reload()
               // RNRestart.Restart();

    await AsyncStorage.setItem('lang', lang).then (() =>{

               // i18n.locale = lang;
               // const RNDir = RNI18nManager.isRTL ? 'RTL' : 'LTR';
               // RN doesn't always correctly identify native
               // locale direction, so we force it here.
               // if (i18n.dir !== RNDir) {
               // const isLocaleRTL = i18n.dir === 'RTL';
               // RNI18nManager.forceRTL(isLocaleRTL);
               // RN won't set the layout direction if we
               // don't restart the app's JavaScript.
               // }

               Updates.reload();

               //i18n.locale = lang;
    });

};


