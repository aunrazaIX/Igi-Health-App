import React, {useEffect, useState} from 'react';
import MainStack from './src/navigation/MainStack';
import {StatusBar, StyleSheet, View} from 'react-native';
import {NavigationContainer, DefaultTheme} from '@react-navigation/native';
import {Provider} from 'react-redux';
import {persistor, store} from './src/redux/store';
import {PersistGate} from 'redux-persist/integration/react';
import ErrorModal from './src/components/Modal/ErrorModal';
import {COLORS} from './src/assets/theme/colors';
import SpInAppUpdates, {IAUUpdateKind} from 'sp-react-native-in-app-updates';
import Toast from 'react-native-toast-message';
import UpdateVersionModal from './src/components/UpdateVersionModal';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
  },
};

const AppContent = () => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  useEffect(() => {
    const inAppUpdates = new SpInAppUpdates(false);
    inAppUpdates
      .checkNeedsUpdate()
      .then(result => {
        if (result.shouldUpdate) {
          let updateOptions = {};
          if (Platform.OS === 'android') {
            updateOptions = {
              updateType: IAUUpdateKind.IMMEDIATE,
            };
            inAppUpdates.startUpdate(updateOptions);
          } else {
            setShowUpdateModal(true);
          }
        }
      })
      .catch(e => {
        console.log('Error', e);
      });
    requestPermissionHandler()
      .then(bool => {
        if (bool) {
          const messagingInstance = getMessaging(getApp());
          getToken(messagingInstance)
            .then(token => {
              setToken(token);
            })
            .catch(e => {
              console.log(e);
            });
        }
      })
      .catch(e => {
        console.log('E', e);
      });
  }, []);
  const requestPermissionHandler = async () => {
    let allowed = false;
    if (Platform.OS === 'ios') {
      const messagingInstance = getMessaging(getApp());
      const authStatus = await requestPermission(messagingInstance);
      const enabled =
        authStatus === AuthorizationStatus.AUTHORIZED ||
        authStatus === AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        allowed = true;
      }
    } else {
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          allowed = true;
        }
      } else {
        allowed = true;
      }
    }
    return allowed;
  };
  const openAppStore = async () => {
    setShowUpdateModal(false);
    const url = 'itms-apps://apps.apple.com/app/id6503698678';
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
      } else {
        await Linking.openURL('https://apps.apple.com/app/id6503698678');
      }
    } catch (err) {
      console.error('Error opening App Store:', err);
    }
  };
  return (
    <NavigationContainer theme={MyTheme}>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.container}>
        <MainStack />
        <View>
          <ErrorModal />
        </View>
        <Toast />
        <UpdateVersionModal
          onPressUpdate={() => {
            openAppStore();
          }}
          onPressClose={() => setShowUpdateModal(false)}
          visible={showUpdateModal}
        />
      </View>
    </NavigationContainer>
  );
};

const App = () => (
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <AppContent />
    </PersistGate>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.loginContainer,
  },
});
export default App;
