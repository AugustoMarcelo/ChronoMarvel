import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Header from '../../components/Header';
import Background from '../../components/Background';

export default function Watched() {
  return (
    <Background>
      <Header />
      <Text>Watched Page</Text>
    </Background>
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
