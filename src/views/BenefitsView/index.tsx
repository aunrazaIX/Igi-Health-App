import React from 'react';
import {AileronBold, Container, CurvedView, TopView} from '../../components';
import {images} from '../../assets';
import {FlatList, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import BenefitCards from './components/BenefitCards';
import {COLORS} from '../../assets/theme/colors';

const BenefitsView = ({data}) => {
  return (
    <Container>
      <TopView title={'Benefits'} />
      <CurvedView>
        <LinearGradient
          colors={COLORS.benefitsCardGradient}
          style={styles.BenefitsGradients}>
          <View style={styles.Maximum}>
            <View style={styles.MaximumLeftBox}>
              <Image source={images.Logo} style={styles.benefitsLogo} />
              <AileronBold
                name={'Maximum\nHospitalization'}
                style={styles.MaximumTitle}
              />
              <AileronBold name={'Benefits!'} style={styles.BenefitsTitle} />
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
          <AileronBold name={'Coverage &'} style={styles.coverageTitle} />
          <AileronBold name={' Benefits!'} style={styles.benefitTitle} />
        </View>

        <FlatList
          data={data}
          renderItem={RenderBenefits}
          keyExtractor={(item, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />
      </CurvedView>
    </Container>
  );
};

export default BenefitsView;
