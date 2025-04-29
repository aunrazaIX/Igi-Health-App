import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Box from './Box';
import {vh} from '../../../assets/theme/dimension';
import LinearGradient from 'react-native-linear-gradient';
import {AileronSemiBold} from '../../../components';
import {COLORS} from '../../../assets/theme/colors';

type ClaimProps = {
  claimsDetails: [];
};

const Claim: React.FC<ClaimProps> = ({claimsDetails}) => {
  return (
    <View style={styles.container}>
      {claimsDetails?.map(data => (
        <Box data={data} />
      ))}  
      <LinearGradient
        colors={COLORS.PriorGradient}
        style={styles.priorGradient}>
        <TouchableOpacity>
          <AileronSemiBold style={styles.priorNext} name={'Add'} />
        </TouchableOpacity>
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
    padding: vh * 2,
  },
  priorNext: {
    textAlign: 'center',
    color: COLORS.white,
    fontSize: vh * 2,
  },
});
