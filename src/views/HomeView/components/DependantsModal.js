import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';
import {vh, vw} from '../../../assets/theme/dimension';
import {icons} from '../../../assets';
import {AileronBold, AileronRegular} from '../../../components';
import {formatName} from '../../../utils';

const DependantsModal = ({show, dependants, onClose}) => {
  return (
    <Modal animationType="fade" visible={show} transparent statusBarTranslucent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <AileronBold style={styles.title} name={'List of Dependents'} />
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                borderBottomWidth: 1,
                borderColor: COLORS.black + 44,
              }}>
              <AileronBold
                style={{width: '68%', textAlign: 'left', fontSize: vw * 3.25}}
                name={'Name'}
              />
              <AileronBold
                style={{width: '22%', textAlign: 'center', fontSize: vw * 3.25}}
                name={'Relation'}
              />
              <AileronBold
                style={{textAlign: 'center', width: '10%', fontSize: vw * 3.25}}
                name={'Age'}
              />
            </View>

            {dependants?.length > 0 &&
              dependants?.map((person, index) => (
                <View
                  style={{
                    flexDirection: 'row',
                    width: '100%',
                  }}
                  key={index}>
                  <AileronRegular
                    style={{
                      width: '68%',
                      textAlign: 'left',
                      fontSize: vw * 3.25,
                    }}
                    name={`${
                      typeof person?.Policy_Insured_Name === 'string'
                        ? formatName(person.Policy_Insured_Name.trim())
                        : person?.Policy_Insured_Name.trim()
                    }`}
                  />
                  <AileronRegular
                    style={{
                      width: '22%',
                      textAlign: 'center',
                      fontSize: vw * 3.25,
                    }}
                    name={person?.Policy_Insured_Relaion}
                  />
                  <AileronRegular
                    style={{
                      width: '10%',
                      textAlign: 'center',
                      fontSize: vw * 3.25,
                    }}
                    name={person?.Policy_Insured_Age}
                  />
                </View>
              ))}
          </View>
        </View>
      </TouchableWithoutFeedback>
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
    color: COLORS.cardBackgroundRed,
  },
  dependantsName: {
    textAlign: 'left',
    marginTop: vh * 0.5,
    fontSize: vw * 3,
  },
});
