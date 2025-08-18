import {Image, StyleSheet, View} from 'react-native';
import {vh, vw} from '../../assets/theme/dimension';
import AileronBold from '../AileronBold';
import {icons} from '../../assets';

const NoDataView = ({
  name,
  iconStyle,
  text,
}: {
  name?: string | number;
  iconStyle?: any;
  text?: any;
}) => {
  return (
    <View style={styles.noDataView}>
      <Image style={[styles.noDataIcon, iconStyle]} source={icons.noData} />
      <AileronBold style={[styles.noDataText, text]} name={name} />
    </View>
  );
};

export default NoDataView;

const styles = StyleSheet.create({
  noDataIcon: {
    width: vw * 30,
    height: vh * 4,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  noDataText: {
    fontSize: vw * 3,
    marginTop: vh,
  },
  noDataView: {
    paddingVertical: vh,
  },
});
