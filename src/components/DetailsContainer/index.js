import {View, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {COLORS} from '../../assets/theme/colors';
import {icons} from '../../assets';
import AileronBold from '../AileronBold';
import {vh, vw} from '../../assets/theme/dimension';
import AileronSemiBold from '../AileronSemiBold';
import AileronRegular from '../AileronRegular';

const DetailsContainer = ({
  data,
  detailsTextLabel,
  detailsTextValue,
  headerIcon,
  onPress,
  patientName,
}) => {
  const [isArrowUp, setIsArrowUp] = useState(false);

  return (
    <View style={[styles.card]}>
      <TouchableOpacity
        onPress={() => setIsArrowUp(!isArrowUp)}
        style={styles.cardHeader}>
        <View style={styles.cardHeaderLeft}>
          {data?.headerIcon && (
            <Image style={styles.headerArrow} source={data.headerIcon} />
          )}
          <AileronBold
            style={styles.cardHeaderLeftText}
            name={
              patientName
                ? `${data?.headerLabel}\n${patientName}`
                : data?.headerLabel
            }
          />
        </View>

        <View style={styles.cardHeaderRight}>
          {headerIcon &&
            (Array.isArray(headerIcon) ? (
              headerIcon?.map((icon, idx) =>
                icon ? (
                  <TouchableOpacity
                    key={`header-icon-${idx}`}
                    onPress={
                      onPress
                        ? () => onPress(data?.latitude, data?.longitude)
                        : null
                    }>
                    <Image style={styles.headerArrow} source={icon} />
                  </TouchableOpacity>
                ) : null,
              )
            ) : (
              <TouchableOpacity onPress={onPress}>
                <Image style={styles.headerArrow} source={headerIcon} />
              </TouchableOpacity>
            ))}

          <Image
            style={styles.headerArrow}
            source={isArrowUp ? icons.toggleTop : icons.toggleBottom}
          />
        </View>
      </TouchableOpacity>

      {isArrowUp && (
        <>
          <View style={styles.cardHorizontalLine} />

          {data?.items?.map((item, index) => {
            let Container = item?.onPress ? TouchableOpacity : View;
            return (
              <View key={index} style={styles.cardDetails}>
                <AileronBold
                  style={[styles.detailsLabel, detailsTextLabel]}
                  name={item?.label}
                />
                <Container
                  style={styles.detailsContainer}
                  onPress={() => item?.onPress()}>
                  <AileronRegular
                    style={[
                      styles.detailsValue,
                      detailsTextValue,
                      item?.isUnderLine && {
                        textDecorationLine: 'underline',
                        color: COLORS.faqsSubHeading,
                      },
                    ]}
                    name={item?.value}
                  />
                </Container>
              </View>
            );
          })}
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
    paddingHorizontal: vw * 2,
    paddingVertical: vh,
    // marginVertical: vh * 1.5,
    // alignItems: 'center',
    gap: vh * 1,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.14,
    shadowOffset: {width: 0, height: 1},
    shadowRadius: 2,
    marginBottom: vh * 2,
  },

  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: vh * 0.5,
  },

  cardHeaderLeft: {
    gap: vw * 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardHeaderLeftText: {
    fontSize: vw * 3.5,
    color: COLORS.black,
    width: vw * 47,
    textAlign: 'left',
    marginLeft: vw,
  },
  cardHeaderRight: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: vw * 2,
  },

  cardHorizontalLine: {
    borderBottomWidth: vw * 0.4,
    borderStyle: 'dashed',
    width: '100%',

    borderColor: COLORS.textGrayShade,
    marginBottom: vh * 2,
    opacity: 0.4,
  },
  cardDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  detailsLabel: {
    fontSize: vw * 3.5,
    width: '40%',
    textAlign: 'left',
  },
  detailsValue: {
    fontSize: vw * 3.5,
    color: COLORS.textBlackShade,
    textAlign: 'right',
  },
  headerArrow: {
    width: vw * 7.5,
    height: vw * 7.5,
  },
  detailsContainer: {
    width: '60%',
  },
});
