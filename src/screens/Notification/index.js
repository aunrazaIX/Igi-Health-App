import NotificationView from '../../views/NotificationView';
import useNotificationViewModel from '../../viewmodels/useNotificationViewModel';

const Notification = () => {
  const {states, functions} = useNotificationViewModel();
  const {data, loading, types, selectedType, showDropDown} = states;
  const {onSelectType, onPressTypeDropDown} = functions;
  return (
    <NotificationView
      onSelectType={onSelectType}
      selectedType={selectedType}
      showDropDown={showDropDown}
      onPressTypeDropDown={onPressTypeDropDown}
      types={types}
      data={data}
      loading={loading}
    />
  );
};
export default Notification;
