import {
  View,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, InputField, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import ProvinceTab from '../../components/provinceTab';
import NoDataView from '../../components/NoDataView';
import SimpleLoader from '../../components/SimpleLoader';
import AlertModal from '../../components/AlertModal';

const HospitalsView = ({
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedMapTab,
  selectedTabRight,
  onPressMapTab,
  goBack,
  searchText,
  data,
  setSearchText,
  hospitalLoading,
  tabChanging,
  handleMapDirection,
  position,
  modalVisible,
  setModalVisible,
}) => {
  const cleanCoordinate = value => {
    if (!value || typeof value !== 'string') return null;

    const match = value.match(/^([\d.]+)\s*°/);
    if (!match) return null;

    const number = parseFloat(match[1]);
    return isNaN(number) ? null : number;
  };

  const openInGoogleMaps = (latitude, longitude) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <>
      <TopView title="Network Hospitals" type="default" />
      <CurvedView
        containerStyle={selectedTabRight === 'map' && styles.cruvedMapView}>
        {/* <KeyboardAwareScrollView> */}
        <View>
          <View style={styles.mapTextContainer}>
            <View style={styles.moreFilter}>
              {selectedTabRight === 'list' && (
                <InputField
                  value={searchText}
                  placeholder="Search City / Address / Town .."
                  placeholderTextColor={COLORS.textGrayShade}
                  onChangeText={text => setSearchText(text)}
                  searchFieldRight={styles.searchFieldRight}
                  searchFieldRightIcon={styles.searchFieldRightIcon}
                  inputStyle={styles.inputStyle}
                  containerStyle={styles.inputFeild}
                  rightIcon={icons.searchBlack}
                />
              )}
            </View>
          </View>
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

          {selectedTabRight === 'list' && (
            <View style={styles.mapTabsContainer}>
              <FlatList
                indicatorStyle="black"
                data={[
                  'All',
                  'Sindh',
                  'Punjab',
                  'Balochistan',
                  'KPK',
                  'Islamabad',
                  'GILGIT - BALTISTAN',
                ]}
                horizontal
                showsHorizontalScrollIndicator={true}
                contentContainerStyle={styles.mapTabsContainer}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <ProvinceTab
                    onPressMapTab={onPressMapTab}
                    selectedMapTab={selectedMapTab}
                    provinceName={item}
                    icon={true}
                  />
                )}
              />
            </View>
          )}
        </View>

        {selectedTabRight === 'list' && (
          <>
            {tabChanging ? (
              <SimpleLoader color={COLORS.black} />
            ) : (
              <FlatList
                indicatorStyle="black"
                data={data}
                keyExtractor={(_, index) => index.toString()}
                ListEmptyComponent={() => {
                  if (tabChanging) {
                    return (
                      <View style={{padding: 20, alignItems: 'center'}}>
                        <SimpleLoader
                          size="large"
                          color={COLORS.cardBackgroundBlue}
                        />
                      </View>
                    );
                  }
                  return hospitalLoading ||
                    tabChanging ||
                    data.length !== 0 ? null : (
                    <NoDataView name="No hospitals found" />
                  );
                }}
                renderItem={({item}) => (
                  <>
                    <DetailsContainer
                      detailsTextLabel={styles.detailsTextLabel}
                      detailsTextValue={styles.detailsTextValue}
                      headerIcon={[icons.arrowDirection]}
                      data={item}
                      onPress={handleMapDirection}
                    />
                  </>
                )}
              />
            )}
          </>
        )}

        {selectedTabRight === 'map' && (
          <View
            style={{
              width: '100%',
              height: vh * 58,
              // marginHorizontal: vw * 10,
              // flex: 1,
              marginTop: vh * 2,
            }}></View>
        )}
        <AlertModal
          title="Notice"
          description={
            'IGI Life Insurance reserves the right to de-panel any listed network hospital without prior notice. Additionally, services at a network hospital may be temporarily halted due to unforeseen circumstances.\n\nIf you encounter any issues with a network hospital, please contact IGI Life Insurance at 042-34503333 for assistance.'
          }
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
        />
      </CurvedView>
    </>
  );
};

export default HospitalsView;

const style = StyleSheet.create({
  detailsTextLabel: {
    width: '20%',
    textAlign: 'left',
  },

  detailsTextValue: {
    width: '60%',
    textAlign: 'right',
  },

  detailsText: {},
  mapText: {
    fontSize: vw * 5,
    color: COLORS.black,
  },
  mapTextColor: {
    color: COLORS.cardBackgroundRed,
    fontSize: vh * 2.5,
  },
  mapTabText: {
    fontSize: vh * 1.5,
    color: COLORS.black,
  },
  mapTabTextActive: {
    fontSize: vh * 1.4,
    color: COLORS.white,
  },
});
