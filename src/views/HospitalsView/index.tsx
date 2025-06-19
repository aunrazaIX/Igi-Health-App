import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
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
};

const PanelHospitalListView: React.FC<HospitalsViewProps> = ({
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
}) => {
  return (
    <>
      <TopView title="Hospitals" />
      <CurvedView>
        <KeyboardAwareScrollView>
          <View>
            <View style={styles.mapTextContainer}>
              <View style={styles.moreFilter}>
                <InputField
                  value={searchText}
                  placeholder="search city / address / town .."
                  placeholderTextColor={COLORS.textGrayShade}
                  onChangeText={text => setSearchText(text)}
                  searchFieldRight={styles.searchFieldRight}
                  searchFieldRightIcon={styles.searchFieldRightIcon}
                  inputStyle={styles.inputStyle}
                  containerStyle={styles.inputFeild}
                />
              </View>
            </View>
            <View style={styles.infoContainerHeaderRight}>
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
            |
          </View>

          <FlatList
            data={data}
            // contentContainerStyle={{paddingBottom: vh * 2}}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => (
              <>
                <DetailsContainer
                  detailsText={styles.detailsText}
                  detailsTextLabel={styles.detailsTextLabel}
                  detailsTextValue={styles.detailsTextValue}
                  headerIcon={[icons.arrowDirection]}
                  data={item}
                />
              </>
            )}
          />
        </KeyboardAwareScrollView>

        <ModalLoading loading={hospitalLoading} />
      </CurvedView>
    </>
  );
};

export default PanelHospitalListView;

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
