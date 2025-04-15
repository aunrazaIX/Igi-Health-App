import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
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
  detailsTextLabel: {};
  detailsText: {};
  detailsTextValue: {};
  headerIcon: ImageSourcePropType | null;
};

const DetailsContainer: React.FC<Props> = ({
  data,
  detailsTextLabel,
  detailsTextValue,
  detailsText,
  headerIcon,
}) => {
  const [isArrowUp, setIsArrowUp] = useState<boolean>(true);

  return (
    <View style={[styles.claimsHistoryCard]}>
      <View style={styles.claimsHistoryCardHeader}>
        <View style={styles.claimsHistoryCardHeaderLeft}>
          <Image source={icons.editTask} />
          <AileronBold name={`Claim`} numberOfLines={1} />
        </View>

        <View style={styles.claimsHistoryCardHeaderRight}>
          {isArrowUp ? (
            <>
              {headerIcon && <Image source={headerIcon} />}
              <TouchableOpacity onPress={() => setIsArrowUp(!isArrowUp)}>
                <Image source={icons.toggleTop} />
              </TouchableOpacity>
            </>
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
                style={[styles.detailsText, detailsTextLabel]}
                name={item.label}
              />

              <AileronBold
                style={[styles.detailsText, detailsTextValue]}
                name={item.value}
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
    borderWidth: 1,
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 4,

    backgroundColor: COLORS.white,
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 2,

    marginVertical: vh * 1.5,
    alignItems: 'center',
    gap: vh * 1,

    elevation: 4,
  },

  claimsHistoryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: vh * 0.5,
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
    flexDirection: 'row',
    gap: vw * 2,
  },

  cardHorizontalLine: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    borderColor: COLORS.textGrayShade,
    marginBottom: vh * 2,
    opacity: 0.4,
  },
  claimsHistoryCardDetailsContainer: {},
  claimsHistoryCardDetails: {
    marginBottom: vh * 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsText: {
    fontSize: vh * 1.7,
  },
});
