import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {vh, vw} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import {AileronBold, AileronSemiBold} from '../../../components';
import {icons} from '../../../assets';

type InfoItem = {
  label: string;
  value: string;
};

type BoxProps = {
  data: any;
  onPressDelete: () => void;
  onPressEdit: () => void;
};

const Box: React.FC<BoxProps> = ({data, onPressDelete, onPressEdit}) => {
  const formatValue = (value: string) => {
    if (!isNaN(Number(value)) && value.trim() !== '') {
      return Number(value).toLocaleString();
    }
    return value;
  };

  return (
    <View style={styles.boxContainer}>
      <View style={styles.header}>
        <Image source={data?.icon} style={styles.avatar} />
        <AileronBold style={styles.headerText} name={data?.sectionTitle} />

        {onPressDelete && (
          <TouchableOpacity onPress={onPressEdit} style={styles.button}>
            <Image source={icons.edit} style={styles.buttonIcon} />
          </TouchableOpacity>
        )}

        {onPressEdit && (
          <TouchableOpacity onPress={onPressDelete} style={styles.button}>
            <Image source={icons.delete} style={styles.buttonIcon} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.details}>
        {data?.info?.map((_item: InfoItem, index: number) => (
          <View style={styles.field} key={index}>
            <AileronSemiBold name={_item?.label} style={styles.detailLabel} />
            <AileronSemiBold
              name={
                _item?.label.toLowerCase().includes('amount')
                  ? formatValue(_item?.value)
                  : _item?.value
              }
              style={styles.detailvalue}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default Box;

const styles = StyleSheet.create({
  boxContainer: {
    padding: vh,
    width: '100%',
    // paddingVertical: vh * 2,
    // marginVertical: vh * 1.5,
    borderRadius: vh * 2,
    elevation: 3,
    backgroundColor: COLORS.white,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
  },
  avatar: {
    resizeMode: 'contain',
    width: vh * 4.5,
    height: vh * 4.5,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: vw * 2,
  },
  headerText: {
    flex: 1,
    textAlign: 'left',
    fontSize: vh * 1.8,
    color: COLORS.insuredPrice,
  },
  details: {
    marginTop: 10,
    borderTopWidth: 2,
    borderTopColor: COLORS.dependentBorder,

    paddingTop: vh * 1,
    rowGap: vh,
  },
  detailLabel: {
    fontSize: vh * 1.6,
    color: COLORS.personalLabel,
  },
  detailvalue: {
    fontSize: vh * 1.6,
    color: COLORS.personalValue,
    maxWidth: vw * 50,
  },
  field: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {height: vw * 6, width: vw * 6},
  buttonIcon: {
    height: vw * 6,
    width: vw * 6,
    resizeMode: 'contain',
  },
});
