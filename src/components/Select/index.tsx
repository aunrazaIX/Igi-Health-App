/* eslint-disable react-native/no-inline-styles */
import {
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import DependentBox from '../DependentBox';
import AileronRegular from '../AileronRegular';
import AileronBold from '../AileronBold';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import SelectModal from './components/SelectModal';

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
  disabled?: boolean;
  isSearch?: boolean;
  selectContainer: any;
};

const Select: React.FC<SelectProps> = ({
  selectData,
  selectLabel,
  selectPlaceholder,
  value,
  onSelectOption,
  isSearch,
  disabled = false,
  selectContainer,
}) => {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item: Options) => {
    Keyboard.dismiss();
    setDropdownVisible(false);
    if (typeof onSelectOption == 'function') {
      onSelectOption(item);
    }
  };

  return (
    <View style={[styles.selectContainer, selectContainer]}>
      <DependentBox containerStyle={styles.dependentContainer}>
        <AileronBold name={selectLabel} style={styles.Patient} />
        <TouchableOpacity
          disabled={disabled}
          onPress={() => {
            if (disabled) return;
            Keyboard.dismiss();
            setDropdownVisible(!isDropdownVisible);
          }}
          style={[styles.selectBox, disabled && {opacity: 0.5}]}>
          <AileronRegular
            style={[
              styles.selectText,
              {
                color: value ? COLORS.personalValue : COLORS.textGrayShade,
              },
            ]}
            name={value || selectPlaceholder}
          />
          {!disabled && (
            <Image
              style={styles.arrow}
              source={isDropdownVisible ? icons.selectArrowUp : icons.arrowDown}
            />
          )}
        </TouchableOpacity>
      </DependentBox>
      <SelectModal
        showSearch={isSearch}
        visible={isDropdownVisible}
        data={selectData}
        onPressBackDrop={() => setDropdownVisible(false)}
        handleSelect={handleSelect}
      />
    </View>
  );
};

export default Select;

const styles = StyleSheet.create({
  Patient: {
    textAlign: 'left',
    fontSize: vw * 3.6,
    color: COLORS.textBlackShade,
  },
  selectBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: COLORS.textGrayShade,
    fontSize: vw * 3.5,
    marginTop: vh * 0.5,
    lineHeight: vh * 2.2,
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
    // borderWidth: 2,
    // marginBottom: vh * 3,
    // borderWidth: 2,
  },
  dependentContainer: {
    padding: vh * 1.3,
    paddingVertical: vh * 0.9,
  },
});
