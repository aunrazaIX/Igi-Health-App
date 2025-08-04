import React from 'react';
import {CurvedView, TopView} from '../../components';
import {ContactInfoView} from './components';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';

const HelplineView = ({contactInfo, onPress}) => {
  return (
    <ScrollView>
      <TopView title={'Helplines'} />
      <CurvedView containerStyle={styles.container}>
        <ContactInfoView onPress={onPress} data={contactInfo} />
      </CurvedView>
    </ScrollView>
  );
};

export default HelplineView;
