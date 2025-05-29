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
import {vh} from '../../assets/theme/dimension';
import {useSelector} from 'react-redux';

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
}) => {
  const user = useSelector(state => state.auth.user);
  console.log(user, 'pppp');
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
              <TouchableOpacity
                onPress={() => onPressHeaderIcon('Notifications')}>
                <Image source={icons.notification} style={styles.headerIcons} />
              </TouchableOpacity>

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
                  <View style={styles.homeInfoContainerHeader}>
                    <View>
                      <Image style={styles.logo} source={icons.logo} />
                    </View>

                    <View style={styles.homeInfoContainerHeaderText}>
                      <AileronBold
                        name={'Health Insurance'}
                        numberOfLines={1}
                        style={styles.infoCardTextBold}
                      />

                      <AileronSemiBold
                        name={`User ID: ${
                          homeCardData[0]?.Policy_Number +
                          homeCardData[0]?.Policy_Class +
                          homeCardData[0]?.Policy_CertNo
                        }`}
                        style={styles.infoCardTextlight}
                        numberOfLines={1}
                      />
                    </View>
                  </View>

                  <View style={styles.homeInfoContainerMiddle}>
                    <View style={styles.homeInfoContainerMiddleText}>
                      <AileronSemiBold
                        name={`Policy Number ${homeCardData[0]?.Policy_Number}`}
                        style={styles.infoCardMiddleTextlight}
                        numberOfLines={1}
                      />
                    </View>

                    <View style={styles.homeInfoContainerMiddleTextLogo}>
                      <View>
                        <AileronSemiBold
                          name={`CNIC: ${user?.cnic}`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />
                      </View>
                      <TouchableOpacity onPress={animateCard}>
                        <Image source={images.flipCard} />
                      </TouchableOpacity>
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
                          ?.Policy_Insured_Name.trim('')}
                        style={styles.infoCardTextBold}
                        numberOfLines={1}
                      />
                    </View>

                    <View style={styles.infoCardFooterRight}>
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
                    </View>
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
                      style={{justifyContent: 'space-between', gap: vh * 1.5}}>
                      <View style={styles.homeBackCardHeading}>
                        <AileronBold
                          style={styles.homeBackCardHeadingBlack}
                          name={'Dependent'}
                        />
                        <AileronBold
                          style={styles.homeBackCardHeadingColor}
                          name={'Details'}
                        />
                      </View>
                      {homeCardData
                        ?.filter(
                          _item => _item?.Policy_Insured_Relaion !== 'Member',
                        )
                        .map((item, index) => (
                          <AileronRegular
                            key={index}
                            name={`${item?.Policy_Insured_Name?.trim()}:${
                              item?.Policy_Insured_Age
                            }`}
                            style={styles.homeBackCardText}
                          />
                        ))}

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

                      <View style={styles.homeBackCardTextRow}>
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
                      </View>
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
                            name={homeCardData[0]?.Policy_Daily_RoomLimit}
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
                            name={homeCardData[0]?.Policy_MatLimit}
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
            <AileronBold
              style={styles.dashboardContainerTextBold}
              name="Health & Wellness"
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
                  <View style={{width: '85%'}}>
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
          <AileronSemiBold
            name={'Associated Apps'}
            style={styles.associatedTittle}
          />
          <View style={styles.associatedContainer}>
            <View style={styles.associatedImageContainer}>
              <Image source={images.LogoLife} style={styles.associatedImage} />
            </View>
            <View style={styles.associatedImageContainer}>
              <Image
                source={images.sehatKahani}
                style={styles.associatedImage}
              />
            </View>
          </View>
        </View>
      </View>
      <ModalLoading loading={loading} />
    </ScrollView>
  );
};

export default HomeView;
