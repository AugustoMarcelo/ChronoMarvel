import React from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import IconMC from 'react-native-vector-icons/MaterialCommunityIcons';

import Background from '../../components/Background';
import Header from '../../components/Header';

import { Card, Paragraph, Separator, Contact } from './styles';

export default function About() {
  return (
    <Background>
      <Header />
      <Card>
        <Paragraph>Hello, Friends</Paragraph>
        <Paragraph>
          This app was made by a Marvel fan. It lists all MCU (Marvel Cinematic
          Universe) movies so you can watch them in chronological order. As soon
          as possible, the series that will debut at Disney+ will also be
          included.
        </Paragraph>
        <Paragraph>
          Please feel free to email me with criticism, suggestions, compliments
          or visit my github. There you will find the source code of this
          application, as well as the API (not yet released) where I list all
          the movies, series and characters of this universe.
        </Paragraph>
        <Separator />
        <View>
          <Contact>
            <Icon
              name="email"
              size={20}
              color="#aaa"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: '#aaa' }}>mrclgst10@gmail.com</Text>
          </Contact>
          <Contact>
            <IconMC
              name="github-circle"
              size={20}
              color="#aaa"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: '#aaa' }}>github.com/augustomarcelo</Text>
          </Contact>
          <Contact>
            <IconMC
              name="linkedin-box"
              size={20}
              color="#aaa"
              style={{ marginRight: 10 }}
            />
            <Text style={{ color: '#aaa' }}>
              https://www.linkedin.com/in/augustomarcelo
            </Text>
          </Contact>
        </View>
      </Card>
    </Background>
  );
}

const tabBarIcon = ({ tintColor }) => (
  <Icon name="info-outline" size={20} color={tintColor} />
);

tabBarIcon.propTypes = {
  tintColor: PropTypes.string.isRequired,
};

About.navigationOptions = {
  tabBarLabel: 'About',
  tabBarIcon,
};
