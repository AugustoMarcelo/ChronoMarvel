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
  ToastAndroid,
  RefreshControl,
} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, isAfter } from 'date-fns';

import api from '../../services/api';
import getRealm from '../../services/realm';
import { isEmptyObject } from '../../utils';

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
  containerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: '#333',
    marginVertical: 5,
    fontWeight: 'bold',
  },
  badge: {
    padding: 5,
    borderRadius: 4,
    backgroundColor: '#fdcb6e',
    color: '#fff',
    fontWeight: 'bold',
    elevation: 1,
    letterSpacing: 1,
    fontSize: 13,
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
  const [loading, setLoading] = useState(false);

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

        // Scrolling to next movie to be watched
        // const nextMovieIndex = movies.findIndex(movie => {
        //   return movie.watched === '';
        // });

        // flatList.current.scrollToIndex({
        //   animated: true,
        //   index: nextMovieIndex >= 0 ? nextMovieIndex : 0,
        // });
      } catch (err) {
        if (err.status === 500) {
          setError('Unable to connect to server');
        }
      }
    }

    loadMovies();
  }, []);

  function handleSelectMovie(id) {
    const [movie] = movies.filter(item => item.id === id);

    setSelected({
      ...movie,
      released: !isAfter(
        parseISO(movie.release_date),
        parseISO(new Date().toISOString())
      ),
    });
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

  async function refreshList() {
    setLoading(true);

    try {
      const updatedMovies = [];
      // Getting data from api
      const { data: response } = await api.get('/movies', {
        params: { order: 'chronology' },
      });

      // Get realm connection
      const realm = await getRealm();
      // Listing saved movies ordered by chronology
      const localData = realm.objects('Movie').sorted('chronology');

      /**
       * Setting watched property (and other properties if there are differences)
       * from api data with value from local data
       */
      localData.forEach(localMovie => {
        const updatedMovie = {
          ...response.data.filter(
            responseMovie => responseMovie.id === localMovie.id
          )[0],
          watched: '',
          released: false,
        };
        updatedMovie.watched = localMovie.watched;
        updatedMovie.released = !isAfter(
          parseISO(updatedMovie.release_date),
          parseISO(new Date().toISOString())
        );
        updatedMovies.push(updatedMovie);
      });

      // Updating local data with api data updated
      realm.write(() => {
        updatedMovies.forEach(movie => realm.create('Movie', movie, true));
      });

      if (!isEmptyObject(selected)) {
        setSelected(...updatedMovies.filter(movie => movie.id === selected.id));
      }

      ToastAndroid.show('Data updated', ToastAndroid.SHORT);
    } catch (err) {
      ToastAndroid.show('Can not connect with server', ToastAndroid.LONG);
    }

    setLoading(false);
  }

  function renderButton() {
    let text;
    let disabled = true;

    if (selected.watched) {
      text = 'Watched!';
    } else if (!selected.released) {
      text = 'Not released';
    } else {
      text = 'Mark as watched!';
      disabled = false;
    }

    return (
      <Button disabled={disabled} onPress={() => handleMarkAsWatched(selected)}>
        <Text style={styles.buttonText}>{text}</Text>
      </Button>
    );
  }

  return (
    <Background>
      <Header />
      <ScrollView
        refreshControl={
          <RefreshControl
            colors={['#D63031', '#000']}
            onRefresh={refreshList}
            refreshing={loading}
          />
        }
      >
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
            <View style={styles.containerTitle}>
              <Text style={styles.title}>{selected.title}</Text>
              {!selected.released && (
                <Text style={styles.badge}>Not released yet</Text>
              )}
            </View>
            <Text style={styles.description}>{selected.overview}</Text>
            {renderButton()}
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
