/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  AileronBold,
  AileronRegular,
  AileronSemiBold,
  CurvedView,
  TopView,
} from '../../components';
import {images} from '../../assets';
import {FlatList, Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
import {COLORS} from '../../assets/theme/colors';
import ModalLoading from '../../components/ModalLoading';
import NoDataView from '../../components/NoDataView';
import ProvinceTab from '../../components/provinceTab';
import {vh, vw} from '../../assets/theme/dimension';
import AlertModal from '../../components/AlertModal';

const BenefitsView = ({
  data,
  onPressTab,
  selectedTab,
  modalVisible,
  setModalData,
  benefitsloading,
}) => {
  const RenderBenefits = ({item}) => (
    <View style={styles.card}>
      <View>
        <LinearGradient
          colors={['#0B4A98', '#0f8dd7']}
          start={{x: 1, y: 0}}
          end={{x: 0, y: 1}}
          style={styles.CardBox}>
          <View
            style={
              item?.price === 'Not Covered' ? styles.disabled : styles.wrapper
            }>
            <Image source={item.image} style={styles.coverageCardImage} />
          </View>
        </LinearGradient>
        <AileronRegular
          name={item.title}
          style={
            item.price === 'Not Covered'
              ? styles.insuredTitle
              : styles.insuredTitle
          }
        />
      </View>
      <AileronBold
        // name={`${item.price}${/\d[\d,]*/.test(item?.price) ? '/-' : ''}`}
        name={`${
          /^\d[\d,]*$/.test(item?.price) ? item.price + '/-' : item.price
        }`}
        style={
          item.price === 'Not Covered'
            ? styles.subTitle
            : styles.insuredTitleCovered
        }
      />
      {item?.note && (
        <TouchableOpacity
          onPress={() => setModalData({show: true, itemData: item})}>
          <AileronBold name="View details.." style={styles.details} />
        </TouchableOpacity>
      )}
    </View>
  );

  const HeaderComponent = () => (
    <View>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 0.8, y: 0}}
        colors={COLORS.benefitsCardGradient}
        style={styles.BenefitsGradients}>
        <View style={styles.Maximum}>
          <View style={styles.MaximumLeftBox}>
            <Image source={images.Logo} style={styles.benefitsLogo} />
            <AileronBold name="Entitled" style={styles.MaximumTitle} />
            <AileronBold
              name={
                selectedTab === 'Inpatient'
                  ? 'Inpatient'
                  : selectedTab === 'Outpatient'
                  ? 'Outpatient'
                  : 'Maternity'
              }
              style={styles.selectedTitle}
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

      <View>
        <View style={styles.mapTabsContainer}>
          <FlatList
            data={['Inpatient', 'Outpatient', 'Maternity']}
            horizontal
            indicatorStyle="black"
            showsHorizontalScrollIndicator={true}
            contentContainerStyle={styles.mapTabsContainerList}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ProvinceTab
                onPressMapTab={onPressTab}
                selectedMapTab={selectedTab}
                provinceName={item}
                icon={false}
                activeMapTab={styles.activeMapTab}
              />
            )}
          />
        </View>
      </View>
    </View>
  );

  const renderSeperator = () => <View style={styles.seperator} />;

  return (
    <>
      <TopView title={'Entitled Benefits'} />
      <CurvedView containerStyle={styles.CurvedView}>
        <HeaderComponent />
        <FlatList
          indicatorStyle="black"
          ItemSeparatorComponent={renderSeperator}
          // ListHeaderComponent={headerComponent}
          showsVerticalScrollIndicator={true}
          data={data}
          ListEmptyComponent={
            !benefitsloading ? (
              <View style={{alignItems: 'center', marginTop: 20}}>
                <NoDataView name={'No Benefits Found'} />
              </View>
            ) : null
          }
          renderItem={RenderBenefits}
          keyExtractor={(_, index) => index.toString()}
          numColumns={3}
          contentContainerStyle={styles.flatListContainer}
        />

        <ModalLoading loading={benefitsloading} />
        <AlertModal
          description={modalVisible?.itemData?.note}
          subtitle={modalVisible?.itemData?.CoverageEligibility}
          modalVisible={modalVisible?.show}
          setModalVisible={modalVisible =>
            setModalData({show: modalVisible, note: ''})
          }
        />
      </CurvedView>
    </>
  );
};

export default BenefitsView;
