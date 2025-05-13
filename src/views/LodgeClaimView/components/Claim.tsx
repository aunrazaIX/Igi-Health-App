import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Box from './Box';
import {vh} from '../../../assets/theme/dimension';
import LinearGradient from 'react-native-linear-gradient';
import {AileronSemiBold} from '../../../components';
import {COLORS} from '../../../assets/theme/colors';
import {ClaimDetailSection} from '../typeInterface';
import {ScrollView} from 'react-native-gesture-handler';

type ClaimProps = {
  claimsDetails: ClaimDetailSection[];
  navigateTreatment: () => void;
};

const Claim: React.FC<ClaimProps> = ({claimsDetails, navigateTreatment}) => {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <View style={styles.list}>
          {claimsDetails?.map((data, index) => (
            <Box data={data} key={index} />
          ))}
        </View>
      </ScrollView>
      <LinearGradient
        colors={COLORS.PriorGradient}
        style={styles.priorGradient}>
        <View style={styles.wrapper}>
          <TouchableOpacity onPress={navigateTreatment}>
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
});
