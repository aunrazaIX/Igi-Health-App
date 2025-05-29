/* eslint-disable react-native/no-inline-styles */
import {View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React, {useState} from 'react';
import DependentBox from '../DependentBox';
import AileronRegular from '../AileronRegular';
import AileronBold from '../AileronBold';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import NoDataView from '../NoDataView';

type Options = {
  value: number;
  label: string;
};
type SelectProps = {
  selectData: Options[];
  selectLabel: string;
  value: string;
  selectPlaceholder: string;
  onSelectOption: (item: Options) => void;
};

const Select: React.FC<SelectProps> = ({
  selectData,
  selectLabel,
  selectPlaceholder,
  value,
  onSelectOption,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item: Options) => {
    setDropdownVisible(false);
    if (typeof onSelectOption == 'function') {
      onSelectOption(item);
    }
  };

  return (
    <View style={styles.selectContainer}>
      <DependentBox containerStyle={styles.dependentContainer}>
        <AileronRegular name={selectLabel} style={styles.Patient} />
        <TouchableOpacity
          onPress={() => setDropdownVisible(!isDropdownVisible)}>
          <View style={styles.selectBox}>
            <AileronBold
              style={styles.selectText}
              name={value || selectPlaceholder}
            />
            <Image
              style={styles.arrow}
              source={isDropdownVisible ? icons.selectArrowUp : icons.arrowDown}
            />
          </View>
        </TouchableOpacity>
      </DependentBox>

      {isDropdownVisible && (
        <View style={styles.dropdown}>
          {selectData?.length > 0 ? (
            selectData?.map((item, index) => (
              <TouchableOpacity
                key={item?.label}
                style={[
                  styles.dropdownItem,
                  index !== selectData?.length - 1 && {
                    borderBottomWidth: 1,
                    borderColor: COLORS.black + '22',
                  },
                ]}
                onPress={() => handleSelect(item)}>
                <AileronBold name={item?.label} style={[styles.listText]} />
              </TouchableOpacity>
            ))
          ) : (
            <NoDataView name={'No Options'} />
          )}
        </View>
      )}
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  Patient: {
    textAlign: 'left',
    fontSize: vw * 3.6,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: COLORS.personalValue,
    fontSize: vh * 1.7,
  },
  arrow: {
    width: vh * 2,
    height: vh * 2,
    marginTop: -vh * 1.5,
  },
  dropdown: {
    borderRadius: vw * 2,
    backgroundColor: COLORS.white,
    elevation: 3,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  dropdownItem: {
    paddingVertical: vh * 1.5,
    paddingHorizontal: vw * 3,
  },
  listText: {
    textAlign: 'left',
    fontSize: vh * 1.7,
  },
  selectContainer: {
    width: '100%',
  },
  dependentContainer: {
    padding: vw * 3.5,
  },
});
