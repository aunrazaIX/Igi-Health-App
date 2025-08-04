import {useRef, useState} from 'react';
import {newCardsIcons, icons} from '../assets';
import {Alert, Animated, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import endpoints from '../api/endspoints';
import useApiHook from '../hooks/useApiHook';
import {useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import {generateCardHTML} from '../utils/base64';

const useHomeViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const navigate = useNavigation();
  const [selectedTab, setSelectedTab] = useState('login');
  const [showDependantModal, setShowDependantModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);
  const [data, setData] = useState({
    totalClaimAmount: '0',
    deductedAmount: '0',
    paidAmount: '0',
  });

  const {trigger: reftchAllNotifications} = useApiHook({
    apiEndpoint: endpoints.notifications.getAll,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
      userid: user?.UserId,
    },
    onSuccess: data => {
      if (data?.length > 0) {
        let unreadNotifications = data?.filter(record => !record?.isRead);
        setNotificationCount(unreadNotifications?.length);
      }
    },
  });

  const animateValue = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);

  animateValue.addListener(({value}) => {
    currentValue.current = value;
  });

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version < 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission',
            message: 'App needs access to storage to save PDF file.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } else {
        return true;
      }
    } catch (err) {
      return false;
    }
  };

  const handleDependantsModal = value => {
    setShowDependantModal(value);
  };

  const handleCardDownload = async () => {
    try {
      const permissionGranted = await requestStoragePermission();
      if (permissionGranted) {
        const dir = RNFetchBlob.fs.dirs.DocumentDir;
        const filePath = `${dir}/IGIPolicyCard.pdf`;

        const html = generateCardHTML(homeCardData, user);
        const options = {
          html,
          fileName: 'IGIPolicyCard',
          directory: 'Documents',
          base64: true,
        };

        const file = await RNHTMLtoPDF.convert(options);
        const base64Data = file.base64;
        if (!base64Data) throw new Error('PDF generation failed.');
        await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');

        Alert.alert(
          'Download Complete ✔',
          'Your E-card has been downloaded. Do you want to open it now?',
          [
            {text: 'Cancel', style: 'cancel'},
            {
              text: 'Open',
              onPress: async () => {
                try {
                  await FileViewer.open(filePath);
                } catch (err) {
                  Alert.alert('Error', 'No app found to open the PDF.');
                }
              },
            },
          ],
          {cancelable: true},
        );
      }
    } catch (e) {
      Alert.alert('Error', 'No PDF app found. Please install a PDF viewer.');
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

  const handleAssociatedApps = url => {
    if (url) {
      let finalUrl;
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
  const {
    data: maternityData,
    loading: maternityLoading,
    trigger: maternityTrigger,
  } = useApiHook({
    apiEndpoint: endpoints.policy.getMaternity,
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
      maternityTrigger(apiData);
    },
  });

  const cardData = [
    {
      logo: newCardsIcons.benefits,
      name: 'Entitled Benefits',
      image: icons.forwardArrow,
      to: 'Benefits',
    },
    {
      logo: newCardsIcons.personal,
      name: 'Family Details',
      image: icons.forwardArrow,
      to: 'Personal',
    },
    user?.coverageType?.some(obj => obj?.isAllowed === true) && {
      logo: newCardsIcons.lodgeClaim,
      name: 'Lodge A Claim',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'LodgeClaim',
    },
    user?.showPriorApproval && {
      logo: newCardsIcons.taskDone,
      name: 'Prior Approval',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'PriorApproval',
      type: 'PriorApproval',
    },
    {
      logo: newCardsIcons.hospital,
      name: 'Network Hospitals',
      image: icons.forwardArrow,
      to: 'Hospitals',
    },
    {
      logo: newCardsIcons.discountedCenters,
      name: 'Discount Centers',
      image: icons.forwardArrow,
      to: 'PanelHospitalList',
    },
    {
      logo: newCardsIcons.lodgeClaim,
      name: 'Claim History',
      image: icons.forwardArrow,
      to: 'ClaimHistory',
    },
    {
      logo: newCardsIcons.helpLine,
      name: 'Helplines',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'Helpline',
    },

    {
      logo: newCardsIcons.complaint,
      name: 'Complaint',
      image: icons.forwardArrow,
      link: 'corporate.services@igi.com.pk',
    },
  ].filter(Boolean);

  const {data: rawClaimData, loading} = useApiHook({
    apiEndpoint: endpoints.claimHistory.getDxcClaims,
    method: 'get',
    argsOrBody: {userid: user?.UserId},
    onSuccess: res => {
      let temp = sortClaimData(res?.Data);
      setData(temp);
    },
  });

  const onPressTab = name => setSelectedTab(name);
  const toggleDrawer = () => {
    navigate.toggleDrawer();
  };

  const onPressMenu = cardData => {
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

  const onPressHeaderIcon = to => {
    if (to) {
      navigate.navigate(to);
    }
  };

  const sortClaimData = (items = []) => {
    let totalClaimAmount = 0;
    let deductedAmount = 0;
    let paidAmount = 0;

    for (const item of items) {
      totalClaimAmount += item.SubmiitedClaim ?? 0;
      deductedAmount += item.DeductedAmount ?? 0;
      paidAmount += item.TotalPaid ?? 0;
    }

    return {
      totalClaimAmount,
      deductedAmount,
      paidAmount,
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
      maternityData,
      maternityLoading,
      loading,
      homeCardDataLoading,
      showDependantModal,
      notificationCount,
    },
    functions: {
      onPressTab,
      animateCard,
      toggleDrawer,
      onPressMenu,
      onPressHeaderIcon,
      handleAssociatedApps,
      handleCardDownload,
      handleDependantsModal,
    },
  };
};

export default useHomeViewModel;
