import {
  View,
  Image,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Animated,
  RefreshControl,
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
import SimpleLoader from '../../components/SimpleLoader';
import DependantsModal from './components/DependantsModal';
import {formatName} from '../../utils';

const HomeView = ({
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
  handleDependantsModal,
  showDependantModal,
  maternityData,
  maternityLoading,
  notificationCount,
  onPullToRefresh,
}) => {
  const {user} = useSelector(state => state.auth);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={maternityLoading || loading || homeCardDataLoading}
          onRefresh={onPullToRefresh}
          tintColor="#000"
          colors={['#0B4A98']}
        />
      }>
      <LinearGradient
        colors={['rgba(11, 74, 152, 1)', 'rgba(72, 195, 255, 1)']}>
        <View style={styles.wrapper}>
          <View style={styles.homeHeader}>
            <View>
              <AileronSemiBold
                name={`Welcome Back, \n ${user?.UserName}`}
                style={styles.profileTittle}
              />
            </View>

            <View style={styles.headerIconsRow}>
              <View style={styles.headerDNIcons}>
                <TouchableOpacity onPress={handleCardDownload}>
                  <Image source={icons.download} style={styles.headerIcons} />
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => onPressHeaderIcon('Notifications')}>
                  <Image
                    source={icons.notification}
                    style={styles.headerIcons}
                  />
                  {notificationCount > 0 && (
                    <View style={styles.notifiationBageView}>
                      <AileronRegular
                        style={styles.notificationCountText}
                        name={
                          notificationCount > 99 ? '99+' : notificationCount
                        }
                      />
                    </View>
                  )}
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
                            name={`Policy Number: ${
                              homeCardData.find(
                                item =>
                                  item.Policy_Insured_Relaion === 'Member',
                              )?.Policy_Number
                            }`}
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

                        <View style={styles.infoCardFooterLeft}>
                          <AileronSemiBold
                            name={'Card Holder Name'}
                            style={styles.infoCardMiddleTextlight}
                            numberOfLines={1}
                          />

                          <AileronBold
                            name={formatName(
                              homeCardData
                                ?.find(
                                  item =>
                                    item?.Policy_Insured_Relaion == 'Member',
                                )
                                ?.Policy_Insured_Name.trim(),
                            )}
                            style={styles.infoCardTextBold}
                            numberOfLines={1}
                          />
                        </View>
                      </View>

                      <View style={{gap: vh, marginBottom: vh * 3}}>
                        <AileronSemiBold
                          name={`Class: ${
                            homeCardData.find(
                              item => item.Policy_Insured_Relaion === 'Member',
                            )?.Policy_Class
                          }`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />

                        <AileronSemiBold
                          name={`Cert No: ${
                            homeCardData.find(
                              item => item.Policy_Insured_Relaion === 'Member',
                            )?.Policy_CertNo
                          }`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />

                        <AileronSemiBold
                          name={`Age: ${
                            homeCardData.find(
                              item => item.Policy_Insured_Relaion === 'Member',
                            )?.Policy_Insured_Age
                          }`}
                          style={styles.infoCardMiddleTextlight}
                          numberOfLines={1}
                        />
                      </View>
                    </View>
                  </View>

                  <View style={styles.infoCardFooter}>
                    <View>
                      <AileronSemiBold
                        name={`Policy Name: ${
                          homeCardData.find(
                            item => item.Policy_Insured_Relaion === 'Member',
                          )?.SURNAME ?? ' --'
                        }`}
                        style={styles.infoCardMiddleTextlight}
                        numberOfLines={2}
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
                      style={{
                        justifyContent: 'space-between',
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
                            height: vh * 12,
                          }}>
                          <View>
                            {homeCardData
                              ?.filter(
                                _item =>
                                  _item?.Policy_Insured_Relaion !== 'Member',
                              )
                              .slice(0, 5)
                              .map((item, index) => (
                                <>
                                  {index < 4 ? (
                                    <AileronRegular
                                      key={index}
                                      name={`${formatName(
                                        item?.Policy_Insured_Name?.trim(),
                                      )}: ${item?.Policy_Insured_Age}`}
                                      style={[
                                        styles.homeBackCardText,
                                        {width: '80%'},
                                      ]}
                                    />
                                  ) : (
                                    <TouchableOpacity
                                      onPress={() =>
                                        handleDependantsModal(true)
                                      }>
                                      <AileronRegular
                                        name="..."
                                        style={styles.homeBackCardDottedText}
                                      />
                                    </TouchableOpacity>
                                  )}
                                </>
                              ))}
                          </View>
                        </View>

                        <View style={[styles.validity, {width: '40%'}]}>
                          <AileronBold
                            style={{
                              textAlign: 'left',
                              fontSize: vw * 3.25,
                            }}
                            name={`Valid from : ${moment(
                              homeCardData[0]?.Policy_Start_Date,
                              'YYYYMMDD',
                            ).format('DD-MMM-YYYY')}`}
                          />

                          <AileronBold
                            style={{textAlign: 'left', fontSize: vw * 3.25}}
                            name={`Valid till : ${moment(
                              homeCardData[0]?.Policy_Expiry_Date,
                              'YYYYMMDD',
                            ).format('DD-MMM-YYYY')}`}
                          />
                        </View>
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
                              maternityData?.length > 0 &&
                              maternityData[0]?.Policy_MatLimit > 0
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
            data={cardData}
            keyExtractor={_item => _item?.name}
            showsHorizontalScrollIndicator={true}
            numColumns={4}
            renderItem={({item}) => (
              <View style={styles.cardsContainer}>
                <TouchableOpacity
                  onPress={() => onPressMenu(item)}
                  style={[styles.dashboardContainerCards]}>
                  <Image style={styles.cardLogo} source={item.logo} />
                </TouchableOpacity>

                <View
                  style={{
                    width: vw * 22,
                    justifyContent: 'center',
                  }}>
                  <AileronBold
                    style={styles.dashboardContainerCardText}
                    name={item.name}
                  />
                </View>
              </View>
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

        {!loading ? (
          <View style={styles.graphContainer}>
            <Image
              style={styles.meterEllipseBlue}
              source={images.ellipseBlue}
            />

            <Image style={styles.meterEllipseRed} source={images.ellipseRed} />

            <Image style={styles.dashboardMeterIcon} source={icons.meterIcon} />

            <AileronLight
              style={styles.meterLightText}
              name="Total Claim Amount"
            />

            {!loading ? (
              <AileronBold
                style={styles.meterBoldText}
                name={claimData.totalClaimAmount}
              />
            ) : (
              <AileronBold name="" />
            )}
          </View>
        ) : (
          <SimpleLoader color="black" />
        )}

        {!loading && (
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

              {loading ? (
                <SimpleLoader />
              ) : (
                <AileronBold
                  name={claimData?.paidAmount}
                  style={styles.meterDetailTextBold}
                  numberOfLines={1}
                />
              )}
            </View>
          </View>
        )}

        <View>
          <View style={styles.claimStatistics}>
            <Image
              source={icons.claimStatistics}
              style={styles.statisticsIcon}
            />
            <AileronBold
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
                    ios: 'https://apps.apple.com/pk/app/sehat-kahani-corporate/id1460568869',
                    android:
                      'https://play.google.com/store/apps/details?id=com.sehatkahani.corp.app',
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
      <DependantsModal
        dependants={homeCardData?.filter(
          _item => _item?.Policy_Insured_Relaion !== 'Member',
        )}
        show={showDependantModal}
        onClose={() => handleDependantsModal(false)}
      />
      <ModalLoading loading={homeCardDataLoading || maternityLoading} />
    </ScrollView>
  );
};

export default HomeView;
