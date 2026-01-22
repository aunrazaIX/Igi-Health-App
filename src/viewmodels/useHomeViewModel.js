import {useCallback, useRef, useState} from 'react';
import {newCardsIcons, icons} from '../assets';
import {Alert, Animated, Linking, Platform} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {PermissionsAndroid} from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import FileViewer from 'react-native-file-viewer';
import RNFetchBlob from 'rn-fetch-blob';
import {generateCardHTML} from '../utils/base64';
import {setPolicy, setSelectedPolicyObject} from '../redux/generalSlice';
import useApiHook from '../hooks/useApiHook';
import endpoints from '../api/endspoints';
import {setWidgetToken} from '../redux/authSlice';

const useHomeViewModel = () => {
  const {user, token, widgetToken} = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [selectedTab, setSelectedTab] = useState('login');
  const [showDependantModal, setShowDependantModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(null);
  const [showDropDown, setShowDropDown] = useState(false);
  const showDropdownButton = user?.policies?.length > 1;
  const {selectedPolicy, selectedPolicyObject} = useSelector(
    state => state.general,
  );
  const {allowClaims, isOladocFeatures} = user || {};
  const onPressPolicy = policy => {
    dispatch(setPolicy(policy.policyNumber));
    dispatch(setSelectedPolicyObject(policy));
    setShowDropDown(false);
  };

  const {data, loading} = useApiHook({
    method: 'get',
    apiEndpoint: endpoints.policy.getPolicyDetails(selectedPolicy),
  });

  const {trigger: generateToken} = useApiHook({
    method: 'post',
    argsOrBody: {
      identification_field: 'PHONE_NUMBER',
      identification_value: user?.phoneNo,
      name: user?.memberName,
      city: '',
      country_code: '+92',
      company_name: selectedPolicyObject?.companyName,
      policy: selectedPolicyObject?.policyNumber,
    },
    instance: 'oladoc',
    headers: {
      'x-api-key': 'ASe]dcX1Pjf91e]dcIGI-demo0qxNd_I',
    },
    apiEndpoint: endpoints.oladoc.generateToken,
    onSuccess: res => {
      if (res?.data?.data && user && token) {
        dispatch(setWidgetToken(res?.data?.data?.token));
      }
    },
    onError: error => {
      dispatch(setWidgetToken(null));
      console.log('Error on', error);
    },
  });
  const apiData = Object.values(data?.data || {})[0]?.[0];
  const matData = data?.data?.matPolicyDetail?.[0];

  const homeCardData = {
    memberName: user?.memberName,
    cnic: user?.cnic,
    policyNumber: selectedPolicy,
    policyType: selectedPolicyObject?.policyType,
    policyClass: apiData?.policy_Class ?? '',
    policyCert: apiData?.policy_CertNo ?? '',
    age: apiData?.policy_Insured_Age ?? '',
    insuredName: apiData?.policy_Insured_Name ?? '',
    startDate: apiData?.policy_Start_Date ?? '',
    endDate: apiData?.policy_Expiry_Date ?? '',
    perDay: apiData?.policy_Daily_RoomLimit ?? '',
    matLimit: matData?.policy_MatLimit ?? '',
  };
  const {data: dependentData} = useApiHook({
    apiEndpoint: endpoints.dependent.getDependents,
    method: 'get',
    argsOrBody: {
      PolicyNumber: selectedPolicy,
    },
  });
  const dependentsList =
    dependentData?.data?.map(item => ({
      name: item?.memberName?.trim(),
      relation: item?.relation,
      age: item?.age,
    })) ?? [];

  const {trigger: getNotification} = useApiHook({
    apiEndpoint: endpoints.notifications.getAll,
    method: 'post',
    argsOrBody: {
      pagination: {
        isAllRecord: true,
      },
    },
    onSuccess: res => {
      if (res?.data?.dataList?.length > 0) {
        let unreadNotifications = res?.data?.dataList?.filter(
          record => !record?.isRead,
        );
        setNotificationCount(unreadNotifications?.length);
      }
    },
  });

  const onPullToRefresh = () => {
    getNotification();
  };
  const {
    loading: dependantLoading,
    trigger: getDxcClaims,
    data: claimData,
    transformResponse,
  } = useApiHook({
    apiEndpoint: endpoints.claimHistory.getDxcClaims,
    method: 'get',
    argsOrBody: {
      cnic: user?.cnic,
    },
    onSuccess: res => {
      let temp = sortClaimData(res?.data);
      transformResponse(temp);
    },
  });
  useFocusEffect(
    useCallback(() => {
      getDxcClaims();
      if (allowClaims || isOladocFeatures) {
        generateToken();
      }
    }, [selectedPolicyObject]),
  );
  const sortClaimData = (items = []) => {
    let totalClaimAmount = 0;
    let deductedAmount = 0;
    let paidAmount = 0;

    for (const item of items) {
      totalClaimAmount += item.submiitedClaim ?? 0;
      deductedAmount += item.deductedAmount ?? 0;
      paidAmount += item.totalPaid ?? 0;
    }

    return {
      totalClaimAmount,
      deductedAmount,
      paidAmount,
    };
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

      const html = generateCardHTML(homeCardData, user, dependentsList);

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
    } catch (err) {
      Alert.alert('Error', 'No PDF app found. Please install a PDF viewer.');
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
      to: 'PersonalStack',
    },
    widgetToken &&
      user?.allowClaims && {
        logo: newCardsIcons.lodgeClaim,
        name: 'Lodge Claim',
        image: icons.forwardArrow,
        to: 'Widget',
        widgetName: 'raise-claim',
        title: 'Lodge Claim',
      },
    user?.allowPriorApprovals && {
      logo: newCardsIcons.taskDone,
      name: 'Prior\nApproval',
      image: icons.forwardArrow,
      mainParent: 'Tabs',
      stChild: 'PriorApprovalStack',
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
    widgetToken &&
      user?.allowClaims && {
        logo: newCardsIcons.claimHistory,
        name: 'Claim History',
        image: icons.forwardArrow,
        to: 'Widget',
        widgetName: 'track-claim',
        title: 'Claim History',
      },
    widgetToken &&
      user?.isOladocFeatures && {
        logo: newCardsIcons.videoConsultation,
        name: 'Video Consultation',
        image: icons.forwardArrow,
        to: 'Widget',
        widgetName: 'vc',
        title: 'Video Consultation',
      },
    widgetToken &&
      user?.isOladocFeatures && {
        logo: newCardsIcons.inClinic,
        name: 'In-Clinic Appointment',
        image: icons.forwardArrow,
        to: 'Widget',
        widgetName: 'opd',
        title: 'In-Clinic Appointment',
      },
    widgetToken &&
      user?.isOladocFeatures && {
        logo: newCardsIcons.bookLabTests,
        name: 'Book Lab test',
        image: icons.forwardArrow,
        to: 'Widget',
        widgetName: 'labs',
        title: 'Book Lab test',
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
    {
      logo: newCardsIcons.bankDetails,
      name: 'Payout Account',
      image: icons.forwardArrow,
      to: 'AccountDetails',
    },
  ].filter(Boolean);

  const onPressTab = name => setSelectedTab(name);

  const toggleDrawer = () => navigate.toggleDrawer();

  const onPressMenu = item => {
    if (item?.to) {
      let params = {};
      if (item?.widgetName) {
        params.widgetName = item?.widgetName;
        params.title = item?.title;
      }
      navigate.navigate(item.to, params);
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
      dependantLoading,
      selectedTab,
      cardData,
      frontAnimatedStyle,
      backAnimatedStyle,
      homeCardData,
      claimData,
      loading,
      showDependantModal,
      notificationCount,
      showDropDown,
      showDropdownButton,
      selectedPolicy,
    },
    functions: {
      dependentsList,
      onPressTab,
      animateCard,
      toggleDrawer,
      onPressMenu,
      onPressHeaderIcon,
      handleAssociatedApps,
      handleCardDownload,
      handleDependantsModal,
      onPullToRefresh,
      setShowDropDown,
      onPressPolicy,
    },
  };
};

export default useHomeViewModel;
