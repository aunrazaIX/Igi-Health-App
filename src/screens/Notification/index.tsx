import React from 'react';
import NotificationView from '../../views/NotificationView';
import useNotificationViewModel from '../../viewmodels/useNotificationViewModel';



const Notification = () => {
  const { states } = useNotificationViewModel();

  const { functions } = useNotificationViewModel();
  const { goBack } = functions;

  const { data, SelectData } = states;
  return (
    <NotificationView NotificationData={data} selectData={SelectData}
    goBack={goBack}
    />
  )
}
export default Notification;







// import {useNavigation} from '@react-navigation/native';

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
