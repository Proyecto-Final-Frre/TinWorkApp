import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, Text, View} from 'react-native';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import {styles} from './style';
import {ACTION_OFFSET, CARD} from '../../utils/constants';
import {findByAbilities} from '../../services/OfferService';
import {findUserAuthenticated} from '../../../AuthService';
import {findByUid} from '../../services/UserService';
export default function OfferScreen() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAuth, setUserAuth] = useState();
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const getAbilitiesByUidUser = async () => {
    let userAuthenticated = await findUserAuthenticated();
    let user = await findByUid(userAuthenticated.uid);
    setUserAuth(user);
  };

  useEffect(() => {
    getAbilitiesByUidUser();
  }, []);

  useCallback(() => {
    findByAbilities(userAuth.abilities).then(offersResponse => {
      setOffers(offersResponse);
    });
  }, [userAuth]);

  useEffect(() => {
    if (userAuth && !offers.length) {
      findByAbilities(userAuth.abilities).then(offersResponse => {
        setOffers(offersResponse);
      });
    }
  }, [userAuth, offers.length]);

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
          .map(
            (
              {
                title,
                source,
                description,
                requiredAbilities,
                desiredAbilities,
                province,
                workDay,
              },
              index,
            ) => {
              let descriptionShort = description.substring(0, 175);
              const isFirst = index === 0;
              const dragHandlers = isFirst ? panResponser.panHandlers : {};
              return (
                <Card
                  key={index}
                  title={title}
                  requiredAbilities={requiredAbilities}
                  desiredAbilities={desiredAbilities}
                  description={description}
                  descriptionShort={descriptionShort}
                  province={province}
                  workDay={workDay}
                  source={source}
                  swipe={swipe}
                  tiltSign={tiltSign}
                  isFirst={isFirst}
                  {...dragHandlers}
                />
              );
            },
          )
          .reverse()
      )}
      <Footer handleChoice={handleChoice} />
    </View>
  );
}
