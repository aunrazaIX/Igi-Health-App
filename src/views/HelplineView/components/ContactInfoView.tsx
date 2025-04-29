import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
} from '../../../components';
import {icons} from '../../../assets';
import styles from '../styles';
import {ContactInfo} from '../../../viewmodels/useHelplineViewModel';

const ContactInfoView = ({data}: {data: ContactInfo}) => {
  return (
    <View style={styles.box}>
      <AileronSemiBold style={styles.title} name="Contact information" />
      <AileronRegular
        style={styles.subtitle}
        name="Operations & Customer Services"
      />
      <AileronSemiBold style={styles.name} name={data?.name} />
      <AileronSemiBold style={styles.subtitle} name={`Tel: ${data?.tel}`} />
      <AileronSemiBold style={styles.subHeading} name={`Fax: ${data?.fax}`} />
      <AileronBold
        style={styles.subHeading}
        name={`Emergency & Panel Hospital Approvals\nTel: ${data?.emergencyTel}`}
      />
      <AileronSemiBold
        style={styles.subHeading}
        name={`For Claims Tel: ${data?.claimsTel}`}
      />
      <AileronBold style={styles.address} name={'Address:'} />
      <AileronSemiBold name={data?.address} />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionBtn}>
          <Image source={icons.call} style={styles.icon} />
          <AileronRegular name="Call" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionBtn}>
          <Image source={icons.mail} style={styles.icon} />
          <AileronRegular name="Mail" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.actionBtn, {paddingHorizontal: 18}]}>
          <Image source={icons.location} style={styles.icon} />
          <AileronRegular name="Location" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactInfoView;
