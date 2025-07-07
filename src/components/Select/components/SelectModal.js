/* eslint-disable react/no-unstable-nested-components */
import React, {useEffect, useState} from 'react';
import {
  FlatList,
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {COLORS} from '../../../assets/theme/colors';
import {vh, vw} from '../../../assets/theme/dimension';
import AileronBold from '../../AileronBold';
import NoDataView from '../../NoDataView';
import InputField from '../../InputField';
import {universalSearch} from '../../../utils';

const SelectModal = ({
  visible,
  data,
  handleSelect,
  onPressBackDrop,
  showSearch = false,
}) => {
  const [search, setSearch] = useState(null);
  const [filterData, setFilterData] = useState([]);

  useEffect(() => {
    if (search !== null) {
      const delayDebounceFn = setTimeout(() => {
        if (search === '') {
          setFilterData([]);
        } else {
          let searchData = universalSearch(search, ['label', 'value'], data);
          setFilterData(searchData);
        }
      }, 1000);
      return () => {
        clearTimeout(delayDebounceFn);
      };
    }
  }, [search]);

  const renderItem = ({item, index}) => (
    <TouchableOpacity
      activeOpacity={0.8}
      style={styles.optionStyles}
      onPress={() => handleSelect(item)}
      key={index}>
      <AileronBold
        name={
          item?.label && typeof item?.label === 'string'
            ? item?.label?.trim()
            : '--'
        }
        style={styles.listText}
      />
    </TouchableOpacity>
  );

  return (
    <Modal
      animationType="slide"
      statusBarTranslucent
      transparent
      visible={visible}>
      <TouchableWithoutFeedback onPress={onPressBackDrop}>
        <View style={styles.container}>
          <View style={styles.subContainer}>
            {showSearch && (
              <InputField
                value={search}
                onChangeText={setSearch}
                containerStyle={styles.inputContainer}
                inputStyle={styles.inputStyle}
                placeholder="Search here"
              />
            )}
            <FlatList
              ListEmptyComponent={() => <NoDataView name={'No Options'} />}
              data={search ? filterData : data}
              renderItem={renderItem}
              key={'dropDown'}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
export default SelectModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.black + '66',
    justifyContent: 'center',
    alignItems: 'center',
  },
  subContainer: {
    width: '90%',
    maxHeight: '50%',
    borderRadius: vw * 5,
    backgroundColor: COLORS.white,
    paddingVertical: vh * 2,
    paddingHorizontal: vw * 3,
  },
  listText: {
    textAlign: 'left',
    fontSize: vh * 1.7,
        lineHeight : vh*2.5
  },
  optionStyles: {
    backgroundColor: COLORS.grey,
    marginTop: vh,
    paddingVertical: vh * 1.5,
    borderRadius: vw * 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: vh * 6,
  },
  inputStyle: {
    // textAlign: 'center',
    textAlignVertical: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    height: vh * 6.8,
  },
});
