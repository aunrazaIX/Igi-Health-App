import NotificationView from '../../views/NotificationView';
import useNotificationViewModel from '../../viewmodels/useNotificationViewModel';

const Notification = () => {
  const {states, functions} = useNotificationViewModel();
  const {
    data,
    loading,
    types,
    markLoading,
    selectedType,
    showDropDown,
    selectedNotification,
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
      markLoading={markLoading}
      loading={loading}
      selectedNotification={selectedNotification}
      onPressMarkNotification={onPressMarkNotification}
    />
  );
};
export default Notification;
