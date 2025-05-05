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
  TopView,
} from '../../components';
import { icons } from '../../assets';
import { styles } from './style';
import DetailsContainer from '../../components/DetailsContainer';
import { vh, vw } from '../../assets/theme/dimension';
import { COLORS } from '../../assets/theme/colors';
import ProvinceTab from '../../components/provinceTab';

type HospitalsViewProps = {
  selectedTab: string;
  selectedTabRight: string;
  selectedMapTab: string;
  onPressTab: (tab: string) => void;
  onPressRightTab: (tab: string) => void;
  onPressMapTab: (tab: string) => void;
  goBack: () => void;
};

const PanelHospitalListView: React.FC<HospitalsViewProps> = ({
  selectedTab,
  onPressTab,
  onPressRightTab,
  selectedMapTab,
  selectedTabRight,
  onPressMapTab,
  goBack,
}) => {
  return (
    <>
      <TopView
        title="Hospitals"
        TopViewFirstIcon={icons.searchWhite}
        // HeaderIcon={icons.searchWhite}
        // HeaderSecondIcon={null}
        // headerStyle={styles.headerStyle}
        onPressBack={goBack}
      />

      <CurvedView>
        <View>
          <View style={styles.mapTextContainer}>
            <AileronBold style={style.mapText} name="Search By Provinces" />

            <View style={styles.moreFilter}>
              <Image style={styles.filterIcon} source={icons.filter} />
              <AileronRegular
                style={styles.moreFilterText}
                name="More filters"
              />
            </View>
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
            <ProvinceTab
              onPressMapTab={onPressMapTab}
              selectedMapTab={selectedMapTab}
              provinceName={'KPK'}
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
