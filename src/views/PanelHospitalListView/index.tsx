import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, InputField, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh, vw} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import {fonts} from '../../assets/fonts';

type HomeViewProps = {
  data: [][];
  selectedTab: string;
  selectedTabRight: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  goBack: () => void;
};

const PanelHospitalListView: React.FC<HomeViewProps> = ({
  data,
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedTabRight,
  goBack,
}) => {
  return (
    <>
      <TopView
        title={
          selectedTab === 'PanelHospitals'
            ? 'Panel Hospital List'
            : 'Discounted Centers'
        }
        HeaderIcon={icons.searchWhite}
        HeaderSecondIcon={null}
        onPressBack={goBack}
      />

      <CurvedView>
        <View style={styles.infoContainerHeader}>
          <View style={styles.infoContainerHeaderRight}>
            <TouchableOpacity
              onPress={() => onPressRightTab('list')}
              style={[
                styles.rightTab,
                selectedTabRight === 'list' && styles.activeTabRight,
              ]}>
              {selectedTabRight === 'list' ? (
                <Image source={icons.listActive} />
              ) : (
                <Image source={icons.listIcon} />
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
                <Image source={icons.map} />
              ) : (
                <Image source={icons.mapInactive} />
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
            <TouchableOpacity
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
                <Image source={icons.hospitalInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'PanelHospitals' && styles.activeTabText,
                ]}
                name="Panel Hospitals"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'DiscountedCenters' && styles.activeTab,
              ]}
              onPress={() => onPressTab('DiscountedCenters')}>
              {selectedTab === 'DiscountedCenters' ? (
                <Image style={{width:vw*6 , height: vh*3}} source={icons.labsActive} />
              ) : (
                <Image style={{width:vw*6 , height: vh*3}}  source={icons.labsInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'DiscountedCenters' && styles.activeTabText,
                ]}
                name="Discounted Centers"
              />
            </TouchableOpacity>
          </View>

          {/*rendering list card based on list tab active  */}
          {selectedTabRight === 'map' && (
            <View>
              <View>
                <InputField
                  searchFieldRight={styles.searchFieldRight}
                  searchFieldRightIcon={styles.searchFieldRightIcon}
                  inputStyle={styles.inputStyle}
                  searchIcon={icons.searchBlack}
                  containerStyle={styles.inputFeild}
                />
              </View>
            </View>
          )}

          {((selectedTab === 'PanelHospitals' && selectedTabRight === 'list') ||
            (selectedTab === 'DiscountedCenters' &&
              selectedTabRight === 'list')) && (
            <FlatList
              data={data}
              contentContainerStyle={{paddingBottom: vh * 10}}
              keyExtractor={(_, index) => index.toString()}
              renderItem={({item}) => (
                <DetailsContainer
                  detailsText={styles.detailsText}
                  detailsTextLabel={styles.detailsTextLabel}
                  detailsTextValue={styles.detailsTextValue}
                  headerIcon={
                    selectedTab === 'PanelHospitals' && icons.arrowDirection
                  }
                  data={item}
                />
              )}
            />
          )}
        </View>
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;

const style = StyleSheet.create({});
