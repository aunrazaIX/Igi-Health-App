import React from 'react';
import {Image, TouchableOpacity, View} from 'react-native';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
} from '../../../components';
import {icons} from '../../../assets';
import styles from '../styles';

const ContactInfoView = ({onPress}) => {
  return (
    <View style={styles.box}>
      <AileronBold style={styles.title} name="Contact information" />
      <AileronSemiBold style={styles.subtitle} name="Approval Center:" />
      <AileronRegular
        style={styles.headingText}
        name={'Tel : +92-(042) 34503333'}
      />
      <AileronRegular
        style={styles.headingText}
        name={`Email: approvalsubmission.pakistan@igi.com.pk `}
      />

      <AileronSemiBold style={styles.subHeading} name={`Customer Services:`} />
      <AileronRegular
        style={styles.headingText}
        name={`UAN : 021-111-111-711`}
      />
      <AileronRegular
        style={styles.headingText}
        name={`WhatsApp : +92-300-8208489`}
      />
      <AileronRegular
        style={styles.headingText}
        name={`Email: corporate.services@igi.com.pk`}
      />
      <AileronSemiBold style={styles.address} name={'Address:'} />
      <AileronRegular
        name={`7th Floor, The Forum, Block -9, Khayaban – e - Jami, Clifton, Karachi, Pakistan.`}
        style={styles.headingText}
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity
          onPress={() => onPress('call', '+924234503333')}
          style={styles.actionBtn}>
          <Image source={icons.call} style={styles.icon} />
          <AileronRegular name="Call" style={styles.callTittle} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress('mail', 'corporate.services@igi.com.pk')}
          style={styles.actionBtn}>
          <Image source={icons.email} style={styles.icon} />
          <AileronRegular name="Email" style={styles.callTittle} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => onPress('map', 'IGI Life Karachi')}
          style={styles.actionBtn}>
          <Image source={icons.location} style={styles.icon} />
          <AileronRegular name="Location" style={styles.callTittle} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ContactInfoView;
