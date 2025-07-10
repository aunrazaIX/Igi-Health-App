import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import React from 'react';
import {
  AileronBold,
  AileronRegular,
  CurvedView,
  InputField,
  TopView,
} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import ProvinceTab from '../../components/provinceTab';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import ModalLoading from '../../components/ModalLoading';
import NoDataView from '../../components/NoDataView';
import SimpleLoader from '../../components/SimpleLoader';
import MapView, {Callout, Marker} from 'react-native-maps';

type HospitalsViewProps = {
  selectedTab: string;
  selectedTabRight: string;
  selectedMapTab: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  onPressMapTab: (tab: string) => void;
  goBack: () => void;
  searchText: any;
  setSearchText: any;
  data: any;
  hospitalLoading: boolean;
  tabChanging: boolean;
  handleMapDirection: any;
  position: any;
};

const HospitalsView: React.FC<HospitalsViewProps> = ({
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
}) => {
  // console.log(data, 'dataaaaaaafeta');

  const cleanCoordinate = (value: string): number | null => {
    if (!value || typeof value !== 'string') return null;

    const match = value.match(/^([\d.]+)\s*°/);
    if (!match) return null;

    const number = parseFloat(match[1]);
    return isNaN(number) ? null : number;
  };

  const openInGoogleMaps = (latitude: number, longitude: number) => {
    const url = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(url);
  };

  return (
    <>
      <TopView title="Network Hospitals" type="default" />
      <CurvedView
        containerStyle={selectedTabRight === 'map' && styles.cruvedMapView}>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.mapTextContainer}>
              <View style={styles.moreFilter}>
                {selectedTabRight === 'list' && (
                  <InputField
                    value={searchText}
                    placeholder="Search city / address / town .."
                    placeholderTextColor={COLORS.textGrayShade}
                    onChangeText={text => setSearchText(text)}
                    searchFieldRight={styles.searchFieldRight}
                    searchFieldRightIcon={styles.searchFieldRightIcon}
                    inputStyle={styles.inputStyle}
                    containerStyle={styles.inputFeild}
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
                  data={['Sindh', 'Punjab', 'Balochistan', 'KPK']}
                  horizontal
                  showsHorizontalScrollIndicator={false}
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
              }}>
              <MapView
                showsUserLocation
                style={{flex: 1}}
                region={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: position.latitudeDelta,
                  longitudeDelta: position.longitudeDelta,
                }}>
                {data.map((item: any, index: any) => {
                  const latitude = cleanCoordinate(item.latitude ?? '');
                  const longitude = cleanCoordinate(item.longitude ?? '');
                  if (latitude === null || longitude === null) {
                    return null;
                  }

                  const addressObj = item.items.find(
                    (i: any) => i.label === 'Address:',
                  );
                  const address = addressObj ? addressObj.value : '';
                  return (
                    <Marker key={index} coordinate={{latitude, longitude}}>
                      <Callout
                        onPress={() => openInGoogleMaps(latitude, longitude)}>
                        <TouchableOpacity style={styles.calloutContainer}>
                          <View style={styles.callout}>
                            <Text style={styles.calloutTitle}>
                              {item.headerLabel}
                            </Text>
                            <Text style={styles.calloutDescription}>
                              {address}
                            </Text>
                            <Text style={styles.calloutLink}>
                              Tap to open in Google Maps
                            </Text>
                          </View>
                        </TouchableOpacity>
                      </Callout>
                    </Marker>
                  );
                })}
              </MapView>
            </View>
          )}
        </KeyboardAwareScrollView>

        <ModalLoading loading={hospitalLoading} />
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
