import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageSourcePropType,
} from 'react-native';
import React, { useState } from 'react';
import { COLORS } from '../../assets/theme/colors';
import { icons } from '../../assets';
import AileronBold from '../AileronBold';
import { vh, vw } from '../../assets/theme/dimension';
import { PanelHospitalGroup } from '../../viewmodels/usePanelHospitalListViewModel';


type Props = {
  data?: PanelHospitalGroup;
  detailsTextLabel?: {};
  detailsText?: {};
  detailsTextValue?: {};
  headerIcon?: ImageSourcePropType | null | ImageSourcePropType[];
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
    <View style={[styles.card]}>
      <View style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          <Image style={styles.headerArrow} source={data?.headerIcon} />
          <AileronBold style={styles.cardHeaderLeftText} name={data?.headerLabel} />
        </View>

        <View style={styles.cardHeaderRight}>
          {isArrowUp ? (
            <>
              {headerIcon &&
                (Array.isArray(headerIcon) ? (
                  headerIcon.map((icon, idx) => (
                    <Image key={idx} style={styles.headerArrow} source={icon} />
                  ))
                ) : (
                  <Image style={styles.headerArrow} source={headerIcon} />
                ))}
              <TouchableOpacity onPress={() => setIsArrowUp(!isArrowUp)}>
                <Image style={styles.headerArrow} source={icons.toggleTop} />
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity onPress={() => setIsArrowUp(!isArrowUp)}>
              <Image style={styles.headerArrow} source={icons.toggleBottom} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {isArrowUp && (
        <>
          <View style={styles.cardHorizontalLine} />

          {data?.items?.map((item, index) => (
            <View key={index} style={styles.cardDetails}>
              <AileronBold
                style={[styles.detailsLabel, detailsTextLabel]}
                name={item.label}
              />
              <AileronBold
                style={[styles.detailsValue, detailsTextValue]}
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
  card: {
    borderWidth: vw * 0.4,
    borderColor: COLORS.buttonBorder,
    borderRadius: vw * 5,
    backgroundColor: COLORS.white,
    paddingHorizontal: vw * 4,
    paddingVertical: vh * 1.2,
    marginVertical: vh * 1.5,
    alignItems: 'center',
    gap: vh * 1,
    elevation: 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingVertical: vh * 0.5,
  },

  cardHeaderLeft: {
    gap: vw * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderLeftText: {
    fontSize: vw * 4,
    color: COLORS.black,
  },
  cardHeaderRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: vw * 2,
  },

  cardHorizontalLine: {
    borderWidth: vw * 0.2,
    borderStyle: 'dashed',
    width: '100%',

    borderColor: COLORS.textGrayShade,
    marginBottom: vh * 2,
    opacity: 0.4,
  },
  claimsHistoryCardDetailsContainer: {},
  cardDetails: {
    marginBottom: vh * 1,

    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsLabel: {
    fontSize: vw * 3.5,
  },
  detailsValue: {
    fontSize: vw * 3.5,
    color: COLORS.textBlackShade,
  },
  headerArrow: {
    width: vw * 7.5,
    height: vw * 7.5
  }
});
