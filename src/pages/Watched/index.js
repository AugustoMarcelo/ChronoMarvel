import React from 'react';
import { View, Text } from 'react-native';

export default function Watched() {
  return (
    <View>
      <Text>Watched Page</Text>
    </View>
  );
}

Watched.navigationOptions = {
  tabBarLabel: 'Watched',
};
