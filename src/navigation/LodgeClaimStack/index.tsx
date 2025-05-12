import {createStackNavigator} from '@react-navigation/stack';
import LodgeClaim from '../../screens/LodgeClaim';
import AddTreatment from '../../screens/AddTreatment';

const LodgeClaimStack = () => {
  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'LodgeClaimProcess'}>
      <Stack.Screen name={'LodgeClaimProcess'} component={LodgeClaim} />
      <Stack.Screen name={'AddTreatment'} component={AddTreatment} />
    </Stack.Navigator>
  );
};

export default LodgeClaimStack;
