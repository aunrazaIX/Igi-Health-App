import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  ImageSourcePropType,
} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {styles} from './style';
import {icons, images} from '../../assets';
import AileronBold from '../../components/AileronBold';
import AileronSemiBold from '../../components/AileronSemiBold';
import AileronLight from '../../components/AileronLight';
import AileronRegular from '../../components/AileronRegular';
import {vh, vw} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';
import ModalLoading from '../../components/ModalLoading';
import moment from 'moment';

type CardItem = {
  logo: ImageSourcePropType;
  name: string;
  image: ImageSourcePropType;
  backgroundColor: any;
  to: any;
};

type HomeViewProps = {
  cardData: CardItem[];
  animateCard: () => void;
  backAnimatedStyle: {};
  frontAnimatedStyle: {};
  toggleDrawer: () => void;
  onPressMenu: (value: CardItem) => void;
  onPressHeaderIcon: (value: string) => void;
  homeCardData: any;
  claimData: {
    totalClaimAmount: string;
    deductedAmount: string;
    paidAmount: string;
  };
  loading: boolean;
  handleAssociatedApps: any;
  homeCardDataLoading: any;
  handleCardDownload: any;
};

const HomeView: React.FC<HomeViewProps> = ({
  cardData,
  animateCard,
  toggleDrawer,
  onPressMenu,
  onPressHeaderIcon,
  frontAnimatedStyle,
  backAnimatedStyle,
  homeCardData,
  claimData,
  loading,
  homeCardDataLoading,
  handleAssociatedApps,
  handleCardDownload,
}) => {
  const user = useSelector(state => state.auth.user);
  console.log(user, 'userrrr');

  console.log(homeCardData, 'homeCardData');

  return (
    <ScrollView>
      <LinearGradient
        colors={['rgba(11, 74, 152, 1)', 'rgba(72, 195, 255, 1)']}>
        <View style={styles.wrapper}>
          <View style={styles.homeHeader}>
            <View>
              <Image style={styles.headerLogo} source={images.logoWhite} />
            </View>

            <View style={styles.headerIconsRow}>
              <View style={styles.headerDNIcons}>
                <TouchableOpacity>
                  <Image source={icons.download} style={styles.headerIcons} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onPressHeaderIcon('Notifications')}>
                  <Image
                    source={icons.notification}
                    style={styles.headerIcons}
                  />
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={toggleDrawer}>
                <Image source={icons.menu} style={styles.headerIcons} />
              </TouchableOpacity>
            </View>
          </View>

          {homeCardData?.length > 0 && (
            <View style={styles.flipCardContainer}>
              <Animated.View
                style={[styles.homeInfoContainer, frontAnimatedStyle]}>
                <TouchableOpacity onPress={animateCard}>
                  {/* <TouchableOpacity
                    style={styles.downloadIcon}
                    onPress={handleCardDownload}>
                    <Image
                      style={styles.downloadIconImage}
                      source={icons.download}
                    />
                  </TouchableOpacity> */}

                  <View style={styles.homeInfoContainerHeader}>
                    <View>
                      <Image style={styles.logo} source={icons.logo} />
                    </View>

                    <TouchableOpacity onPress={animateCard}>
                      <Image
                        style={styles.flipCardIcon}
                        source={images.flipCard}
                      />
                    </TouchableOpacity>
                  </View>

                  <View style={styles.homeInfoContainerMiddle}>
                    <View style={styles.homeInfoContainerMiddleTextLogo}>
                      <View style={styles.homeCardMainDetails}>
                        <View>
                          <AileronSemiBold
                            name={`Policy Number ${homeCardData[0]?.Policy_Number}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />
                        </View>

                        <View>
                          <AileronSemiBold
                            name={`CNIC: ${user?.cnic}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />
                        </View>

                        <View>
                          <AileronSemiBold
                            name={`Policy Name: ${homeCardData[0]?.Policy_Insured_Name}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />
                        </View>

                        {/* <View style={{flexDirection: 'row', gap: vw * 5}}>
                          <AileronSemiBold
                            name={`class: ${homeCardData[0].Policy_CertNo}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />

                          <AileronSemiBold
                            name={`Cert No: ${homeCardData[0]?.Policy_Insured_Age}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />

                          <AileronSemiBold
                            name={`Age: ${homeCardData[0]?.Policy_Insured_Age}`}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />
                        </View> */}
                      </View>

                      <View style={{gap: vh}}>
                        <AileronSemiBold
                          name={`class: ${homeCardData[0].Policy_CertNo}`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={2}
                        />

                        <AileronSemiBold
                          name={`Cert No: ${homeCardData[0]?.Policy_Insured_Age}`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />

                        <AileronSemiBold
                          name={`Age: ${homeCardData[0]?.Policy_Insured_Age}`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoCardFooter}>
                    <View style={styles.infoCardFooterLeft}>
                      <AileronSemiBold
                        name={'Card Holder Name'}
                        style={styles.infoCardMiddleTextlight}
                        numberOfLines={1}
                      />

                      <AileronBold
                        name={homeCardData
                          ?.find(
                            item => item?.Policy_Insured_Relaion == 'Member',
                          )
                          ?.Policy_Insured_Name.trim()}
                        style={styles.infoCardTextBold}
                        numberOfLines={1}
                      />
                    </View>

                    {/* <View style={styles.infoCardFooterRight}>
                      <AileronSemiBold
                        name={'Expiry Date'}
                        style={styles.infoCardMiddleTextlight}
                        numberOfLines={1}
                      />

                      <AileronBold
                        name={'02/07/2025'}
                        style={styles.infoCardFooterTextBold}
                        numberOfLines={1}
                      />
                    </View> */}
                  </View>
                </TouchableOpacity>
              </Animated.View>

              <Animated.View
                style={[
                  styles.homeInfoContainer,
                  backAnimatedStyle,
                  styles.flipBackCard,
                ]}>
                <TouchableOpacity onPress={animateCard}>
                  <View style={styles.homeBackCardContainer}>
                    <View
                      style={{
                        justifyContent: 'space-between',
                        // gap: vh * 1.5,
                      }}>
                      <View style={styles.homeBackCardHeading}>
                        <View style={{flexDirection: 'row', gap: vw}}>
                          <AileronBold
                            style={styles.homeBackCardHeadingBlack}
                            name={'Dependent'}
                          />
                          <AileronBold
                            style={styles.homeBackCardHeadingColor}
                            name={'Details'}
                          />
                        </View>

                        <TouchableOpacity onPress={animateCard}>
                          <Image
                            style={styles.flipCardIcon}
                            source={images.flipCard}
                          />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.backCardDetails}>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                          }}>
                          <View
                            style={{
                              flexDirection: 'col',
                              gap: vh * 1.2,
                            }}>
                            {homeCardData
                              ?.filter(
                                _item =>
                                  _item?.Policy_Insured_Relaion !== 'Member',
                              )
                              .map((item, index) => (
                                <AileronRegular
                                  key={index}
                                  name={`${item?.Policy_Insured_Name?.trim()}: ${
                                    item?.Policy_Insured_Age
                                  }`}
                                  style={styles.homeBackCardText}
                                />
                              ))}
                          </View>

                          {/* <TouchableOpacity onPress={animateCard}>
                          <Image
                            style={styles.flipCardIcon}
                            source={images.flipCard}
                          />
                        </TouchableOpacity> */}
                        </View>

                        <View style={styles.validity}>
                          <AileronBold
                            style={{fontSize: vw * 3.4}}
                            name={`    Valid from : ${moment(
                              homeCardData[0]?.Policy_Start_Date,
                            ).format('DD-MM-YYYY')}`}
                          />

                          <AileronBold
                            style={{fontSize: vw * 3.4}}
                            name={`Valid till : ${moment(
                              homeCardData[0]?.Policy_expiry_Date,
                            ).format('DD-MM-YYYY')}`}
                          />
                        </View>
                      </View>

                      {/* <View style={styles.homeBackCardRow}>
                        <View style={styles.homeBackCardRowText}>
                          <AileronRegular
                            style={styles.homeBackCardText}
                            name={`Tariq Imran Qureshi: ${
                              homeCardData?.find(
                                item =>
                                  item?.Policy_Insured_Relaion == 'Member',
                              )?.Policy_Insured_Age
                            }`}
                          />
                          <AileronRegular
                            name={`Emaan Imran Qureshi: ${
                              homeCardData?.find(
                                item =>
                                  item?.Policy_Insured_Relaion == 'Member',
                              )?.Policy_Insured_Age
                            }`}
                            style={styles.homeBackCardText}
                          />
                        </View>
                        <TouchableOpacity onPress={animateCard}>
                          <Image source={images.flipCard} />
                        </TouchableOpacity>
                      </View> */}

                      {/* <View style={styles.homeBackCardTextRow}>
                        <AileronSemiBold
                          style={styles.homeBackCardText}
                          name={`Class : ${homeCardData[0].Policy_CertNo}`}
                        />
                        <AileronSemiBold
                          style={styles.homeBackCardText}
                          name={`Cert No: ${homeCardData[0].Policy_CertNo}`}
                        />
                        <AileronSemiBold
                          style={styles.homeBackCardText}
                          name={`Age : ${homeCardData[0]?.Policy_Insured_Age}`}
                        />
                      </View> */}
                    </View>
                    <View style={styles.backCardFooter}>
                      <View style={styles.backCardFooterBox}>
                        <Image
                          style={styles.backCardFooterIcon}
                          source={icons.flipCardRoom}
                        />

                        <View style={styles.backCardFooterText}>
                          <AileronSemiBold
                            style={styles.homeBackCardText}
                            name="Max. Room & Board"
                          />
                          <AileronSemiBold
                            style={styles.homeBackCardText}
                            name={`Rs. Per Day: ${homeCardData[0]?.Policy_Daily_RoomLimit?.toLocaleString()}`}
                          />
                        </View>
                      </View>

                      <View style={styles.backCardFooterBox}>
                        <Image
                          style={styles.backCardFooterSecondIcon}
                          source={icons.flipCardMaternity}
                        />

                        <View style={styles.backCardFooterText}>
                          <AileronSemiBold
                            style={styles.homeBackCardText}
                            name="Maternity"
                          />
                          <AileronSemiBold
                            style={styles.homeBackCardText}
                            name={
                              homeCardData[0]?.Policy_MatLimit > 0
                                ? 'Available'
                                : 'Not Available'
                            }
                          />
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              </Animated.View>
            </View>
          )}
        </View>
      </LinearGradient>
      <View style={styles.gradient}>
        <View>
          <View style={styles.dashboardContainerHeader}>
            <Image
              source={icons.claimStatistics}
              style={styles.statisticsIcon}
            />
            <AileronBold
              style={styles.dashboardContainerTextBold}
              name="Quick Services"
              numberOfLines={1}
            />
          </View>
          <FlatList
            horizontal
            data={cardData}
            keyExtractor={_item => _item?.name}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => onPressMenu(item)}
                style={[
                  styles.dashboardContainerCards,
                  {backgroundColor: item.backgroundColor},
                ]}>
                <Image style={styles.cardLogo} source={item.logo} />

                <View style={styles.cardContent}>
                  <View style={{width: '81%'}}>
                    <AileronRegular
                      style={styles.dashboardContainerCardText}
                      name={item.name}
                      numberOfLines={2}
                    />
                  </View>

                  <Image source={item.image} style={styles.cardsArrow} />
                </View>
              </TouchableOpacity>
            )}
          />
        </View>

        <View style={styles.claimStatistics}>
          <Image source={icons.claimStatistics} style={styles.statisticsIcon} />
          <AileronBold
            style={styles.statisticsHeader}
            name="Claim Statistics"
          />
        </View>
        <View style={styles.graphContainer}>
          <Image style={styles.meterEllipseBlue} source={images.ellipseBlue} />

          <Image style={styles.meterEllipseRed} source={images.ellipseRed} />

          <Image style={styles.dashboardMeterIcon} source={icons.meterIcon} />

          <AileronLight
            style={styles.meterLightText}
            name="Total Claim Amount"
          />
          <AileronBold
            style={styles.meterBoldText}
            name={claimData?.totalClaimAmount}
          />
        </View>

        <View style={styles.statisticsContainer}>
          <View style={styles.dashboardMeterDetail}>
            <View style={styles.totalDeducted}>
              <Image source={icons.totalDeducted} style={styles.meterIcon} />
              <AileronBold
                style={styles.meterDetailTextLight}
                name="Total Deducted"
                numberOfLines={1}
              />
            </View>
            <AileronBold
              name={claimData?.deductedAmount}
              style={styles.meterDetailTextBold}
              numberOfLines={1}
            />
            <View style={styles.meterDetailTextEnd}>
              <Image source={icons.arrowUp} style={styles.meterArrowUp} />

              <AileronLight
                name={'19.6%'}
                numberOfLines={1}
                style={styles.textRed}
              />
              <AileronLight
                name={'44.714'}
                numberOfLines={1}
                style={styles.text}
              />
            </View>
          </View>
          <View style={styles.dashboardMeterDetail}>
            <View style={styles.totalDeducted}>
              <Image style={styles.meterIcon} source={icons.totalPaid} />
              <AileronBold
                style={styles.meterDetailTextLight}
                name="Total Paid"
                numberOfLines={1}
              />
            </View>

            <AileronBold
              name={claimData?.paidAmount}
              style={styles.meterDetailTextBold}
              numberOfLines={1}
            />

            <View style={styles.meterDetailTextEnd}>
              <Image source={icons.arrowUp} style={styles.meterArrowUp} />

              <AileronLight
                name={'19.6%'}
                numberOfLines={1}
                style={styles.textRed}
              />

              <AileronLight
                name={'44.714'}
                numberOfLines={1}
                style={styles.text}
              />
            </View>
          </View>
        </View>
        <View>
          <View style={styles.claimStatistics}>
            {' '}
            <Image
              source={icons.claimStatistics}
              style={styles.statisticsIcon}
            />
            <AileronSemiBold
              name={'Associated Apps'}
              style={styles.associatedTittle}
            />
          </View>

          <View style={styles.associatedContainer}>
            <View style={styles.associatedImageContainer}>
              <TouchableOpacity
                onPress={() =>
                  handleAssociatedApps({
                    ios: 'https://apps.apple.com/pk/app/igi-life-vitality/id1398273780',
                    android:
                      'https://play.google.com/store/apps/details?id=com.vitalityactive.igi&hl=en-US',
                  })
                }>
                <Image
                  source={images.LogoLife}
                  style={styles.associatedImage}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.associatedImageContainer}>
              <TouchableOpacity
                onPress={() =>
                  handleAssociatedApps({
                    ios: 'https://apps.apple.com/pk/app/sehat-kahani-retail/id1470938140',
                    android:
                      'https://play.google.com/store/apps/details?id=com.sehatkahani.app&hl=en',
                  })
                }>
                <Image
                  source={images.sehatKahani}
                  style={styles.associatedImage}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
      <ModalLoading loading={homeCardDataLoading} />
    </ScrollView>
  );
};

export default HomeView;
