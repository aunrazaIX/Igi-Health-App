// import {useNavigation} from '@react-navigation/native';

import { useNavigation } from "@react-navigation/native";

// type useNotificationViewModel = {
//   functions: {
//     goBack: () => void;
//   };
// };
// export const useNotificationViewModel = (): useNotificationViewModel => {
//   const navigation = useNavigation();

//   const goBack = () => {
//     navigation.goBack();
//   };

//   return {
//     functions: {
//       goBack,
//     },
//   };
// };


type UseNotificationViewModel = {
  states: {
    data: NotificatonData[];
    SelectData: NotificatonSelect[];
  };
  functions: {
    goBack: ()=>void
  }
};

type NotificatonData = {
  id: number;
  title: string;
  time: string;
};

type NotificatonSelect = {
  id: number;
  name: string;
};




const useNotificationViewModel = (): UseNotificationViewModel => {
  const navigation = useNavigation();
  const data: NotificatonData[] = [
    {
      id: 1,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 2,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 3,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 4,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 5,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 6,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 7,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 8,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 9,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
    {
      id: 10,
      title: 'Claim Request: Your application status awaits, check now.',
      time: 'Today at 11:36 AM',
    },
  ];

  const SelectData: NotificatonSelect[] = [
    {
      id: 1,
      name: 'ALL',
    },
    {
      id: 2,
      name: 'Unread',
    },
    {
      id: 3,
      name: 'Read',
    },
  ];

  const goBack = () => {
    navigation.goBack()
  }

  return {
    states: {
      data,
      SelectData,
      
    },
    functions:{
      goBack
    }
  };
};

export default useNotificationViewModel;
