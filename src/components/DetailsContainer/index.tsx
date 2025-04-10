import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/theme/colors';
import {icons} from '../../assets';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';

type Item = {
  label: string;
  value: string;
};
type Props = {
  data: Item[];
};

const DetailsContainer: React.FC<Props> = ({data}) => {
  const [isArrowUp, setIsArrowUp] = useState<boolean>(true);

  return (
    <View style={styles.claimsHistoryCard}>
      <View style={styles.claimsHistoryCardHeader}>
        <View style={styles.claimsHistoryCardHeaderLeft}>
          <Image source={icons.editTask} />
          <AileronBold name={`Claim`} numberOfLines={1} />
        </View>

        <View style={styles.claimsHistoryCardHeaderRight}>
          {isArrowUp ? (
            <TouchableOpacity onPress={() => setIsArrowUp(!isArrowUp)}>
              <Image source={icons.toggleTop} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setIsArrowUp(!isArrowUp)}>
              <Image source={icons.toggleBottom} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isArrowUp && (
        <>
          <View style={styles.cardHorizontalLine} />

          {data.map((item, index) => (
            <View key={index} style={styles.claimsHistoryCardDetails}>
              <AileronBold
                style={styles.detailsText}
                name={item.label}
                numberOfLines={1}
              />
              <AileronBold
                style={styles.detailsText}
                name={item.value}
                numberOfLines={1}
              />
            </View>
          ))}
        </>
      )}
    </View>
  );
};

export default DetailsContainer;

export const styles = StyleSheet.create({
  claimsHistoryCard: {
    borderWidth: 2,
    borderColor: COLORS.buttonBorder,
    marginVertical: vh * 1,
    borderRadius: vw * 4,
    alignItems: 'center',
    gap: vh * 1,
  },
  claimsHistoryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 2,
  },

  claimsHistoryCardHeaderLeft: {
    gap: vw * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  claimsHistoryCardHeaderRight: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  cardHorizontalLine: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '90%',
    borderColor: COLORS.textGrayShade,
    marginBottom: vh * 2,
    opacity: 0.4,
  },
  claimsHistoryCardDetails: {
    marginBottom: vh * 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: vw * 4,
  },
  detailsText: {
    fontSize: vh * 1.7,
  },
});
