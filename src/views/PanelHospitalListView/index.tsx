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
import {AileronBold, CurvedView, InputField, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh, vw} from '../../assets/theme/dimension';
import {PanelHospitalGroup} from '../../viewmodels/usePanelHospitalListViewModel';
import {COLORS} from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import MapView, {Callout, Marker} from 'react-native-maps';

type HomeViewProps = {
  data: PanelHospitalGroup[];
  selectedTab: string;
  selectedTabRight: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  goBack: () => void;
  searchText: any;
  setSearchText: any;
  loading: any;
  handleMapDirection: any;
  position: any;
};

const PanelHospitalListView: React.FC<HomeViewProps> = ({
  data,
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedTabRight,
  goBack,
  searchText,
  setSearchText,
  loading,
  handleMapDirection,
  position,
}) => {
  console.log(position, 'positionss');
  console.log(data, 'usman');

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
      <TopView
        title={
          selectedTab === 'PanelHospitals'
            ? 'Panel Hospital List'
            : 'Discount Centers'
        }
      />

      <CurvedView
        containerStyle={selectedTabRight === 'map' && styles.curvedMapView}>
        <View style={styles.infoContainerHeader}>
          {selectedTabRight === 'list' && (
            <InputField
              placeholder="Search Name / Phone / City / Address .."
              placeholderTextColor={COLORS.textGrayShade}
              inputStyle={styles.inputStyle}
              containerStyle={styles.inputFeild}
              value={searchText}
              onChangeText={text => setSearchText(text)}
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

          <View style={styles.infoContainerHeaderTabs}>
            {/* <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'PanelHospitals' && styles.activeTab,
              ]}
              onPress={() => onPressTab('PanelHospitals')}>
              {selectedTab === 'PanelHospitals' ? (
                <Image
                  source={icons.hospital}
                  style={{width: vw * 7, height: vw * 7}}
                />
              ) : (
                <Image
                  style={{width: vw * 7, height: vw * 7}}
                  source={icons.hospitalInactive}
                />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'PanelHospitals' && styles.activeTabText,
                ]}
                name="Panel Hospitals"
              />
            </TouchableOpacity> */}
            {/* 
            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'DiscountedCenters' && styles.activeTab,
              ]}
              onPress={() => onPressTab('DiscountedCenters')}>
              {selectedTab === 'DiscountedCenters' ? (
                <Image
                  style={{width: vw * 6, height: vh * 3}}
                  source={icons.labsActive}
                />
              ) : (
                <Image
                  style={{width: vw * 6, height: vh * 3}}
                  source={icons.labsInactive}
                />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'DiscountedCenters' && styles.activeTabText,
                ]}
                name="Discounted Centers"
              />
            </TouchableOpacity> */}
          </View>

          {selectedTabRight === 'map' && (
            <View
              style={{
                width: '100%',
                height: vh * 57,
                // marginHorizontal: vw * 2,
                // flex: 1,

                // marginTop: vh * 2,
              }}>
              <MapView
                // showsUserLocation={true}
                showsUserLocation
                style={{flex: 1}}
                region={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: position.latitudeDelta,
                  longitudeDelta: position.longitudeDelta,
                }}>
                {data.map((item, index) => {
                  const latitude = cleanCoordinate(item.longitude ?? '');
                  const longitude = cleanCoordinate(item.latitude ?? '');
                  if (latitude === null || longitude === null) {
                    return null;
                  }

                  const addressObj = item.items.find(
                    i => i.label === 'Address:',
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

          {((selectedTab === 'PanelHospitals' && selectedTabRight === 'list') ||
            (selectedTab === 'DiscountedCenters' &&
              selectedTabRight === 'list')) && (
            <FlatList
              data={data}
              contentContainerStyle={{paddingBottom: vh * 15}}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({item}) => (
                <>
                  <DetailsContainer
                    detailsTextLabel={styles.detailsTextLabel}
                    detailsTextValue={styles.detailsTextValue}
                    headerIcon={
                      selectedTab === 'PanelHospitals'
                        ? icons.arrowDirection
                        : [icons.arrowDirection]
                    }
                    data={item}
                    onPress={handleMapDirection}
                  />
                </>
              )}
            />
          )}
        </View>

        <ModalLoading loading={loading} />
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;

const style = StyleSheet.create({});
