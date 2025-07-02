import {StyleSheet, View} from 'react-native';
import React from 'react';
import Box from './Box';
import {vh, vw} from '../../../assets/theme/dimension';
import {COLORS} from '../../../assets/theme/colors';
import {ClaimDetailSection} from '../typeInterface';

import NoDataView from '../../../components/NoDataView';
import {ScrollView} from 'react-native-gesture-handler';
import {Button} from '../../../components';

type ClaimProps = {
  claimsDetails: ClaimDetailSection[];
  navigateTreatment: () => void;
  onPressDelete: (index: number) => void;
  onPressEdit: (data: object, index: number) => void;
  selectedType: any;
};

const Claim: React.FC<ClaimProps> = ({
  claimsDetails,
  onPressDelete,
  onPressEdit,
  navigateTreatment,
  currentStep,
  selectedType,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.list}>
        {claimsDetails?.length > 0 ? (
          claimsDetails?.map((data, index) => (
            <Box
              onPressDelete={() => onPressDelete(index)}
              onPressEdit={() => onPressEdit(data, index)}
              data={data}
              key={index}
            />
          ))
        ) : (
          <NoDataView name={'No Treatments found'} />
        )}
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
  wrapper: {padding: vh * 2},
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
  noDataIcon: {
    width: vw * 30,
    height: vw * 30,
  },
  noDataText: {
    fontSize: vw * 6,
  },
  noDataView: {
    justifyContent: 'center',
    alignItems: 'center',
    // flex: 1,
    // height: "100%"
  },
});
