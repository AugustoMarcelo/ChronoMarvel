import React from 'react';
import { View, Text } from 'react-native';

export default function About() {
  return (
    <View>
      <Text>About Page</Text>
    </View>
  );
}

About.navigationOptions = {
  tabBarLabel: 'About',
};
