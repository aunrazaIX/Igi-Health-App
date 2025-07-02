import {useRef, useState} from 'react';
import {cardIcons, icons} from '../assets';
import {COLORS} from '../assets/theme/colors';
import {Alert, Animated, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {ImageSourcePropType} from 'react-native';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import formatCurrency from '../utils';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerStackParamList} from '../navigation/types';
import {useSelector} from 'react-redux';
import {RootState} from '@reduxjs/toolkit/query';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';

export type CardItemData = {
  logo?: ImageSourcePropType;
  name?: string;
  image?: ImageSourcePropType;
  backgroundColor?: string;
  to?: string;
  mainParent?: string;
  stChild?: string;
  type?: string;
};

export type HomeHeaderData = {
  logo: ImageSourcePropType;
  name: string;
  to: string;
};
type ClaimItem = {
  SubmiitedClaim?: number;
  DeductedAmount?: number;
  TotalPaid?: number;
};

type UseHomeViewModelReturn = {
  states: {
    selectedTab: string;
    cardData: CardItemData[];
    frontAnimatedStyle: {};
    backAnimatedStyle: {};
    homeCardData: any;
    claimData: {
      totalClaimAmount: string;
      deductedAmount: string;
      paidAmount: string;
    };
    loading: boolean;
    homeCardDataLoading: any;
  };
  functions: {
    onPressTab: (name: string) => void;
    animateCard: () => void;
    toggleDrawer: () => void;
    onPressMenu: (cardData: CardItemData) => void;
    onPressHeaderIcon: (to: string) => void;
    handleAssociatedApps: (
      url: string | {ios: string; android: string},
    ) => void;
    handleCardDownload: any;
  };
};
type ClaimStats = {
  totalClaimAmount: string;
  deductedAmount: string;
  paidAmount: string;
};

