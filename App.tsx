import {View, Text} from 'react-native';
import React from 'react';
// import Index from './src/screens/Login/Index'
import Signup from './src/screens/Signup';

const App = () => {
  return (
    <View style={{flex: 1}}>
      {/* <Index/> */}
      <Signup />
    </View>
  );
};

export default App;
