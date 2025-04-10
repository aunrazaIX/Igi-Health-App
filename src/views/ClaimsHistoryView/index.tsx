import {View, Image, StyleSheet, FlatList} from 'react-native';
import React from 'react';
import {styles} from './style';
import TopView from '../../components/TopView';
import {icons} from '../../assets';
import {AileronBold, CurvedView} from '../../components';
import {COLORS} from '../../assets/theme/colors';
import {vh, vw} from '../../assets/theme/dimension';
import DetailsContainer from '../../components/DetailsContainer';
import type {ClaimHistory} from '../../viewmodels/useClaimsHistoryViewModel'; // ✅ Add this

type HomeViewProps = {
  data: ClaimHistory[][];
};

const ClaimsHistoryView: React.FC<HomeViewProps> = ({data}) => {
  return (
    <View style={styles.claimHistoryContainer}>
      <View style={styles.header}>
        <TopView
          title="Claims History"
          icon={icons.search}
          onPressBack={() => console.log('Back Pressed')}
        />
      </View>

      <CurvedView>
        <View style={styles.infoContainer}>
          <View style={styles.infoContainerTop}>
            <View style={styles.leftButton}>
              <Image source={icons.payment} />
              <AileronBold
                name="Paid Amount"
                numberOfLines={1}
                style={style.buttonTextActive}
              />
            </View>

            <View style={styles.rightButton}>
              <Image source={icons.creditCard} />
              <AileronBold
                name="Pending Amount"
                numberOfLines={1}
                style={style.buttonText}
              />
            </View>
          </View>

          <View style={styles.infoContainerSecondTop}>
            <View style={styles.leftMidButton}>
              <AileronBold
                name="Daily"
                numberOfLines={1}
                style={style.buttonText}
              />
            </View>
            <View style={styles.midButton}>
              <AileronBold
                name="Monthly"
                numberOfLines={1}
                style={style.buttonTextActive}
              />
            </View>
            <View style={styles.rightMidButton}>
              <AileronBold
                name="Yearly"
                numberOfLines={1}
                style={style.buttonText}
              />
            </View>
          </View>

          <FlatList
            data={data}
            keyExtractor={(_, index) => index.toString()}
            renderItem={({item}) => <DetailsContainer data={item} />}
          />
        </View>
      </CurvedView>
    </View>
  );
};

export default ClaimsHistoryView;

const style = StyleSheet.create({
  buttonTextActive: {
    color: COLORS.white,
    fontSize: vh * 2,
  },
  buttonText: {
    color: COLORS.textGrayShade,
    fontSize: vh * 2,
  },
  cardText: {
    fontSize: vh * 2,
  },
});
