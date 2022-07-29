import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, Button, PanResponder, Text, View} from 'react-native';
import Card from '../../components/Card';

import {pets as petsArray} from '../../utils/data';
import Footer from '../../components/Footer';
import {styles} from './style';
import {ACTION_OFFSET, CARD} from '../../utils/constants';
import {findByAbilities} from '../../services/OfferService';
export default function OfferScreen() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    findByAbilities(['scrum']).then(offersResponse => {
      setOffers(offersResponse);
    });
  }, []);

  useEffect(() => {
    if (!offers.length) {
      findByAbilities(['scrum']).then(offersResponse => {
        setOffers(offersResponse);
      });
    }
  }, [offers.length]);

  useEffect(() => setLoading(false), [offers]);

  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > ACTION_OFFSET;

      if (isActionActive) {
        Animated.timing(swipe, {
          duration: 200,
          toValue: {
            x: direction * CARD.OUT_OF_SCREEN,
            y: dy,
          },
          useNativeDriver: true,
        }).start(removeTopCard);
      } else {
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
  });

  const removeTopCard = useCallback(() => {
    setOffers(prevState => prevState.slice(1));
    swipe.setValue({x: 0, y: 0});
  }, [swipe]);

  const handleChoice = useCallback(
    direction => {
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );

  return (
    <View style={styles.container}>
      {loading ? (
        <Text>Cargando</Text>
      ) : (
        offers
          .map(({title, source, description, abilities}, index) => {
            let longitud = description.length;
            let fin = 0;
            if (longitud > 300) {
              fin = (longitud - 300) * -1;
            }
            let descriptionShort = description.slice(0, fin);
            const isFirst = index === 0;
            const dragHandlers = isFirst ? panResponser.panHandlers : {};
            return (
              <Card
                key={title}
                title={title}
                abilities={abilities}
                description={description}
                descriptionShort={descriptionShort}
                source={source}
                swipe={swipe}
                tiltSign={tiltSign}
                isFirst={isFirst}
                {...dragHandlers}
              />
            );
          })
          .reverse()
      )}
      <Footer handleChoice={handleChoice} />
    </View>
  );
}
