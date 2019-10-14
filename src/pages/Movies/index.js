import React, { useState, useEffect, useRef } from 'react';
import {
  FlatList,
  View,
  Text,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';
import getRealm from '../../services/realm';

import Header from '../../components/Header';
import Background from '../../components/Background';
import { Card } from '../../components/styles';
import { Shadow, Separator, CardTop, MoreInfo, Button } from './styles';

const styles = StyleSheet.create({
  list: {
    marginTop: 20,
  },
  listEmpty: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  cover: {
    borderRadius: 4,
    height: 218,
    width: 150,
  },
  label: {
    fontSize: 13,
    color: '#ccc',
  },
  info: {
    fontSize: 15,
    color: '#333',
    marginBottom: 5,
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  description: {
    color: '#444',
    textAlign: 'justify',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#00B894',
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    borderRadius: 2,
    elevation: 1,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    letterSpacing: 2,
  },
});

export default function Movies() {
  const [movies, setMovies] = useState([]);
  const [selected, setSelected] = useState({});
  const [error, setError] = useState('');

  const flatList = useRef(null);

  useEffect(() => {
    async function loadMovies() {
      try {
        const realm = await getRealm();

        const data = realm.objects('Movie').sorted('chronology');

        if (data.length > 0) {
          setMovies(data);
        } else {
          const response = await api.get('/movies', {
            params: { order: 'chronology' },
          });

          setMovies(response.data.data);

          response.data.data.map(movie =>
            realm.write(() =>
              realm.create('Movie', {
                ...movie,
                watched: '',
              })
            )
          );
        }
      } catch (err) {
        if (err.status === 500) {
          setError('Unable to connect to server');
        }
      }
    }

    loadMovies();
    // flatList.current.scrollToIndex({ animated: true, index: 5 });
  }, []);

  function handleSelectMovie(id) {
    const [movie] = movies.filter(item => item.id === id);
    // movie.release_date = movie.release_date.split('-', 1)[0];
    setSelected(movie);
  }

  async function handleMarkAsWatched(movie) {
    const data = {
      ...movie,
      watched: new Date().toISOString(),
    };

    const realm = await getRealm();

    realm.write(() => {
      realm.create('Movie', data, true);
    });

    setSelected(data);
  }

  return (
    <Background>
      <Header />
      <ScrollView>
        <FlatList
          ref={flatList}
          style={styles.list}
          data={movies}
          keyExtractor={movie => String(movie.id)}
          horizontal
          showsHorizontalScrollIndicator={false}
          removeClippedSubviews
          maxToRenderPerBatch={3}
          initialNumToRender={3}
          contentContainerStyle={movies.length === 0 && styles.listEmpty}
          renderItem={({ item }) => (
            <Shadow style={{ opacity: item.watched ? 0.3 : 1 }}>
              <TouchableOpacity onPress={() => handleSelectMovie(item.id)}>
                <Image style={styles.cover} source={{ uri: item.cover_url }} />
              </TouchableOpacity>
            </Shadow>
          )}
          ListEmptyComponent={<ActivityIndicator size={32} color="#D63031" />}
        />

        <Separator />

        {selected.id > 0 ? (
          <Card>
            <CardTop>
              <View
                style={{
                  borderRadius: 4,
                  backgroundColor: '#fff',
                  elevation: 2,
                }}
              >
                <Image
                  style={{ height: 318, width: 219, borderRadius: 2 }}
                  source={{
                    uri: selected.cover_url && selected.cover_url,
                  }}
                />
              </View>
              <MoreInfo>
                <View>
                  <Text style={styles.label}>Duration</Text>
                  <Text style={styles.info}>{`${selected.duration} min`}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Year</Text>
                  <Text style={styles.info}>
                    {selected.release_date.split('-', 1)[0]}
                  </Text>
                </View>
                <View>
                  <Text style={styles.label}>Phase</Text>
                  <Text style={styles.info}>{selected.phase}</Text>
                </View>
                <View>
                  <Text style={styles.label}>Saga</Text>
                  <Text style={styles.info}>{selected.saga}</Text>
                </View>
              </MoreInfo>
            </CardTop>
            <Text style={styles.title}>{selected.title}</Text>
            <Text style={styles.description}>{selected.overview}</Text>
            <Button
              disabled={!!selected.watched}
              onPress={() => handleMarkAsWatched(selected)}
            >
              <Text style={styles.buttonText}>
                {selected.watched ? 'Watched!' : 'Mark as watched!'}
              </Text>
            </Button>
          </Card>
        ) : (
          <Card style={{ alignItems: 'center' }}>
            <Text style={{ color: '#D63031', fontSize: 18, letterSpacing: 2 }}>
              {error || 'No movies selected'}
            </Text>
          </Card>
        )}
      </ScrollView>
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
