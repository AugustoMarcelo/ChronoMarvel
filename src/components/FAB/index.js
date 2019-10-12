import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function FAB({ onRemoveAll }) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#D63031',
        height: 62,
        width: 62,
        borderRadius: 31,
        bottom: 22,
        right: 22,
        position: 'absolute',
        elevation: 4,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      onPress={onRemoveAll}
    >
      <Icon name="delete-sweep-outline" size={32} color="#fff" />
    </TouchableOpacity>
  );
}

FAB.propTypes = {
  onRemoveAll: PropTypes.func.isRequired,
};
