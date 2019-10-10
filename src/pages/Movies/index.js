import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Header from '../../components/Header';
import Background from '../../components/Background';
import { Shadow, Separator } from './styles';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  cover: {
    borderRadius: 4,
    height: 218,
    width: 150,
    marginHorizontal: 10,
  },
});

export default function Movies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function loadMovies() {
      const response = await api.get('/movies', {
        params: { order: 'chronology' },
      });

      setMovies(response.data.data);
    }

    loadMovies();
  }, []);

  return (
    <Background>
      <Header />

      {movies.length > 0 ? (
        <FlatList
          style={styles.list}
          data={movies}
          keyExtractor={movie => String(movie.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <Shadow>
              <TouchableOpacity>
                <Image style={styles.cover} source={{ uri: item.cover_url }} />
              </TouchableOpacity>
            </Shadow>
          )}
        />
      ) : (
        <ActivityIndicator
          style={{ marginTop: 20 }}
          size={32}
          color="#D63031"
        />
      )}

      <Separator />
    </Background>
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
