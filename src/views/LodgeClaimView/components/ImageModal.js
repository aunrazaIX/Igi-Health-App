import React from 'react';
import {Image, Modal, StyleSheet, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';
import {icons} from '../../../assets';
import {vw} from '../../../assets/theme/dimension';

const ImageModal = ({image, onClose}) => {
  return (
    <Modal visible transparent statusBarTranslucent>
      <View style={styles.container}>
        <TouchableOpacity onPress={onClose}>
          <Image source={icons.CancelIcon} style={styles.cross} />
        </TouchableOpacity>
        <Image
          style={{height: 100, width: 100, backgroundColor: 'red'}}
          source={{uri: image}}
        />
      </View>
    </Modal>
  );
};
export default ImageModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.black + '88',
  },
  cross: {
    backgroundColor: 'white',

    borderWidth: 1,
    borderRadius: vw * 6,
  },
});
