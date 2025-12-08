import {useRef, useState} from 'react';
import {newCardsIcons, icons} from '../assets';
import {Alert, Animated, Linking, Platform} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import {generateCardHTML} from '../utils/base64';

const useHomeViewModel = () => {
  const {user} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigation();

  const [selectedTab, setSelectedTab] = useState('login');
  const [showDependantModal, setShowDependantModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(null);

  const [data, setData] = useState({
    totalClaimAmount: 45000,
    deductedAmount: 3000,
    paidAmount: 42000,
  });
console.log(user.policies[0].policyNumber, 'hgg')
  const homeCardData = {
    Policy_Class: 'Corporate',
    memberName: user?.UserName,
    memberId: 'IGI-123456',
    policyNumber: user?.policies?.policyNumber,
    employeeCode: 'EMP-001',
    expiryDate: '31-Dec-2025',
  };

  const maternityData = {
    entitlement: 65000,
    utilized: 12000,
    remaining: 53000,
  };

  const allNotifications = [
    {id: 1, title: 'Claim Approved', isRead: false},
    {id: 2, title: 'New Policy Updated', isRead: false},
    {id: 3, title: 'Welcome to IGI', isRead: true},
  ];

  const onPullToRefresh = () => {
    const unread = allNotifications.filter(n => !n.isRead).length;
    setNotificationCount(unread);
  };

  const animateValue = useRef(new Animated.Value(0)).current;
  const currentValue = useRef(0);

  animateValue.addListener(({value}) => {
    currentValue.current = value;
  });

  const animateCard = () => {
    Animated.timing(animateValue, {
      toValue: currentValue.current >= 90 ? 0 : 180,
      duration: 800,
      useNativeDriver: true,
    }).start();
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

  const requestStoragePermission = async () => {
    try {
      if (Platform.OS === 'android' && Platform.Version < 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        );
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      }
      return true;
    } catch (err) {
      return false;
    }
  };

  const handleCardDownload = async () => {
    try {
      const permissionGranted = await requestStoragePermission();
      if (!permissionGranted) return;

      const dir = RNFetchBlob.fs.dirs.DocumentDir;
      const filePath = `${dir}/IGIPolicyCard.pdf`;

      const html = generateCardHTML(homeCardData, user, maternityData);

      const options = {
        html,
        fileName: 'IGIPolicyCard',
        directory: 'Documents',
        base64: true,
      };

      const file = await RNHTMLtoPDF.convert(options);
      const base64Data = file.base64;

      await RNFetchBlob.fs.writeFile(filePath, base64Data, 'base64');

      Alert.alert(
        'Download Complete ✔',
        'Your E-card has been downloaded. Do you want to open it now?',
        [
          {text: 'Cancel', style: 'cancel'},
          {
            text: 'Open',
            onPress: () => FileViewer.open(filePath),
          },
        ],
      );
    } catch (err) {
      Alert.alert('Error', 'Unable to open PDF.');
    }
  };

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
    {
      logo: newCardsIcons.lodgeClaim,
      name: 'Lodge Claim',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'LodgeClaim',
    },
    {
      logo: newCardsIcons.taskDone,
      name: 'Prior\nApproval',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'PriorApproval',
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
      logo: newCardsIcons.claimHistory,
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
    // {
    //   logo: newCardsIcons.bankDetails,
    //   name: 'Payout Account',
    //   image: icons.forwardArrow,
    //   to: 'AccountDetails',
    // },
  ];

  const onPressTab = name => setSelectedTab(name);

  const toggleDrawer = () => navigate.toggleDrawer();

  const onPressMenu = item => {
    if (item?.to) {
      navigate.navigate(item.to);
      return;
    }

    if (item?.link?.includes('@')) {
      return Linking.openURL(`mailto:${item.link}`);
    }

    if (item.mainParent) {
      return navigate.navigate(item.mainParent, {screen: item.stChild});
    }
  };

  const onPressHeaderIcon = to => {
    if (to) navigate.navigate(to);
  };

  const handleAssociatedApps = url => {
    if (!url) return;
    const finalUrl =
      typeof url === 'object'
        ? Platform.OS === 'ios'
          ? url.ios
          : url.android
        : url;

    Linking.openURL(finalUrl);
  };

  const handleDependantsModal = v => {
    if (currentValue.current >= 90) setShowDependantModal(v);
  };

  return {
    states: {
      selectedTab,
      cardData,
      frontAnimatedStyle,
      backAnimatedStyle,
      homeCardData,
      maternityData,
      claimData: data,
      loading: false,
      homeCardDataLoading: false,
      maternityLoading: false,
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
      onPullToRefresh,
    },
  };
};

export default useHomeViewModel;
