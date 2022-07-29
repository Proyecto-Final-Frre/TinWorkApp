import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import Choise from '../Choise';
import {ACTION_OFFSET} from '../../utils/constants';
import AptitudeOffer from '../aptitudeOffer';

import {styles} from './style';

export default function Card({
  title,
  description,
  descriptionShort,
  abilities,
  source,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const [expand, setExpand] = useState(false);

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), {rotate}],
  };

  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, ACTION_OFFSET],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-ACTION_OFFSET, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderChoise = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiseContainer,
            styles.likeContainer,
            {opacity: likeOpacity},
          ]}>
          <Choise type="like" title="ME INTERESA" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiseContainer,
            styles.nopeContainer,
            {opacity: nopeOpacity},
          ]}>
          <Choise type="nope" title="NO ME INTERESA" />
        </Animated.View>
      </>
    );
  }, []);

  console.log(abilities);

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}>
      <View style={styles.shadow}>
        {!expand ? (
          <View style={styles.card}>
            <Image style={[styles.image]} source={{uri: source}} />
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Text
                style={[styles.title, {paddingBottom: '2%', paddingTop: '5%'}]}>
                {title}
              </Text>
              <Text style={styles.description}>
                {descriptionShort}
                {description.length > descriptionShort.length ? '. . .' : '.'}
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: '5%',
                  color: '#2E81FB',
                }}
                onPress={() => setExpand(true)}>
                Ver más
              </Text>
              <View style={styles.buttonsContainer}>
                {abilities.map(ability => (
                  <AptitudeOffer title={ability} key={ability.id} />
                ))}
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Text
                style={[styles.title, {paddingBottom: '2%', paddingTop: '5%'}]}>
                {title}
              </Text>
              <Text style={styles.description}>{description}</Text>
              <Text
                style={{
                  textAlign: 'center',
                  paddingTop: '5%',
                  color: '#2E81FB',
                }}
                onPress={() => setExpand(false)}>
                Ver menos
              </Text>
            </View>
          </View>
        )}
      </View>

      {isFirst && renderChoise()}
    </Animated.View>
  );
}
