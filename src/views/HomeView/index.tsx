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
import { styles } from './style';
import { icons, images } from '../../assets';
import AileronBold from '../../components/AileronBold';
import AileronSemiBold from '../../components/AileronSemiBold';
import AileronLight from '../../components/AileronLight';
import AileronRegular from '../../components/AileronRegular';
import { vh, vw } from '../../assets/theme/dimension';
import { COLORS } from '../../assets/theme/colors';

type CardItem = {
  logo: any;
  name: string;
  image: any;
  backgroundColor: any;
};

type HomeViewProps = {
  cardData: CardItem[];
  navigation: any
};

const HomeView: React.FC<HomeViewProps> = ({ cardData, navigation }) => {
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

              <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
                <Image source={icons.menu} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.homeInfoContainer}>
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
                  <Image source={images.flipCard} />
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

            {/* <View style={styles.dashboardContainerHeaderIcons}>
              <Image source={icons.leftArrowStraight} />
              <Image source={icons.rightArrowStraight} />
            </View> */}
          </View>

          <FlatList
            horizontal
            data={cardData}
            keyExtractor={(_item, index) => index.toString()}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.dashboardContainerCards,
                  { backgroundColor: item.backgroundColor },
                ]}>
                <View style={styles.cardLogoContainer}>
                  <Image style={styles.cardLogo} source={item.logo} />
                </View>

                <View style={styles.cardContent}>
                  <View
                    style={{ width: '70%' }}
                  >
                    <AileronRegular
                      style={styles.dashboardContainerCardText}
                      name={item.name}
                      numberOfLines={2}
                    />
                  </View>

                  <Image source={item.image} />
                </View>
              </View>
            )}
          />
          <View>
            <View style={styles.meterContainer}>
              <Image source={icons.claimStatistics} style={styles.statisticsIcon} />
              <AileronSemiBold name='Claim Statistics' style={styles.claimTittle} />
            </View>
            <View></View>
          </View>

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

          <View>
            <AileronSemiBold name={'Associated Apps'} style={styles.associatedTittle} />
            <View style={styles.associatedContainer}>
              <View style={styles.associatedImageContainer}>
                <Image source={images.LogoLife} style={styles.associatedImage} />
              </View>
              <View style={styles.associatedImageContainer}>
                <Image source={images.sehatKahani} style={styles.associatedImage} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomeView;
