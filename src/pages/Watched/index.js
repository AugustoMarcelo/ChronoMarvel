import React, { useState, useEffect } from 'react';
import { View, Text, Image, FlatList } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { parseISO, formatDistance } from 'date-fns';

import getRealm from '../../services/realm';

import Header from '../../components/Header';
import Background from '../../components/Background';
import FAB from '../../components/FAB';

export default function Watched() {
  const [watched, setWatched] = useState([]);

  useEffect(() => {
    async function loadWatchedMovies() {
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
    }

    loadWatchedMovies();
  }, []);

  async function handleRemoveAll() {
    const realm = await getRealm();
    const allMovies = realm
      .objects('Movie')
      .filtered('watched != ""')
      .snapshot();
    realm.write(() => {
      allMovies.map(movie => {
        movie.watched = '';
      });
    });
    setWatched([]);
  }

  return (
    <Background>
      <Header />
      <FlatList
        data={watched}
        style={{ backgroundColor: '#fff' }}
        keyExtractor={item => String(item.id)}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: 'row',
              padding: 10,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc',
            }}
          >
            <Image
              style={{ height: 83, width: 58, borderRadius: 2 }}
              source={{ uri: item.cover_url }}
            />
            <View style={{ marginLeft: 10, justifyContent: 'space-between' }}>
              <Text style={{ fontSize: 17 }}>{item.title}</Text>
              <Text style={{ fontSize: 13, color: '#ccc' }}>
                {item.watchedTime}
              </Text>
              <Icon name="check" size={28} color="#00b894" />
            </View>
          </View>
        )}
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
