import { createStackNavigator } from '@react-navigation/stack';
import Helpline from '../../screens/Helpline';





const SettingStack = () => {
    const Stack = createStackNavigator();

    return (
        <Stack.Navigator initialRouteName="Hepline" screenOptions={{ headerShown: false }} >

            <Stack.Screen name="Helpline" component={Helpline} />

        </Stack.Navigator>
    );
};
export default SettingStack;
