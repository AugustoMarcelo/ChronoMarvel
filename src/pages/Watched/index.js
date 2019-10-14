import React, { useState, useEffect } from 'react';
import { Text, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatDistance } from 'date-fns';

import getRealm from '../../services/realm';

import Header from '../../components/Header';
import Background from '../../components/Background';
import FAB from '../../components/FAB';
import ListWatchedItem from '../../components/ListWatchedItem';
import { Card } from '../../components/styles';

export default function Watched() {
  const [watched, setWatched] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadWatchedMovies() {
    setLoading(true);

    const realm = await getRealm();

    const data = realm
      .objects('Movie')
      .filtered('watched != ""')
      .sorted('watched', true);

    setWatched(
      data.map(item => ({
        ...item,
        watchedTime: formatDistance(
          parseISO(item.watched),
          parseISO(new Date().toISOString()),
          {
            addSuffix: true,
          }
        ),
      }))
    );

    setLoading(false);
  }

  useEffect(() => {
    loadWatchedMovies();
  }, []);

  async function handleRemoveOne(id) {
    const realm = await getRealm();
    const movie = realm.objectForPrimaryKey('Movie', id);

    realm.write(() => {
      movie.watched = '';
    });

    setWatched(watched.filter(item => item.id !== id));
  }

  async function handleRemoveAll() {
    const realm = await getRealm();
    const allMovies = realm
      .objects('Movie')
      .filtered('watched != ""')
      .snapshot();
    realm.write(() => {
      allMovies.forEach(movie => {
        movie.watched = '';
      });
    });
    setWatched([]);
  }

  async function refreshList() {
    await loadWatchedMovies();
  }

  return (
    <Background>
      <Header />
      <FlatList
        data={watched}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        onRefresh={refreshList}
        refreshing={loading}
        renderItem={({ item }) => (
          <ListWatchedItem data={item} onSwipeableFromLeft={handleRemoveOne} />
        )}
        ListEmptyComponent={
          <Card style={{ alignItems: 'center', marginTop: 10 }}>
            <Text style={{ color: '#D63031', fontSize: 18, letterSpacing: 2 }}>
              No watched movies
            </Text>
          </Card>
        }
      />
      {watched.length > 0 && <FAB onRemoveAll={handleRemoveAll} />}
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
