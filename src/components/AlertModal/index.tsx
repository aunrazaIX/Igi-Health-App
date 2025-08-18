import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  Image,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import {vh} from '../../assets/theme/dimension';
import {icons} from '../../assets';
import AileronBold from '../AileronBold';
import AileronSemiBold from '../AileronSemiBold';
import AileronRegular from '../AileronRegular';

interface AlertModalProps {
  title: string;
  description: string;
  modalVisible: boolean;
  setModalVisible: (modalVisible: boolean) => void;
}

const AlertModal: React.FC<AlertModalProps> = ({
  title,
  description,
  modalVisible,
  setModalVisible,
  subtitle,
}) => {
  return (
    <Modal
      animationType="fade"
      statusBarTranslucent
      transparent
      visible={modalVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity
            style={styles.close}
            onPress={() => setModalVisible(false)}>
            <Image source={icons.CancelIcon} style={styles.personalFrameIMG} />
          </TouchableOpacity>
          <AileronBold style={styles.textStyle} name={title} />
          {subtitle && (
            <AileronRegular name={subtitle} style={styles.subtitle} />
          )}
          <AileronRegular style={styles.descriptionStyle} name={description} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black + '99',
  },
  personalFrameIMG: {
    width: vh * 4,
    height: vh * 4,
  },
  close: {
    top: 5,
    right: 5,
    paddingVertical: vh,
    paddingHorizontal: vh,
    alignItems: 'center',
    position: 'absolute',
  },
  modalView: {
    margin: vh * 2,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: vh * 3,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  textStyle: {
    color: COLORS.black,
    fontSize: vh * 2,
    textAlign: 'center',
    marginBottom: vh * 1.2,
  },
  descriptionStyle: {
    color: COLORS.black,
    textAlign: 'left',
    fontSize: vh * 1.6,
    alignSelf: 'flex-start',
  },
  subtitle: {
    color: COLORS.black,
    fontSize: vh * 1.6,
    textAlign: 'left',
    marginBottom: vh * 1.2,
    alignSelf: 'flex-start',
  },
});

export default AlertModal;
