import {useFocusEffect} from '@react-navigation/native';
import {useCallback, useState} from 'react';
import {Alert, Linking} from 'react-native';
import {useSelector} from 'react-redux';

const useWidgetViewModel = ({route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [key, setKey] = useState(null);
  const [isErrorOcuured, setIsErrorOccured] = useState(false);
  const {widgetToken: token} = useSelector(state => state.auth);
  const {widgetName, title} = route?.params || {};
  const widgetUrl = `http://pkdemo.oladoc.com/widgets/launch?screen_name=${widgetName}`;

  const setLoadingState = loading => {
    setIsLoading(loading);
  };
  const handleNavigation = request => {
    const requestUrl = request.url;
    if (
      requestUrl.startsWith('https://wa.me/') ||
      requestUrl.startsWith('whatsapp://')
    ) {
      Linking.canOpenURL(requestUrl)
        .then(supported => {
          if (supported) Linking.openURL(requestUrl);
          else Alert.alert('WhatsApp is not installed');
        })
        .catch(() => {});
      return false;
    }

    if (
      requestUrl.startsWith('geo:') ||
      requestUrl.startsWith('google.navigation:') ||
      requestUrl.startsWith('https://www.google.com/maps') ||
      requestUrl.startsWith('intent://')
    ) {
      let urlToOpen = requestUrl;

      if (requestUrl.startsWith('intent://')) {
        const fallbackMatch = requestUrl.match(
          /S\.browser_fallback_url=([^;]+)/,
        );
        if (fallbackMatch && fallbackMatch[1]) {
          urlToOpen = decodeURIComponent(fallbackMatch[1]);
        } else {
          urlToOpen = 'https://www.google.com/maps';
        }
      }

      Linking.canOpenURL(urlToOpen)
        .then(supported => {
          if (supported) {
            Linking.openURL(urlToOpen);
          } else {
            Alert.alert('Cannot open Google Maps');
          }
        })
        .catch(e => {
          console.log('Error', e);
        });

      return false;
    }
    return true;
  };

  useFocusEffect(
    useCallback(() => {
      setKey(true);
      setIsLoading(true);
      return () => {
        setKey(null);
        setIsLoading(false);
      };
    }, []),
  );
  const handleLoadError = () => {
    setIsErrorOccured(true);
    setIsLoading(false);
  };
  return {
    states: {
      token,
      widgetUrl,
      incValue: key,
      isLoading,
      isErrorOcuured,
      title,
    },
    functions: {
      setLoadingState,
      handleLoadError,
      handleNavigation,
    },
  };
};
export default useWidgetViewModel;
