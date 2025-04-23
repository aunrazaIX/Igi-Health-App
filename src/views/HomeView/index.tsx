import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  StyleSheet,
  TouchableOpacity,
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
import {COLORS} from '../../assets/theme/colors';

type CardItem = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
};

type HomeViewProps = {
  cardData: CardItem[];
  onPressCard: (value: boolean) => void;
  frontCard: boolean;
};

const HomeView: React.FC<HomeViewProps> = ({
  cardData,
  onPressCard,
  frontCard,
}) => {
  console.log(cardData, 'cardData');
  return (
    <View style={styles.homeContainer}>
      <ScrollView>
        <LinearGradient
          style={styles.gradient}
          colors={['rgba(11, 74, 152, 1)', 'rgba(72, 195, 255, 1)']}>
          <View style={styles.homeHeader}>
            <View>
              <Image style={styles.headerLogo} source={images.logoWhite} />
            </View>

            <View style={styles.headerIcons}>
              <TouchableOpacity>
                <Image source={icons.search} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={icons.notification} />
              </TouchableOpacity>

              <TouchableOpacity>
                <Image source={icons.menu} />
              </TouchableOpacity>
            </View>
          </View>

          {/* <View style={styles.homeInfoContainer}>
            <View style={styles.homeInfoContainerHeader}>
              <View>
                <Image style={styles.logo} source={icons.logo} />
              </View>

              <View style={styles.homeInfoContainerHeaderText}>
                <AileronBold
                  name={'Health Insurance'}
                  numberOfLines={1}
                  style={styles.infoCardTextBold}></AileronBold>

                <AileronSemiBold
                  name={'User ID: 123450000123'}
                  style={styles.infoCardTextlight}
                  numberOfLines={1}></AileronSemiBold>
              </View>
            </View>

            <View style={styles.homeInfoContainerMiddle}>
              <View style={styles.homeInfoContainerMiddleText}>
                <AileronSemiBold
                  name={'Policy Number: 12345'}
                  style={styles.infoCardMiddleTextlight}
                  numberOfLines={1}></AileronSemiBold>
              </View>

              <View style={styles.homeInfoContainerMiddleTextLogo}>
                <View>
                  <AileronSemiBold
                    name={'CNIC: 12345-6789012-3'}
                    style={styles.infoCardMiddleTextlight}
                    numberOfLines={1}></AileronSemiBold>
                </View>
                <View>
                  <TouchableOpacity onPress={() => onPressCard(false)}>
                    <Image source={images.flipCard} />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <View style={styles.infoCardFooter}>
              <View style={styles.infoCardFooterLeft}>
                <AileronSemiBold
                  name={'Card Holder Name'}
                  style={styles.infoCardMiddleTextlight}
                  numberOfLines={1}></AileronSemiBold>

                <AileronBold
                  name={'Imran Naveed Qureshi'}
                  style={styles.infoCardTextBold}
                  numberOfLines={1}></AileronBold>
              </View>

              <View style={styles.infoCardFooterRight}>
                <AileronSemiBold
                  name={'Expiry Date'}
                  style={styles.infoCardMiddleTextlight}
                  numberOfLines={1}></AileronSemiBold>

                <AileronBold
                  name={'02/07/2025'}
                  style={styles.infoCardFooterTextBold}
                  numberOfLines={1}></AileronBold>
              </View>
            </View>
          </View> */}

          <View style={styles.homeBackCardContainer}>
            <View style={styles.homeBackCardHeading}>
              <AileronBold
                style={styles.homeBackCardHeadingBlack}
                name={'Dependent'}></AileronBold>
              <AileronBold
                style={styles.homeBackCardHeadingColor}
                name={'Details'}></AileronBold>
            </View>

            <AileronRegular
              name="Madhia Imran Qureshi: 36"
              style={styles.homeBackCardText}>
              {' '}
            </AileronRegular>

            <AileronRegular
              name="Saad Imran Qureshi: 8"
              style={styles.homeBackCardText}>
              {' '}
            </AileronRegular>

            <View style={styles.homeBackCardRow}>
              {' '}
              <View style={styles.homeBackCardRowText}>
                <AileronRegular
                  style={styles.homeBackCardText}
                  name="Tariq Imran Qureshi: 5">
                  {' '}
                </AileronRegular>{' '}
                <AileronRegular
                  name="Emaan Imran Qureshi: 6"
                  style={styles.homeBackCardText}></AileronRegular>
              </View>
              <TouchableOpacity onPress={() => onPressCard(true)}>
                <Image source={images.flipCard} />
              </TouchableOpacity>
            </View>

            <View style={styles.homeBackCardTextRow}>
              <AileronSemiBold
                style={styles.homeBackCardText}
                name="Class: 0000"
              />
              <AileronSemiBold
                style={styles.homeBackCardText}
                name="Cert No: 491"
              />
              <AileronSemiBold style={styles.homeBackCardText} name="Age: 41" />
            </View>

            <View style={styles.backCardFooter}>
              <View style={styles.backCardFooterBox}>
                <Image style={styles.backCardFooterIcon} source={icons.room} />

                <View style={styles.backCardFooterText}>
                  <AileronSemiBold
                    style={styles.homeBackCardText}
                    name="Max. Room & Board"
                  />
                  <AileronSemiBold
                    style={styles.homeBackCardText}
                    name="Rs. Per Day: 20,000"
                  />
                </View>
              </View>

              <View style={styles.backCardFooterBox}>
                <Image
                  style={styles.backCardFooterSecondIcon}
                  source={icons.maternity}
                />

                <View style={styles.backCardFooterText}>
                  <AileronSemiBold
                    style={styles.homeBackCardText}
                    name="Maternity"
                  />
                  <AileronSemiBold
                    style={styles.homeBackCardText}
                    name="60,000"
                  />
                </View>
              </View>
            </View>
          </View>

          <View style={styles.homeInfoContainerScroll}>
            <View style={styles.indicatorDots}>
              <TouchableOpacity style={[styles.inactiveDot, styles.dot]} />
              <TouchableOpacity style={[styles.dot, styles.activeDot]} />
              <TouchableOpacity style={[styles.dot, styles.inactiveDot]} />
            </View>
          </View>
        </LinearGradient>

        <View style={styles.dashboardContainer}>
          <View style={styles.dashboardContainerHeader}>
            <View>
              <AileronBold
                style={styles.dashboardContainerTextBold}
                name="Health & Wellness"
                numberOfLines={1}></AileronBold>
            </View>

            <View style={styles.dashboardContainerHeaderIcons}>
              <Image source={icons.leftArrowStraight} />
              <Image source={icons.rightArrowStraight} />
            </View>
          </View>

          <FlatList
            horizontal
            style={{height: vh * 25}}
            data={cardData}
            keyExtractor={(_item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({item}) => (
              <View
                style={[
                  styles.dashboardContainerCards,
                  {backgroundColor: item.backgroundColor},
                ]}>
                <View style={styles.cardLogoContainer}>
                  <Image style={styles.cardLogo} source={item.logo} />
                </View>

                <View style={styles.cardContent}>
                  <View style={{width: '70%'}}>
                    <AileronRegular
                      style={styles.dashboardContainerCardText}
                      name={item.name}
                      numberOfLines={2}></AileronRegular>
                  </View>

                  <Image source={item.image} />
                </View>
              </View>
            )}
          />

          <View style={styles.dashboardMeterContent}>
            <View style={styles.dashboardMeterDetail}>
              <View style={styles.dashboardMeterDetailTop}>
                <View>
                  <Image style={styles.meterIcon} source={icons.addSquare} />
                </View>

                <AileronBold
                  style={styles.meterDetailTextLight}
                  name="Total Deducted"
                  numberOfLines={1}></AileronBold>
              </View>

              <AileronBold
                name={'285, 000'}
                style={styles.meterDetailTextBold}
                numberOfLines={1}></AileronBold>

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
              <View style={styles.dashboardMeterDetailTop}>
                <View>
                  <Image style={styles.meterIcon} source={icons.chart} />
                </View>

                <AileronBold
                  style={styles.meterDetailTextLight}
                  name="Total Paid"
                  numberOfLines={1}></AileronBold>
              </View>

              <AileronBold
                name={'855, 000'}
                style={styles.meterDetailTextBold}
                numberOfLines={1}></AileronBold>

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
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeView;
