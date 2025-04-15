import React, { useCallback, useState } from 'react';
import { Animated, Image, Text, TouchableOpacity, View } from 'react-native';
import Choise from '../Choise';
import { ACTION_OFFSET, BACKGROUND } from '../../utils/constants';
import AptitudeOffer from '../aptitudeOffer';
import ButtonMoreAbilities from '../buttonMoreAbilities';
import { formatDistance } from 'date-fns';
import esLocale from 'date-fns/locale/es';
import Icon from 'react-native-vector-icons/Entypo';
import { styles } from './style';

export default function Card({
  title,
  description,
  descriptionShort,
  province,
  workDay,
  dateOffer,
  requiredAbilities,
  desiredAbilities,
  source,
  isFirst,
  logoURL,
  workModality,
  companyName,
  swipe,
  tiltSign,
  ...rest
}) {
  const [expand, setExpand] = useState(false);
  const [expandAptitude, setExpandAptitude] = useState(false);
  let totalAbilities = [...requiredAbilities, ...desiredAbilities];
  let moreAbilities = totalAbilities.length - requiredAbilities.length;

  const rotate = Animated.multiply(swipe.x, tiltSign).interpolate({
    inputRange: [-ACTION_OFFSET, 0, ACTION_OFFSET],
    outputRange: ['8deg', '0deg', '-8deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
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

  const dataOffer = formatDistance(dateOffer.toDate(), new Date(), {
    locale: esLocale,
  });


  const renderChoise = useCallback(() => {
    return (
      <>
        <Animated.View
          style={[
            styles.choiseContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}>
          <Choise type="like" title="ME INTERESA" />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiseContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}>
          <Choise type="nope" title="NO ME INTERESA" />
        </Animated.View>
      </>
    );
  }, []);

  return (
    <Animated.View style={[styles.container, isFirst && animatedCardStyle]} {...rest}>
      <View style={styles.shadow}>
        {!expand && !expandAptitude ? (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri:
                      logoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/tinwork-6a67f.appspot.com/o/image_tinwork.png?alt=media&token=f6439911-dcda-4211-b920-465680990a38",
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.headerContent}>
                <Text style={styles.title}>{companyName}</Text>
                <Text style={styles.subtitle}>{title}</Text>
              </View>
            </View>
            <View style={{ flex: 1, margin: "4%", backgroundColor:BACKGROUND.secondary }}>
              <View style={styles.mainInfoContainer}>
                <View style={styles.column}>
                  <View style={styles.infoItem}>
                    <Icon name={'location-pin'} size={17} color="red" />
                    <Text style={styles.infoText}>Argentina, {province} </Text>
                  </View>
                  <View style={styles.infoItem}>                    
                    <Text style={styles.infoText}>💼 {workDay}</Text>
                  </View>
                </View>
                <View style={styles.column}>
                  <View style={styles.infoItem}>                  
                    <Text style={styles.infoText}>📅 {`Hace ${dataOffer.replace("alrededor de ", "")}`}</Text>
                  </View>
                  <View style={[styles.infoItem]}>                
                    <Text style={styles.infoText}>💼 {workModality}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.descriptionContainer}>
                <Text style={styles.description}>{descriptionShort + '...' || description}</Text>
                {descriptionShort && (
                  <TouchableOpacity onPress={() => setExpand(true)} style={styles.expandButton}>
                    <Text style={styles.expandButtonText}>Ver más</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View style={styles.tagsContainer}>
                {requiredAbilities.slice(0, 5).map((ability, index) => (
                  <AptitudeOffer title={ability} key={index} />
                ))}
                {totalAbilities.length > requiredAbilities.length && (
                  <ButtonMoreAbilities
                    buttonStyle={true}
                    titleStyle={true}
                    title={`+${moreAbilities}`}
                    onPress={() => setExpandAptitude(true)}
                  />
                )}
                
              </View>
            </View>
          </View>
        ) : expand && !expandAptitude ? (
          <View style={styles.card}>
            <View style={styles.header}>
              <View style={styles.logoContainer}>
                <Image
                  style={styles.logo}
                  source={{
                    uri:
                      logoURL ||
                      "https://firebasestorage.googleapis.com/v0/b/tinwork-6a67f.appspot.com/o/image_tinwork.png?alt=media&token=f6439911-dcda-4211-b920-465680990a38",
                  }}
                  resizeMode="cover"
                />
              </View>
              <View style={styles.headerContent}>
                <Text style={styles.title}>{companyName}</Text>
                <Text style={styles.subtitle}>{title}</Text>
              </View>
            </View>
            <View style={{ flex: 1, paddingHorizontal: '5%',marginTop:'2%' }}>              
            <View style={styles.mainInfoContainer}>
              <View style={styles.column}>
                <View style={styles.infoItem}>
                  <Icon name={'location-pin'} size={17} color="red" />
                  <Text style={styles.infoText}>Argentina, {province} </Text>
                </View>
                <View style={styles.infoItem}>                
                  <Text style={styles.infoText}>💼 {workDay}</Text>
                </View>
              </View>
              <View style={styles.column}>
                <View style={styles.infoItem}>                
                  <Text style={styles.infoText}>📅 {`Hace ${dataOffer.replace("alrededor de ", "")}`}</Text>
                </View>
                <View style={[styles.infoItem]}>             
                  <Text style={styles.infoText}>💼 {workModality}</Text>
                </View>
              </View>
              </View>
                <Text style={styles.description}>{description}</Text>
              </View>
              <Text style={{textAlign: 'center',justifyContent: 'center',color: '#2E81FB',marginBottom: 10}} onPress={() => setExpand(false)}>
                Ver menos
              </Text>
          </View>
        ) : (
          <View style={styles.card}>
            <View style={{ flex: 1, paddingHorizontal: '5%' }}>
              <Text
                style={[styles.title, { paddingBottom: '0%', paddingTop: '3%' }]}>
                Habilidades Requeridas
              </Text>
              <View style={styles.buttonsContainer}>
                {requiredAbilities.map((required, index) => (
                  <AptitudeOffer title={required} key={index} />
                ))}
              </View>
              <Text
                style={[styles.title, { paddingBottom: '0%', paddingTop: '0%' }]}>
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
