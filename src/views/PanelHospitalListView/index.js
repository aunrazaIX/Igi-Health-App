import {View, Image, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, InputField, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AlertModal from '../../components/AlertModal';

const PanelHospitalListView = ({
  data,
  onPressRightTab,
  selectedTabRight,
  goBack,
  searchText,
  setSearchText,
  loading,
  handleMapDirection,
  modalVisible,
  showModal,
}) => {
  const cleanCoordinate = value => {
    if (!value || typeof value !== 'string') return null;
    const match = value.match(/^([\d.]+)\s*°/);
    if (!match) return null;

    const number = parseFloat(match[1]);
    return isNaN(number) ? null : number;
  };

  return (
    <>
      <TopView title={'Discount Centers'} />

      <CurvedView
        containerStyle={
          selectedTabRight === 'map'
            ? styles.curvedMapView
            : styles.curvedListView
        }>
        <View style={styles.infoContainerHeader}>
          {selectedTabRight === 'list' && (
            <InputField
              placeholder="Search Name / Phone / City / Address .."
              placeholderTextColor={COLORS.textGrayShade}
              inputStyle={styles.inputStyle}
              containerStyle={styles.inputFeild}
              value={searchText}
              onChangeText={text => setSearchText(text)}
              rightIcon={icons.searchBlack}
            />
          )}

          <View
            style={
              selectedTabRight === 'map'
                ? styles.infoContainerHeaderRightMap
                : styles.infoContainerHeaderRight
            }>
            <TouchableOpacity
              onPress={() => onPressRightTab('list')}
              style={[
                styles.rightTab,
                selectedTabRight === 'list' && styles.activeTabRight,
              ]}>
              {selectedTabRight === 'list' ? (
                <Image style={styles.listIcon} source={icons.listActive} />
              ) : (
                <Image style={styles.listIcon} source={icons.listIcon} />
              )}

              <AileronBold
                style={[
                  styles.infoContainerHeaderText,
                  selectedTabRight === 'list' && styles.activeTabRightText,
                ]}
                name="List"
                numberOfLines={1}
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.rightTab,
                selectedTabRight === 'map' && styles.activeTabRight,
              ]}
              onPress={() => onPressRightTab('map')}>
              {selectedTabRight === 'map' ? (
                <Image style={styles.listIcon} source={icons.map} />
              ) : (
                <Image style={styles.listIcon} source={icons.mapInactive} />
              )}

              <AileronBold
                style={[
                  styles.infoContainerHeaderText,
                  selectedTabRight === 'map' && styles.activeTabRightText,
                ]}
                name="Map"
                numberOfLines={1}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.infoContainerHeaderTabs}></View>

          {selectedTabRight === 'map' && (
            <View
              style={{
                width: '100%',
                height: vh * 47,
              }}></View>
          )}

          <FlatList
            indicatorStyle="black"
            data={data}
            contentContainerStyle={{
              paddingBottom: vh * 28,
            }}
            keyExtractor={(_, index) => index.toString()}
            showsVerticalScrollIndicator={true}
            renderItem={({item}) => (
              <>
                <DetailsContainer
                  detailsTextLabel={styles.detailsTextLabel}
                  detailsTextValue={styles.detailsTextValue}
                  headerIcon={icons.arrowDirection}
                  data={item}
                  onPress={handleMapDirection}
                />
              </>
            )}
          />
        </View>
        <AlertModal
          title="Notice"
          description={
            'IGI Life Insurance reserves the right to de-panel any listed discount center without prior notice. Additionally, services or discounts at a discount center may be temporarily halted due to unforeseen circumstances.\n\nIf you encounter any issues with a discount center, please contact IGI Life Insurance at 042-34503333 for assistance.'
          }
          modalVisible={modalVisible}
          setModalVisible={showModal}
        />
        {/* <ModalLoading loading={loading} /> */}
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;
