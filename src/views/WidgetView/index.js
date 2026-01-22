import React from 'react';
import {View} from 'react-native';
import {CurvedView, TopView} from '../../components';
import {WebView} from 'react-native-webview';
import SimpleLoader from '../../components/SimpleLoader';
import styles from './styles';
import {COLORS} from '../../assets/theme/colors';

const WidgetView = ({
  title,
  token,
  handleLoadError,
  isLoading,
  widgetUrl,
  incValue,
  setLoadingState,
  handleNavigation,
}) => {
  return (
    <View style={styles.container}>
      <TopView title={title} />
      <CurvedView containerStyle={styles.subContainer}>
        {isLoading && <SimpleLoader color={COLORS.loginButton} />}
        {incValue && (
          <WebView
            incognito
            source={{
              uri: widgetUrl,
              headers: {
                'widget-token': token,
              },
            }}
            onShouldStartLoadWithRequest={handleNavigation}
            onLoadStart={() => setLoadingState(true)}
            onLoadEnd={() => setLoadingState(false)}
            style={styles.container}
            javaScriptEnabled
            onError={handleLoadError}
            domStorageEnabled
          />
        )}
      </CurvedView>
    </View>
  );
};

export default WidgetView;
