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
          This app was made by a Marvel fan. It is only meant for fans to watch
          every movie in Marvel's wonderful cinematic universe. The movies are
          listed in chronological order. As soon as possible, I will enter the
          series that will debut at Disney+.
        </Paragraph>
        <Paragraph>
          Please feel free to email me with criticism, suggestions, compliments
          or visit my github. In my repository is all the source code of the
          application and also the API where I list the movies, series and
          characters.
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
