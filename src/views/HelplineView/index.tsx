import React from 'react';
import {Container, CurvedView, TopView} from '../../components';
import {
  ClaimAssistance,
  ContactInfo,
  Hotlines,
} from '../../viewmodels/useHelplineViewModel';
import {ScrollView} from 'react-native';
import {
  ClaimAssistanceView,
  ContactInfoView,
  SingleHelplineView,
} from './components';
import styles from './styles';

const HelplineView = ({
  contactInfo,
  claimAssistance,
  hotlines,
  goBack,
  onPress
}: {
  contactInfo: ContactInfo;
  claimAssistance: ClaimAssistance[];
  hotlines: Hotlines;
  goBack: () => void;
  onPress : ()=>void
}) => {
  return (
    <ScrollView>
      <TopView onPressBack={goBack} title={'Helpline'} />
      <CurvedView containerStyle={styles.container}>
        <ContactInfoView onPress={onPress} data={contactInfo} />
        <ClaimAssistanceView data={claimAssistance} />
        <SingleHelplineView
          cities={hotlines?.cities}
          emails={hotlines?.emails}
          website={hotlines?.website}
        />
      </CurvedView>
    </ScrollView>
  );
};

export default HelplineView;
