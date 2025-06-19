import {createStackNavigator} from '@react-navigation/stack';
import Settings from '../../screens/Settings';
import Notification from '../../screens/Notification';
import ForgotPassword from '../../screens/ForgotPassword';
import Profile from '../../screens/Profile';
import TermsAndCondition from '../../views/TermsAndConditionsView';

const SettingStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="Settings"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="account" component={Profile} />

      <Stack.Screen name="Privacy" component={TermsAndCondition} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Notifications" component={Notification} />
    </Stack.Navigator>
  );
};
export default SettingStack;
