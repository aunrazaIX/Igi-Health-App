import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from 'react-native';
import React, {useState} from 'react';
import DependentBox from '../DependentBox';
import AileronRegular from '../AileronRegular';
import AileronBold from '../AileronBold';
import {icons} from '../../assets';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';

type Patient = {
  id: number;
  name: string;
};
type SelectProps = {
  selectData: Patient[];
  selectLabel?: string;
  selectPlaceholder: string;
};

const Select: React.FC<SelectProps> = ({
  selectData,
  selectLabel,
  selectPlaceholder,
}) => {
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleSelect = (item: Patient) => {
    setSelectedPatient(item);
    setDropdownVisible(false);
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
              name={selectedPatient?.name || selectPlaceholder}
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
          <FlatList
            data={selectData}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                style={styles.dropdownItem}
                onPress={() => handleSelect(item)}>
                <AileronBold name={item.name} style={styles.listText} />
              </TouchableOpacity>
            )}
          />
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
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 12,
    marginTop: 4,
    backgroundColor: COLORS.white,
    elevation: 3,
    zIndex: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {width: 0, height: 2},
    shadowRadius: 3,
  },
  dropdownItem: {
    padding: 12,
    borderBottomWidth: 2,
    borderBottomColor: COLORS.dependentBorder,
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
