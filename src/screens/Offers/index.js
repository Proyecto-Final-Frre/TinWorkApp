import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Animated, PanResponder, Text, View} from 'react-native';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import {styles} from './style';
import {ACTION_OFFSET, CARD} from '../../utils/constants';
import {findByAbilities, update} from '../../services/OfferService';
import {findUserAuthenticated} from '../../../AuthService';
import {create, findByUid} from '../../services/UserService';
import {FormSubmitButton} from '../../components';
import {showMessage, hideMessage} from 'react-native-flash-message';
export default function OfferScreen() {
  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userAuth, setUserAuth] = useState();
  const [interested, setInterested] = useState();
  const swipe = useRef(new Animated.ValueXY()).current;
  const tiltSign = useRef(new Animated.Value(1)).current;

  const getAbilitiesByUidUser = async () => {
    let userAuthenticated = await findUserAuthenticated();
    let user = await findByUid(userAuthenticated.uid);
    setUserAuth(user);
  };

  const findOffersByAbilities = () => {
    findByAbilities(
      userAuth.abilities,
      userAuth.interestingOffers,
      userAuth.uninterestingOffers,
    ).then(offersResponse => {
      setOffers(offersResponse);
    });
  };

  useEffect(() => {
    getAbilitiesByUidUser();
  }, []);

  useEffect(() => {
    if (userAuth && (!offers.length || offers.length < 1)) {
      findOffersByAbilities();
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
        handleDirection(direction);
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
      handleDirection(direction);
      Animated.timing(swipe.x, {
        toValue: direction * CARD.OUT_OF_SCREEN,
        duration: 400,
        useNativeDriver: true,
      }).start(removeTopCard);
    },
    [removeTopCard, swipe.x],
  );

  const handleDirection = direction => {
    if (direction > 0) {
      setInterested(true);
    } else {
      setInterested(false);
    }
  };

  useEffect(() => {
    if (interested !== undefined) {
      let offer = offers[0];
      if (interested) {
        addInterested(offer);
      } else {
        addNotInterested(offer);
      }
    }
  }, [interested]);

  const addInterested = offer => {
    userAuth.interestingOffers.push(offer.id);
    create(userAuth);
    update(offer, userAuth.uid);
    setInterested(undefined);
  };

  const addNotInterested = offer => {
    userAuth.uninterestingOffers.push(offer.id);
    create(userAuth);
    setInterested(undefined);
  };

  return (
    <View style={styles.container}>
      {offers.length < 1 && (
        <FormSubmitButton
          title={'Cargar más'}
          buttonStyle={{marginHorizontal: 15, marginVertical: 15}}
          onSubmit={() => {
            findOffersByAbilities();
            showMessage({
              message: 'Ofertas Cargadas',
              type: 'success',
            });
          }}
        />
      )}
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
              let longitud = description.length;
              let fin = 131;
              if (longitud > 131) {
                fin = (longitud - 131) * -1;
              }
              let descriptionShort = description.slice(0, fin);
              const isFirst = index === 0;
              const dragHandlers = isFirst ? panResponser.panHandlers : {};
              return (
                <Card
                  key={index}
                  title={title}
                  requiredAbilities={requiredAbilities}
                  desiredAbilities={desiredAbilities}
                  description={description}
                  descriptionShort={
                    description.length > 131 ? descriptionShort : null
                  }
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
