import NotificationView from '../../views/NotificationView';
import useNotificationViewModel from '../../viewmodels/useNotificationViewModel';

const Notification = () => {
  const {states, functions} = useNotificationViewModel();
  const {
    data,
    loading,
    types,
    selectedType,
    showDropDown,
    selectedNotification,
    markLoading
  } = states;
  const {onSelectType, onPressTypeDropDown, onPressMarkNotification} =
    functions;
  return (
    <NotificationView
      onSelectType={onSelectType}
      selectedType={selectedType}
      showDropDown={showDropDown}
      onPressTypeDropDown={onPressTypeDropDown}
      types={types}
      data={data}
      loading={loading}
      markLoading={markLoading}
      selectedNotification={selectedNotification}
      onPressMarkNotification={onPressMarkNotification}
    />
  );
};
export default Notification;