const useHomeViewModel = (): UseHomeViewModelReturn => {
  const user = useSelector((state: RootState) => state.auth.user);

  const navigate = useNavigation<DrawerNavigationProp<DrawerStackParamList>>();
  const [selectedTab, setSelectedTab] = useState<string>('login');
  const [data, setData] = useState<ClaimStats>({
    totalClaimAmount: '0',
    deductedAmount: '0',
    paidAmount: '0',
  });

  const animateValue = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);

  animateValue.addListener(({value}) => {
    currentValue.current = value;
  });
  // const {rememberMe, credentials} = useSelector(state => state.auth);

  const generateCardHTML = (data, user) => `
  ${console.log(data, 'dataaaaa usman')}
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Card</title>
  </head>

  <body>
    <table style="width: 100%">
      <tbody>
        <tr>
          <td>
            <div style="padding: 20px">
              <table style="width: 396px; border-radius: 24px; box-shadow: 0px 2px 12.1px rgba(0,0,0,0.25); padding: 20px; background: #fff; margin: auto; font-size: 16px; color: #393939;">
                <tbody>
                  <tr><td style="padding-bottom: 15px"><img src=${
                    icons.CancelIcon
                  } style="width: 107px; height: 48px" /></td></tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>Policy Number: </span><span>${
                        data[0]?.Policy_Number
                      }</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Class: </span><span>${data[0]?.Policy_CertNo}</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>CNIC: </span><span>${user?.cnic}</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Cert No: </span><span>${
                        data[0]?.Policy_Insured_Age
                      }</span>
                    </td>
                  </tr>

                  <tr>
                    <td style="padding-bottom: 5px">
                      <span>Policy Name: </span><span>${
                        data[0]?.Policy_Insured_Relaion
                      }</span>
                    </td>
                    <td style="text-align: end; padding-bottom: 5px">
                      <span>Age: </span><span>${
                        data[0]?.Policy_Insured_Age
                      }</span>
                    </td>
                  </tr>

                  <tr><td style="padding: 15px 0 5px">Card Holder Name</td></tr>
                  <tr><td style="font-size: 17px; font-weight: 600">${data
                    ?.find(item => item?.Policy_Insured_Relaion == 'Member')
                    ?.Policy_Insured_Name.trim()}</td></tr>
                </tbody>
              </table>

              <table style="width: 396px; border-radius: 24px; box-shadow: 0px 2px 12.1px rgba(0,0,0,0.25); padding: 20px; background: #fff; margin: 20px auto 0 auto; font-size: 16px; color: #393939;">
                <tbody>
                  <tr style="font-size: 20px">
                    <td style="padding-bottom: 5px; font-weight: 700">
                      Dependent <span style="color: #ee2560">Details</span>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table>
                        <tbody>
                          ${data
                            ?.filter(
                              _item =>
                                _item?.Policy_Insured_Relaion !== 'Member',
                            )
                            ?.map(
                              dep => `
                              <tr>
                                <td>${dep?.Policy_Insured_Name?.trim()}:</td>
                                <td>${dep?.Policy_Insured_Age}</td>
                              </tr>`,
                            )
                            .join('')}
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table style="font-weight: 600">
                        <tr><td style="padding-bottom: 15px">Valid from:</td><td style="padding-bottom: 15px">${
                          data[0]?.Policy_Start_Date
                        }</td></tr>
                        <tr><td>Valid till:</td><td>${
                          data[0]?.Policy_expiry_Date
                        }</td></tr>
                      </table>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td><img src="max-room.png" style="width: 30px; height: 30px" /></td>
                            <td style="font-size: 14px; padding-left: 5px">
                              <p style="margin: 0">Max. Room & Board</p>
                              <p style="margin: 0">Rs. Per Day: ${
                                data[0]?.Policy_Daily_RoomLimit
                              }</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                    <td>
                      <table>
                        <tbody>
                          <tr>
                            <td><img src="maternity.png" style="width: 21px; height: 34px" /></td>
                            <td style="font-size: 14px; padding-left: 5px">
                              <p style="margin: 0">Maternity</p>
                              <p style="margin: 0">${
                                data[0]?.Policy_MatLimit > 0
                                  ? 'Available'
                                  : 'Not Available'
                              }</p>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </body>
</html>
`;

  const handleCardDownload = async () => {
    try {
      const html = generateCardHTML(homeCardData, user);

      const options = {
        html,
        fileName: 'MyCard',
        directory: 'Documents',
      };

      const file = await RNHTMLtoPDF.convert(options);

      Alert.alert('Success', `PDF saved at:\n${file.filePath}`);
    } catch (error) {
      console.error('error arha hai:', error);
      Alert.alert('Error', 'Something went wrong');
    }
  };

  const animateCard = () => {
    if (currentValue.current >= 90) {
      Animated.timing(animateValue, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(animateValue, {
        toValue: 180,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }
  };

  const handleAssociatedApps = (
    url: string | {ios: string; android: string},
  ) => {
    if (url) {
      let finalUrl: string;
      if (typeof url === 'object' && url !== null) {
        finalUrl = Platform.OS === 'ios' ? url.ios : url.android;
      } else {
        finalUrl = url;
      }
      Linking.openURL(finalUrl).catch(err =>
        console.error('Failed to open URL:', err),
      );
    }
  };

  const rotateFront = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const rotateBack = animateValue.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  const frontAnimatedStyle = {
    transform: [{perspective: 1000}, {rotateY: rotateFront}],
  };

  const backAnimatedStyle = {
    transform: [{perspective: 1000}, {rotateY: rotateBack}],
  };

  // second APi Call

  const {
    data: homeCardData,
    loading: homeCardDataLoading,
    trigger,
  } = useApiHook({
    apiEndpoint: endpoints.policy.getPolicyDetails,
    method: 'get',
    skip: true,
  });

  // 1st api call
  const {data: policyData, loading: Loading} = useApiHook({
    apiEndpoint: endpoints.policy.getPolicyTypes,
    method: 'get',
    argsOrBody: {
      ClientCode: user?.ClientCode,
    },

    onSuccess: res => {
      let policyNumber;

      if (res?.length > 1) {
        res?.forEach(item => {
          if (item?.PolicyCode?.startsWith('G' || 'g')) {
            policyNumber = item?.PolicyCode;
          }
        });
      } else if (res?.length == 1) {
        policyNumber = res[0]?.PolicyCode;
      }

      let apiData = {
        policyCode: policyNumber,
        cnic: user.cnic,
      };
      trigger(apiData);
    },
  });

  const cardData: CardItemData[] = [
    {
      logo: cardIcons.benefits,
      name: 'Entitled Benefits',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'Benefits',
    },
    {
      logo: cardIcons.personal,
      name: 'Family Details',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Personal',
    },

    {
      logo: cardIcons.lodgeClaim,
      name: 'Lodge a Claim',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      mainParent: 'Tabs',
      stChild: 'LodgeClaim',
    },
    user?.showPriorApproval && {
      logo: cardIcons.taskDone,
      name: 'Prior Approval',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundLightBlue,
      mainParent: 'Tabs',
      stChild: 'PriorApproval',
      type: 'PriorApproval',
    },
    {
      logo: cardIcons.hospital,
      name: 'Hospital Directory',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundRed,
      to: 'Hospitals',
    },
    {
      logo: cardIcons.discountedCenters,
      name: 'Discount Centers',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'PanelHospitalList',
    },
    {
      logo: cardIcons.lodgeClaim,
      name: 'Claim History',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundBlue,
      to: 'ClaimHistory',
    },
    {
      logo: cardIcons.helpLine,
      name: 'Helplines',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundLightBlue,
      mainParent: 'Tabs',
      stChild: 'Helpline',
    },

    {
      logo: cardIcons.complaint,
      name: 'Complaint',
      image: icons.forwardArrow,
      backgroundColor: COLORS.cardBackgroundRed,
      link: 'corporate.services@igi.com.pk',
    },
  ].filter(Boolean);

  const {data: rawClaimData, loading} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getAllClaim,
    method: 'get',
    argsOrBody: {userid: '776'},
    onSuccess: res => {
      setData(sortClaimData(res?.Data));
    },
  });

  const onPressTab = (name: string) => setSelectedTab(name);
  const toggleDrawer = () => {
    navigate.toggleDrawer();
  };

  const onPressMenu = (cardData: CardItemData) => {
    if (cardData?.to) {
      navigate.navigate(cardData?.to);
      return;
    }
    if (cardData?.link?.includes('@')) {
      const emailUrl = `mailto:${cardData?.link}`;
      return Linking.openURL(emailUrl).catch(err =>
        Alert.alert('Error', err.message),
      );
    }

    if (cardData?.mainParent) {
      navigate.navigate(cardData?.mainParent, {
        screen: cardData?.stChild,
      });
    }
  };

  const onPressHeaderIcon = (to: string) => {
    if (to) {
      navigate.navigate(to);
    }
  };

  const sortClaimData = (item: ClaimItem[] = []) => {
    const totalClaimAmount = item?.reduce(
      (acc, curr) => acc + (curr?.SubmiitedClaim || 0),
      0,
    );
    const deductedAmount = item?.reduce(
      (acc, curr) => acc + (curr?.DeductedAmount || 0),
      0,
    );
    const paidAmount = item?.reduce(
      (acc, curr) => acc + (curr?.TotalPaid || 0),
      0,
    );

    return {
      totalClaimAmount: formatCurrency(totalClaimAmount),
      deductedAmount: formatCurrency(deductedAmount),
      paidAmount: formatCurrency(paidAmount),
    };
  };

  return {
    states: {
      selectedTab,
      cardData,
      backAnimatedStyle,
      frontAnimatedStyle,
      homeCardData,
      claimData: data,
      loading,
      homeCardDataLoading,
    },
    functions: {
      onPressTab,
      animateCard,
      toggleDrawer,
      onPressMenu,
      onPressHeaderIcon,
      handleAssociatedApps,
      handleCardDownload,
    },
  };
};

export default useHomeViewModel;
