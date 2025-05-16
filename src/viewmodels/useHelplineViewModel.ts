import { useNavigation } from '@react-navigation/native';
import { Alert, Linking } from 'react-native';


export type ContactInfo = {
  name: string;
  tel: string;
  fax: string;
  emergencyTel: string;
  claimsTel: string;
  address: string;
};

export type ClaimAssistance = {
  title: string;
  name: string;
  phone: string;
  position?: string;
  cell?: string;
};
export type Hotlines = {
  cities: HotlineCity[];
  emails: HotlineEmail[];
  website: string;
};
export type HotlineEmail = {
  label: string;
  email: string;
};
export type HotlineCity = {
  city: string;
  mobile: string;
};
type UseHelplineViewModelReturnType = {
  states: {
    contactInfo: ContactInfo;
    claimAssistance: ClaimAssistance[];
    hotlines: Hotlines;
  };
  functions: {
    goBack: () => void;
    onPress: () => void
  };
};

const useHelplineViewModel = (): UseHelplineViewModelReturnType => {
  const navigation = useNavigation();
  const contactInfo: ContactInfo = {
    name: 'Amber Inayat Ali',
    tel: '+92-21-35369626',
    fax: '+92-21-35290042 | 021-35290043',
    emergencyTel: '+92 42 34503333',
    claimsTel: '021-111-111-711',
    address:
      'IGI Life Insurance Limited 7th Floor, The Forum, Suit No. 701-713, G-20 Khayaban-e-Jami, Block 9, Clifton Karachi 75600, Pakistan',
  };

  const claimAssistance: ClaimAssistance[] = [
    {
      title: 'For Claims Assistance',
      name: 'Mr. Muhammad Salman',
      phone: '021-35369640',
    },
    {
      title: 'In-Patient Claim Issues',
      name: 'Ms. Danish Ahmed',
      position: 'Deputy Manager',
      phone: '021-35369608',
    },
    {
      title: 'Out-Patient Claim Issues',
      name: 'Ms. Afsheen Minhal',
      position: 'Deputy Manager',
      phone: '021-35369636',
    },
    {
      title: 'Individual Life Claim Issues',
      name: 'Mr. Ghulam Mustafa',
      position: 'Deputy Manager',
      phone: '021-35369638',
    },
    {
      title: 'Individual Banca Claim Issues',
      name: 'Mr. Ashfaq Ahmed',
      position: 'Deputy Manager',
      phone: '021-35369642',
    },
    {
      title: 'Faisal Bank Medical Claim Issues',
      name: 'Mr. Farooq Shaikh',
      position: 'Deputy Manager',
      phone: 'Ext: 703',
      cell: '0308-8173118',
    },
  ];
  const hotlines: Hotlines = {
    cities: [
      { city: 'Islamabad', mobile: '0302-5440150' },
      { city: 'Karachi', mobile: '0300-9284674 | 0300-8266930' },
      { city: 'Lahore', mobile: '0300-4748570' },
    ],
    emails: [
      {
        label: 'Policy Maintenance & Administration',
        email: 'servicedesk.pakistan@igi.com.pk',
      },
      {
        label: 'Claims submission related queries & follow-up',
        email: 'claims.pakistan@igi.com.pk',
      },
      {
        label: 'Pre-Approval & Network Related Queries',
        email: 'approvalsubmission.pakistan@igi.com.pk',
      },
    ],
    website: 'www.igilife.com.pk',
  };

  const goBack = () => {
    navigation.goBack();
  };

  const onPress = (type: 'phone' | 'email' | 'map', value: string) => {
    let url = '';

    switch (type) {
      case 'phone':
        url = `tel:${value}`;
        break;
      case 'email':
        url = `mailto:${value}`;
        break;
      case 'map':
        url = `https://www.google.com/maps?q=${encodeURIComponent(value)}`;
        break;
      default:
        Alert.alert('Invalid Action', 'Unsupported link type');
        return;
    }

    Linking.openURL(url).catch(err => {
      console.error('Error opening URL:', err);
      Alert.alert('Error', 'Unable to open link');
    });
  };

  return {
    states: {
      contactInfo,
      claimAssistance,
      hotlines,
    },
    functions: {
      goBack,
      onPress
    },
  };
};

export default useHelplineViewModel;
