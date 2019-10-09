import React from 'react';
import { StatusBar } from 'react-native';

import './config/ReactotronConfig';

import Routes from './Routes';

export default function Index() {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#fff" />
      <Routes />
    </>
  );
}
