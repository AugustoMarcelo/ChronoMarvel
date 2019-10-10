import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Movies() {
  return (
    <View>
      <Text>Movies Page</Text>
    </View>
  );
}
const tabBarIcon = ({ tintColor }) => (
  <Icon name="video-library" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Movies.navigationOptions = {
  tabBarLabel: 'Movies',
  tabBarIcon,
};
