import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {AileronBold, CurvedView, TopView} from '../../components';
import {icons} from '../../assets';
import {styles} from './style';
import DetailsContainer from '../../components/DetailsContainer';
import {vh} from '../../assets/theme/dimension';
import {COLORS} from '../../assets/theme/colors';
import ProvinceTab from '../../components/provinceTab';

type HospitalsViewProps = {
  selectedTab: string;
  selectedTabRight: string;
  selectedMapTab: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  onPressMapTab: (tab: string) => void;
};

const PanelHospitalListView: React.FC<HospitalsViewProps> = ({
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedMapTab,
  selectedTabRight,
  onPressMapTab,
}) => {
  return (
    <>
      <TopView
        title="Hospitals"
        HeaderIcon={icons.searchWhite}
        HeaderSecondIcon={null}
        headerStyle={styles.headerStyle}
      />

      <CurvedView>
        <View>
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
                selectedTab === 'Panel Hospitals' && styles.activeTab,
              ]}
              onPress={() => onPressTab('Panel Hospitals')}>
              {selectedTab === 'Panel Hospitals' ? (
                <Image source={icons.hospital} />
              ) : (
                <Image source={icons.hospitalInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'Panel Hospitals' && styles.activeTabText,
                ]}
                name="Panel Hospitals"
              />
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.tab,
                selectedTab === 'Discounted Centers' && styles.activeTab,
              ]}
              onPress={() => onPressTab('Discounted Centers')}>
              {selectedTab === 'Discounted Centers' ? (
                <Image source={icons.labsActive} />
              ) : (
                <Image source={icons.labsInactive} />
              )}

              <AileronBold
                style={[
                  styles.tabText,
                  selectedTab === 'Discounted Centers' && styles.activeTabText,
                ]}
                name="Discounted Centers"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.mapTextContainer}>
            <AileronBold style={style.mapText} name="Search By">
              {' '}
            </AileronBold>
            <AileronBold style={style.mapTextColor} name="Provinces">
              {' '}
            </AileronBold>
          </View>

          <View style={styles.mapTabsContainer}>
            <ProvinceTab
              onPressMapTab={onPressMapTab}
              selectedMapTab={selectedMapTab}
              provinceName={'Sindh'}
            />

            <ProvinceTab
              onPressMapTab={onPressMapTab}
              selectedMapTab={selectedMapTab}
              provinceName={'Punjab'}
            />
            <ProvinceTab
              onPressMapTab={onPressMapTab}
              selectedMapTab={selectedMapTab}
              provinceName={'Baluchistan'}
            />
          </View>
        </View>
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
    fontSize: vh * 2.5,
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
