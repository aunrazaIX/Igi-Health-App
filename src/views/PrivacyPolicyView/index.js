import React from 'react';
import {WebView} from 'react-native-webview';
import SimpleLoader from '../../components/SimpleLoader';
import {COLORS} from '../../assets/theme/colors';
import {CurvedView, TopView} from '../../components';

const PrivacyPolicyView = ({loading, onLoadEnd, webKey}) => {
  return (
    <>
      <TopView title={'Privacy Policy'} />
      <CurvedView>
        {loading && <SimpleLoader color={COLORS.cardBackgroundRed} />}
        <WebView
          key={webKey}
          scrollEnabled
          onLoadEnd={onLoadEnd}
          source={{
            uri: 'https://igilife.com.pk/privacy-policy',
          }}
          style={{flex: 1}}
        />
      </CurvedView>
    </>
  );
};
export default PrivacyPolicyView;
