import {View, Image, TouchableOpacity, FlatList, Text} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, InputField, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import AlertModal from '../../components/AlertModal';
import NoDataView from '../../components/NoDataView';
import MapView, {Callout, Marker} from 'react-native-maps';
import SimpleLoader from '../../components/SimpleLoader';

const PanelHospitalListView = ({
  data,
  onPressRightTab,
  selectedTabRight,
  searchText,
  setSearchText,
  loading,
  handleMapDirection,
  modalVisible,
  position,
  cleanCoordinate,
  openInGoogleMaps,
  showModal,
}) => {
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
          {selectedTabRight === 'list' && (
            <FlatList
              indicatorStyle="black"
              data={data}
              ListEmptyComponent={
                !loading && <NoDataView name={'No Data Found'} />
              }
              contentContainerStyle={{
                paddingBottom: vh * 28,
              }}
              ListFooterComponent={
                loading && <SimpleLoader color={COLORS.cardBackgroundRed} />
              }
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
          )}
          {selectedTabRight === 'map' && (
            <View
              style={{
                width: '100%',
                height: vh * 58,
              }}>
              <MapView
                showsUserLocation
                key={selectedTabRight}
                style={{flex: 1}}
                region={{
                  latitude: position.latitude,
                  longitude: position.longitude,
                  latitudeDelta: position.latitudeDelta,
                  longitudeDelta: position.longitudeDelta,
                }}>
                {data?.map((item, index) => {
                  const latitude = cleanCoordinate(item?.latitude ?? '');
                  const longitude = cleanCoordinate(item?.longitude ?? '');
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
        </View>
        <AlertModal
          title="Notice"
          description={
            'IGI Life Insurance reserves the right to de-panel any listed discount center without prior notice. Additionally, services or discounts at a discount center may be temporarily halted due to unforeseen circumstances.\n\nIf you encounter any issues with a discount center, please contact IGI Life Insurance at 042-34503333 for assistance.'
          }
          modalVisible={modalVisible}
          setModalVisible={showModal}
        />
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;
