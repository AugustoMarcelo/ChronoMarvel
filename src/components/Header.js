import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

import logo from '../assets/logo.png';

const styles = StyleSheet.create({
  header: {
    height: 64,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',

    elevation: 2,
  },
  logo: {
    width: 48,
    height: 48,
  },
});

export default function Header() {
  return (
    <View style={styles.header}>
      <Image style={styles.logo} source={logo} />
    </View>
  );
}
