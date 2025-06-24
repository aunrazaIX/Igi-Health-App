import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login/Index';
import ForgotPassword from '../../screens/ForgotPassword';

const AuthStack = () => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};
export default AuthStack;
