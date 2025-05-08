import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Box from './Box';
import {vh} from '../../../assets/theme/dimension';
import LinearGradient from 'react-native-linear-gradient';
import {AileronSemiBold} from '../../../components';
import {COLORS} from '../../../assets/theme/colors';
import {ClaimDetailSection} from '../typeInterface';

type ClaimProps = {
  claimsDetails: ClaimDetailSection[];
};

const Claim: React.FC<ClaimProps> = ({claimsDetails}) => {
  return (
    <View style={styles.container}>
      {claimsDetails?.map((data, index) => (
        <Box data={data} key={index} />
      ))}
      <LinearGradient
        colors={COLORS.PriorGradient}
        style={styles.priorGradient}>
        <View style={styles.wrapper}>
          <TouchableOpacity>
            <AileronSemiBold style={styles.priorNext} name={'Add'} />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

export default Claim;

const styles = StyleSheet.create({
  container: {
    marginTop: vh * 1.25,
    width: '100%',
    // flex: 1,
    rowGap: vh * 1.25,
  },
  priorGradient: {
    // marginTop: vh * 1,
    borderRadius: vh * 1.5,
  },
  wrapper: {padding: vh * 2},
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
});
