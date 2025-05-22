import { StyleSheet, View } from 'react-native';
import React, { Fragment } from 'react';
import Box from './Box';
import { vh } from '../../../assets/theme/dimension';
import { COLORS } from '../../../assets/theme/colors';
import { ClaimDetailSection } from '../typeInterface';

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

        {claimsDetails?.length > 0 && claimsDetails?.map((data, index) => (

          < Box
            onPressDelete={() => onPressDelete(index)}
            onPressEdit={() => onPressEdit(data, index)}
            data={data}
            key={index}
          />

        ))}
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
});
