import React, {useCallback, useEffect, useState} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import Choise from '../Choise';
import {ACTION_OFFSET} from '../../utils/constants';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import Icon from 'react-native-vector-icons/Entypo';

import {styles} from './style';

export default function Card({
  title,
  description,
  descriptionShort,
  province,
  workDay,
  requiredAbilities,
  desiredAbilities,
  source,
  isFirst,
  swipe,
  tiltSign,
  ...rest
}) {
  const [expand, setExpand] = useState(false);
  const [expandAptitude, setExpandAptitude] = useState(false);

  let moreAbilities = requiredAbilities.length - 5;

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

  console.log(description.length);
  console.log(descriptionShort.length);

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

  return (
    <Animated.View
      style={[styles.container, isFirst && animatedCardStyle]}
      {...rest}>
      <View style={styles.shadow}>
        {!expand && !expandAptitude ? (
          <View style={styles.card}>
            <Image style={[styles.image]} source={{uri: source}} />
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Text
                style={[styles.title, {paddingBottom: '0%', paddingTop: '5%'}]}>
                {title}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Icon name={'location-pin'} size={17} />
                <Text style={{flexGrow: 5}}>{province}</Text>
                <Icon name={'briefcase'} size={17} />
                <Text style={{flexGrow: 2, marginLeft: 1}}>{workDay}</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: '5%',
                }}>
                <Icon name={'calendar'} size={17} />
                <Text style={{flexGrow: 5, marginLeft: 1}}>Tiempo</Text>
              </View>
              <Text style={styles.description}>
                {descriptionShort}
                {description.length > descriptionShort.length ? '. . .' : ''}
              </Text>
              {descriptionShort.length > 175 ? (
                <Text
                  style={{
                    textAlign: 'center',
                    paddingTop: '5%',
                    color: '#2E81FB',
                  }}
                  onPress={() => setExpand(true)}>
                  Ver más
                </Text>
              ) : (
                <Text></Text>
              )}
              <View style={styles.buttonsContainer}>
                {requiredAbilities.slice(0, 5).map((ability, index) => (
                  <AptitudeOffer title={ability} key={index} />
                ))}
                {requiredAbilities.length > 5 && (
                  <ButtonMoreAbilities
                    buttonStyle={false}
                    titleStyle={false}
                    title={`+${moreAbilities}`}
                    onPress={() => setExpandAptitude(true)}
                  />
                )}
              </View>
            </View>
          </View>
        ) : expand && !expandAptitude ? (
          <View style={styles.card}>
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Text
                style={[styles.title, {paddingBottom: '2%', paddingTop: '5%'}]}>
                {title}
              </Text>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                }}>
                <Icon name={'location-pin'} size={17} />
                <Text style={{flexGrow: 5}}>Ubicacion</Text>
                <Icon name={'briefcase'} size={17} />
                <Text style={{flexGrow: 2, marginLeft: 1}}>Media Jornada</Text>
              </View>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  paddingBottom: '5%',
                }}>
                <Icon name={'calendar'} size={17} />
                <Text style={{flexGrow: 5, marginLeft: 1}}>Tiempo</Text>
              </View>
              <Text style={styles.description}>{description}</Text>
            </View>
            <Text
              style={{
                textAlign: 'center',
                justifyContent: 'center',
                color: '#2E81FB',
                marginBottom: 10,
              }}
              onPress={() => setExpand(false)}>
              Ver menos
            </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={{flex: 1, paddingHorizontal: '5%'}}>
              <Text
                style={[styles.title, {paddingBottom: '0%', paddingTop: '3%'}]}>
                Habilidades Requeridas
              </Text>
              <View style={styles.buttonsContainer}>
                {requiredAbilities.map((required, index) => (
                  <AptitudeOffer title={required} key={index} />
                ))}
              </View>
              <Text
                style={[styles.title, {paddingBottom: '0%', paddingTop: '0%'}]}>
                Habilidades Secundarias
              </Text>
              <View style={styles.buttonsContainer}>
                {desiredAbilities.map((desired, index) => (
                  <AptitudeOffer title={desired} key={index} />
                ))}
              </View>
              <View style={styles.botoncito}>
                <ButtonMoreAbilities
                  title={'Volver a la pantalla principal'}
                  buttonStyle={true}
                  titleStyle={true}
                  onPress={() => setExpandAptitude(false)}
                />
              </View>
            </View>
          </View>
        )}
      </View>

      {isFirst && renderChoise()}
    </Animated.View>
  );
}
