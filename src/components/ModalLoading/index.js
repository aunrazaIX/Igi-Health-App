import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import {COLORS} from '../../assets/theme/colors';
import SimpleLoader from '../SimpleLoader';

const ModalLoading = ({loading = false}) => {
  return (
    <Modal
      animationType="slide"
      visible={loading}
      transparent
      statusBarTranslucent>
      <View style={styles.container}>
        <SimpleLoader color={COLORS.white} />
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black + '88',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ModalLoading;
