import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Watched() {
  return (
    <View>
      <Text>Watched Page</Text>
    </View>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="playlist-add-check" size={24} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

Watched.navigationOptions = {
  tabBarLabel: 'Watched',
  tabBarIcon,
};
