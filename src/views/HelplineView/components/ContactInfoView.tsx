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

const ContactInfoView = ({
  data,
  onPress,
}: {
  data: ContactInfo;
  onPress: () => void;
}) => {
  return (
    <View style={styles.box}>
      <AileronSemiBold style={styles.title} name="Contact information" />
      <AileronBold style={styles.subtitle} name="Approval Center:" />
      <AileronSemiBold style={styles.name} name={'Tel : +92-(042) 34503333'} />
      <AileronSemiBold
        style={styles.subtitle}
        name={`Email: approvalsubmission.pakistan@igi.com.pk `}
      />

      <AileronBold style={styles.subHeading} name={`Customer Services:`} />
      <AileronSemiBold
        style={styles.subHeading}
        name={`UAN : 021-111-111-711`}
      />
      <AileronSemiBold
        style={styles.subHeading}
        name={`WhatsApp : +92-300-8208489`}
      />
      <AileronSemiBold
        style={styles.subHeading}
        name={`Email: corporate.services@igi.com.pk`}
      />
      <AileronBold style={styles.address} name={'Address:'} />
      <AileronSemiBold
        name={`7th Floor, The Forum, Block -9, Khayaban – e - Jami, Clifton, Karachi, Pakistan.`}
        style={styles.addressDetail}
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
