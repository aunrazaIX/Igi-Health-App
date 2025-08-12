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
          <Text style={styles.textStyle}>{title}</Text>
          <Text style={styles.descriptionStyle}>{description}</Text>
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
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: vh * 1.2,
  },
  descriptionStyle: {
    color: COLORS.black,
    fontWeight: '400',
    textAlign: 'left',
    fontSize: vh * 1.6,
  },
});

export default AlertModal;
