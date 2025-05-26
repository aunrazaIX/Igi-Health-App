import {createStackNavigator} from '@react-navigation/stack';
import LodgeClaim from '../../screens/LodgeClaim';
import AddTreatment from '../../screens/AddTreatment';
import AddDependent from '../../screens/AddDependent';
import Personal from '../../screens/Personal';

const DependentStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'Personal'}>
      <Stack.Screen name={'Personal'} component={Personal} />
      <Stack.Screen name={'AddDependent'} component={AddDependent} />
    </Stack.Navigator>
  );
};

export default DependentStack;
