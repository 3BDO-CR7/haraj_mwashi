import React, { Component }                from 'react';
import {StyleSheet, View, AsyncStorage, I18nManager,Platform} from 'react-native';
import   {Root}                            from 'native-base';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistedStore } from './src/store';

import Constants from "expo-constants";

import * as Font from 'expo-font';
import { Ionicons } from '@expo/vector-icons';
import Routes from './src/RootNavigator'
import './ReactotronConfig';
import I18n from 'ex-react-native-i18n';


export default class App extends Component {

  constructor(props){
    super(props);
    this.loadFontAsync();
    this.state = {
      fontLoaded: false
    };
      console.disableYellowBox = true;

  }

  //   handleNotification = (notification) => {
  //       if (notification && notification.origin !== 'received') {
  //           this.props.navigation.navigate('notification');
  //       }
  //   };
  //
    async componentDidMount() {
  //       if (Platform.OS === 'android') {
  //           Notifications.createChannelAndroidAsync('orders', {
  //               name: 'Orders',
  //               priority: 'max',
  //               vibrate: [0, 250, 250, 250],
  //           })
  //       }
  //       Notifications.addListener(this.handleNotification);
  //
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      ...Ionicons.font,
    });
  }
    
  async loadFontAsync() { try 
    {
      await Font.loadAsync({ CairoRegular: require("./assets/fonts/Cairo-Regular.ttf") });
      await Font.loadAsync({ CairoBold: require("./assets/fonts/Cairo-Bold.ttf") });
      this.setState({ fontLoaded: true });
    } catch (e) {
      console.log(e);
    }
  }
  render() {
    if (!this.state.fontLoaded) {
      return <View />;
    }
    return (

        <Provider store={store} UNSAFE_readLatestStoreStateOnFirstRender={true}>
              <PersistGate persistor={persistedStore}>
              <Root>
                  <Routes/>
              </Root>
             </PersistGate>
      </Provider>
    );
  }
}



