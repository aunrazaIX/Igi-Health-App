import { createStackNavigator } from '@react-navigation/stack';
import AddTreatment from '../../screens/AddTreatment';
import PriorApproval from '../../screens/PriorApproval';

const LodgeClaimStack = ({ route }) => {

  const { type } = route?.params || {};

  const Stack = createStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName={'PriorApproval'}>
      <Stack.Screen
        initialParams={{ type }}
        name={'PriorApproval'}
        component={PriorApproval}
      />
      <Stack.Screen name={'AddTreatment'} component={AddTreatment} />
    </Stack.Navigator>
  );
};

export default LodgeClaimStack;
