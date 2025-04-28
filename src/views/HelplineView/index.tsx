import React from 'react'
import { Container, CurvedView, TopView } from '../../components'
import { ClaimAssistance, ContactInfo, Hotlines } from '../../viewmodels/useHelplineViewModel'
import { ScrollView } from 'react-native';
import { ClaimAssistanceView, ContactInfoView, SingleHelplineView } from './components';
import styles from './styles';

const HelplineView = ({ contactInfo, claimAssistance, hotlines }: {
  contactInfo: ContactInfo;
  claimAssistance: ClaimAssistance[];
  hotlines: Hotlines;
}) => {
  return (
    <Container>
      <TopView title={'Helpline'} />
      <CurvedView containerStyle={styles.container}>
        <ScrollView>
          <ContactInfoView data={contactInfo} />
          <ClaimAssistanceView data={claimAssistance} />
          <SingleHelplineView cities={hotlines?.cities} emails={hotlines?.emails} website={hotlines?.website} />
        </ScrollView>
      </CurvedView>
    </Container>
  )
}

export default HelplineView