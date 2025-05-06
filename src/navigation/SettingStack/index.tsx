import { createStackNavigator } from '@react-navigation/stack';
import Settings from '../../screens/Settings';
import Notification from '../../screens/Notification';
import ForgotPassword from '../../screens/ForgotPassword';




const SettingStack = () => {
    const Stack = createStackNavigator();
    return (
        <Stack.Navigator initialRouteName="Settings" screenOptions={{ headerShown: false }} >

            <Stack.Screen name="Settings" component={Settings} />

          
            <Stack.Screen name="ForgotPassword" component={ForgotPassword} />

         
            <Stack.Screen name="Notifications" component={Notification} />

        </Stack.Navigator>
    );
};
export default SettingStack;
