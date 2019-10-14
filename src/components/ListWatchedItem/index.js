import React from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Swipeable from 'react-native-gesture-handler/Swipeable';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    height: 83,
    width: 58,
    borderRadius: 2,
  },
  info: {
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 17,
  },
  watchedTime: {
    fontSize: 13,
    color: '#ccc',
  },
  containerLeftAction: {
    backgroundColor: '#D63031',
    justifyContent: 'center',
    flex: 1,
  },
  textLeftAction: {
    color: '#fff',
    fontWeight: '600',
    padding: 20,
  },
});

export default function ListWatchedItem({ data, onSwipeableFromLeft }) {
  const LeftActions = (progress, dragX) => {
    const scale = dragX.interpolate({
      inputRange: [0, 50],
      outputRange: [0, 1],
      extrapolate: 'clamp',
    });

    return (
      <View style={styles.containerLeftAction}>
        <Animated.Text
          style={[styles.textLeftAction, { transform: [{ scale }] }]}
        >
          Remove from watched
        </Animated.Text>
      </View>
    );
  };

  return (
    <Swipeable
      renderLeftActions={LeftActions}
      onSwipeableLeftOpen={() => onSwipeableFromLeft(data.id)}
    >
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: data.cover_url }} />
        <View style={styles.info}>
          <Text style={styles.title}>{data.title}</Text>
          <Text style={styles.watchedTime}>{data.watchedTime}</Text>
          <Icon name="check" size={28} color="#00b894" />
        </View>
      </View>
    </Swipeable>
  );
}

ListWatchedItem.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string,
    cover_url: PropTypes.string,
    watchedTime: PropTypes.string,
  }).isRequired,
  onSwipeableFromLeft: PropTypes.func.isRequired,
};
