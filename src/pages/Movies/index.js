import React from 'react';
import { View, Text } from 'react-native';

export default function Movies() {
  return (
    <View>
      <Text>Movies Page</Text>
    </View>
  );
}

Movies.navigationOptions = {
  tabBarLabel: 'Movies',
};
