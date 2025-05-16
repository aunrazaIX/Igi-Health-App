import React from 'react';
import {View, TouchableOpacity, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {icons} from '../../../assets';
import styles from '../styles';
import {COLORS} from '../../../assets/theme/colors';
import {AileronRegular, AileronSemiBold} from '../../../components';

const SingleFAQsView = ({
  ques,
  description,
  isExpanded,
  index,
  toggleAccordion,
}: {
  ques: string;
  description: string;
  isExpanded: boolean | undefined;
  index: number;
  toggleAccordion: (index: number, isClose: boolean) => void;
}) => {
  return (
    <TouchableOpacity onPress={() => toggleAccordion(index, false)}>
      <LinearGradient colors={COLORS.faqsGradient} style={styles.accordion}>
        <View style={styles.wrapper}>
          <View style={styles.headerRow}>
            <AileronSemiBold style={styles.title} name={ques} />
            <Image
              source={isExpanded ? icons.minus : icons.plus}
              style={styles.icon}
            />
          </View>

          {isExpanded && (
            <View style={styles.detailsContainer}>
              <AileronRegular style={styles.description} name={description} />
            </View>
          )}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

export default SingleFAQsView;
