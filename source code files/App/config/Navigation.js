import React from 'react';
// import {TouchableOpacity} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
// import Icon from 'react-native-vector-icons/Ionicons';

import Example from '../screens/Example';
// import colors from '../constants/colors';
// import Length from '../screens/Length';
// import Temparature from '../screens/Temparature';
// import Weight from '../screens/Weight';

const ModalStack = createStackNavigator();
const ModalStackScreen = () => (
  <ModalStack.Navigator screenOptions={{presentation: 'modal'}}>
    <ModalStack.Screen
      name="Example"
      component={Example}
      options={{headerShown: false}}
    />
  </ModalStack.Navigator>
);

export default () => (
  <NavigationContainer>
    <ModalStackScreen />
  </NavigationContainer>
);
