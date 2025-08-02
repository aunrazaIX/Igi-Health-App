import React from 'react';
import {Modal, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';
import {vh, vw} from '../../../assets/theme/dimension';
import {icons} from '../../../assets';
import {AileronBold, AileronRegular} from '../../../components';

const DependantsModal = ({show, dependants, onClose}) => {
  return (
    <Modal animationType="fade" visible={show} transparent statusBarTranslucent>
      <View style={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.row}>
            <AileronBold style={styles.title} name={'List of Dependents'} />
            <TouchableOpacity onPress={onClose} style={styles.close}>
              <Image source={icons.errorPopup} style={styles.closeIcon} />
            </TouchableOpacity>
          </View>
          {dependants?.length > 0 &&
            dependants?.map((person, index) => (
              <AileronRegular
                style={styles.dependantsName}
                key={index}
                name={`${
                  typeof person?.Policy_Insured_Name === 'string'
                    ? person.Policy_Insured_Name.trim()
                    : person?.Policy_Insured_Name
                }: ${person?.Policy_Insured_Age}`}
              />
            ))}
        </View>
      </View>
    </Modal>
  );
};
export default DependantsModal;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black + '88',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '85%',
    backgroundColor: COLORS.white,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 3,
    borderRadius: vw * 5,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  close: {
    height: vh * 4,
    width: '20%',
    alignSelf: 'flex-end',
  },
  closeIcon: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  title: {
    fontSize: vw * 4,
  },
  dependantsName: {
    textAlign: 'left',
    marginTop: vh * 0.5,
    fontSize: vw * 3,
  },
});
