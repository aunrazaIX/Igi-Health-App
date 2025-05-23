import { Image, StyleSheet, View } from 'react-native';
import React, { Fragment } from 'react';
import Box from './Box';
import { vh, vw } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';
import { ClaimDetailSection } from '../typeInterface';
import LinearGradient from 'react-native-linear-gradient';
import { AileronBold, AileronSemiBold } from '../../../components';
import { images } from '../../../assets';





type ClaimProps = {
  claimsDetails: ClaimDetailSection[];
  navigateTreatment: () => void;
  onPressDelete: (index: number) => void;
  onPressEdit: (data: object, index: number) => void;

};

const Claim: React.FC<ClaimProps> = ({ claimsDetails, onPressDelete, onPressEdit }) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>

        {claimsDetails?.length > 0 ? claimsDetails?.map((data, index) => (

          < Box
            onPressDelete={() => onPressDelete(index)}
            onPressEdit={() => onPressEdit(data, index)}
            data={data}
            key={index}
          />

        )) :

          <View>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 0.8, y: 0 }}
              colors={COLORS.benefitsCardGradient}
              style={styles.BenefitsGradients}>
              <View style={styles.Maximum}>
                <View style={styles.MaximumLeftBox}>
                  <Image source={images.Logo} style={styles.benefitsLogo} />
                  <AileronBold
                    name={'NO CLAIM  '}
                    style={styles.MaximumTitle}
                  />
                  <AileronBold name={'TO Display!'} style={styles.BenefitsTitle} />
                </View>
                <View style={styles.MaximumRightBox}>
                  <Image
                    style={styles.benefitsImage}
                    source={images.maximumBenefits}
                  />
                </View>
              </View>
            </LinearGradient>
            <View style={styles.coverage}>
              <AileronBold name={'You can  '} style={styles.coverageTitle} />
              <AileronBold name={'Add Claim from Top'} style={styles.benefitTitle} />
            </View>
          </View>





        }
      </View>
    </View>
  );
};

export default Claim;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    marginTop: vh * 1.25,
    width: '100%',
    rowGap: vh * 1.25,
  },
  list: {
    rowGap: vh * 1.25,
  },
  priorGradient: {
    borderRadius: vh * 1.5,
  },
  wrapper: { padding: vh * 2 },
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
  contentContainer: {
    padding: vh * 0.2,
  },
  card: {
    width: '33.33%',
    alignItems: 'center',
    marginTop: vh * 2.5,
    paddingBottom: vh * 2.5,
  },
  seperator: {
    width: '100%',
    height: vh * 0.1,
    borderStyle: 'dashed',
    backgroundColor: COLORS.black + 44,
  },
  CardBox: {
    borderRadius: vh * 1.5,
  },

  insuredTitle: {
    fontSize: vh * 1.6,
    color: COLORS.insuredPrice,
    marginVertical: vh * 1,
    fontWeight: '600',
    width: vh * 12,
  },
  insuredPrice: {
    fontSize: vh * 1.6,
    color: COLORS.insuredPrice,
    width: vh * 11,
  },
  coverageCardImage: {
    height: vh * 4,
    width: vh * 4,
    tintColor: COLORS.white,
    resizeMode: 'contain',
  },
  BenefitsGradients: {
    borderRadius: vw * 3,
    marginTop: vh * 3,
    height: vh * 22,
  },
  Maximum: {
    height: '100%',
    flexDirection: 'row',
    width: '100%',
  },
  MaximumLeftBox: {
    width: '55%',
    paddingVertical: vh * 2.5,
    paddingLeft: vh * 2.5,
  },
  MaximumRightBox: {
    width: '45%',
  },
  benefitsLogo: {
    width: vh * 15,
    height: vh * 6,
    resizeMode: 'stretch',
  },

  MaximumTitle: {
    fontSize: vh * 2.7,
    textAlign: 'left',
    marginTop: vh * 1.5,
    color: '#004984',
  },
  BenefitsTitle: {
    fontSize: vw * 5.5,
    textAlign: 'left',
    color: '#EE2560',
  },
  coverage: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: vh * 3,
  },
  coverageTitle: {
    fontSize: vh * 2.3,
    color: COLORS.coverageTitle,
  },

  benefitTitle: {
    fontSize: vh * 2.3,
    color: COLORS.benefitTitle,
  },


  benefitsImage: {
    resizeMode: 'cover',
    height: '100%',
    width: '100%',
  },
});
