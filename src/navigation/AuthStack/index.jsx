import {createStackNavigator} from '@react-navigation/stack';
import Login from '../../screens/Login/Index';
import ForgotPassword from '../../screens/ForgotPassword';
import Intro from '../../screens/Intro';
import {useSelector} from 'react-redux';

const AuthStack = () => {
  const Stack = createStackNavigator();
  const isIntro = useSelector(state => state.general.isIntroSlider);

  return (
    <Stack.Navigator
      initialRouteName={isIntro ? 'Intro' : 'Login'}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Intro" component={Intro} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
    </Stack.Navigator>
  );
};
export default AuthStack;
