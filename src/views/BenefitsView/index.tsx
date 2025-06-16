import React from 'react';
import {
  AileronBold,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import {images} from '../../assets';
import {FlatList, Image, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {COLORS} from '../../assets/theme/colors';
import {ImageSourcePropType} from 'react-native';
import ModalLoading from '../../components/ModalLoading';
import NoDataView from '../../components/NoDataView';
import {vh, vw} from '../../assets/theme/dimension';

type Item = {
  title: string;
  price: string;
  image: ImageSourcePropType;
};

type Props = {
  data: Item[];
  benefitsloading: any;
  goBack: () => void;
};

const BenefitsView: React.FC<Props> = ({data, goBack, benefitsloading}) => {
  const RenderBenefits = ({item}: {item: Item}) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['#0B4A98', '#0f8dd7']}
        start={{x: 1, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.CardBox}>
        <View style={styles.wrapper}>
          <Image source={item.image} style={styles.coverageCardImage} />
        </View>
      </LinearGradient>

      <AileronSemiBold name={item.title} style={styles.insuredTitle} />
      <AileronBold
        name={`${item.price}${!isNaN(Number(item.price)) ? ' /-' : ''}`}
        style={styles.insuredPrice}
      />
    </View>
  );

  const headerComponent = () => (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.8, y: 0}}
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
    </View>
  );

  const renderSeperator = () => <View style={styles.seperator} />;

  return (
    <>
      <TopView title={'Benefits'} />
      <CurvedView containerStyle={styles.CurvedView}>
        <FlatList
          ItemSeparatorComponent={renderSeperator}
          ListHeaderComponent={headerComponent}
          showsVerticalScrollIndicator={false}
          data={data}
          ListEmptyComponent={
            !benefitsloading ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                <NoDataView name={'No benefits Found'} />
              </View>
            ) : null
          }
          renderItem={RenderBenefits}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />

        <ModalLoading loading={benefitsloading} />
      </CurvedView>
    </>
  );
};

export default BenefitsView;
