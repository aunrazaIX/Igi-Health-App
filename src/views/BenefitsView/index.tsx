import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import { images } from '../../assets';
import { FlatList, Image, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import { COLORS } from '../../assets/theme/colors';
import { ImageSourcePropType } from 'react-native';

type Item = {
  title: string;
  price: string;
  image: ImageSourcePropType;
};

type Props = {
  data: Item[];
  goBack: () => void;
};

const BenefitsView: React.FC<Props> = ({ data, goBack }) => {
  
  const RenderBenefits = ({ item, index }: { item: Item, index: any }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#0B4A98', '#0f8dd7']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.CardBox}>
        <Image source={item.image} style={styles.coverageCardImage} />
      </LinearGradient>

      <AileronSemiBold name={item.title} style={styles.insuredTitle} />
      <AileronBold name={item.price} style={styles.insuredPrice} />
    </View>
  );

  const headerComponent = () => (
    <>
      <TopView title={'Benefits'} onPressBack={goBack} />
      <CurvedView containerStyle={styles.CurvedView}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 0.8, y: 0 }}
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
      </CurvedView>
    </>
  );
  return (
    <FlatList
      ListHeaderComponent={headerComponent}
      data={data}
      renderItem={RenderBenefits}
      keyExtractor={(_, index) => index.toString()}
      numColumns={3}
      contentContainerStyle={styles.flatListContainer}
    />
  );
};

export default BenefitsView;
