import React from 'react';
import {View} from 'react-native';
import {CurvedView, TopView} from '../../components';
import {WebView} from 'react-native-webview';
import SimpleLoader from '../../components/SimpleLoader';
import styles from './styles';
import {COLORS} from '../../assets/theme/colors';

const WidgetView = ({token, showWidget, generateTokenLoading, widgetUrl}) => {
  return (
    <View style={styles.container}>
      <TopView title={'Widget'} />
      <CurvedView>
        {generateTokenLoading && <SimpleLoader color={COLORS.loginButton} />}
        {showWidget && token && (
          <WebView
            source={{
              uri: widgetUrl,
              headers: {
                'widget-token': token,
              },
            }}
            style={styles.container}
            javaScriptEnabled
            domStorageEnabled
          />
        )}
      </CurvedView>
    </View>
  );
};

export default WidgetView;
