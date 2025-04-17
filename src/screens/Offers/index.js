import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Animated, PanResponder, Text, View } from 'react-native';
import Card from '../../components/Card';
import Footer from '../../components/Footer';
import { styles } from './style';
import { ACTION_OFFSET, CARD } from '../../utils/constants';
import { findByAbilities, update } from '../../services/OfferService';
import { findUserAuthenticated } from '../../../AuthService';
import { create, findByUid, updateUser } from '../../services/UserService';
import { FormSubmitButton } from '../../components';
import { showMessage, hideMessage } from 'react-native-flash-message';
import DefaultCard from '../../components/DefaultCard';
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

  const findOffersByAbilities = async () => {
    try { 

      if(!userAuth.abilities) {
        showMessage({
          message: 'Usted no tiene habilidades para el filtrado de ofertas',
          type: 'danger',
        })
        return
      }
     
      const offersResponse = await findByAbilities(
        userAuth.abilities,
        userAuth.interestingOffers,
        userAuth.uninterestingOffers
      );

      
      if (offersResponse.length > 0) {
        setOffers(offersResponse);
        // showMessage({
        //   message: 'Ofertas cargadas exitosamente',
        //   type: 'success',
        // })
      }
    } catch (err) {
      console.log("errorr",err)
      // showMessage({
      //   message: 'Error al cargar las ofertas. Intente más tarde.',
      //   // description: error.message || 'Error desconocido',
      //   type: 'danger',
      // });
    } finally {
      // showMessage({
      //   message: 'Error al cargar las ofertas. Intente más tarde.',
      //   // description: error.message || 'Error desconocido',
      //    type: 'danger',
      //  });
      setLoading(false); 
    }
  };




  useEffect(() => {
    getAbilitiesByUidUser();
  }, []);

  useEffect(() => {
    if (userAuth && (!offers.length || offers.length < 1)) {
      findOffersByAbilities();
    }
  }, [userAuth, offers.length]);


  const panResponser = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (_, { dx, dy, y0 }) => {
      swipe.setValue({ x: dx, y: dy });
      tiltSign.setValue(y0 > CARD.HEIGHT / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, { dx, dy }) => {
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
        getAbilitiesByUidUser();
        findOffersByAbilities();
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
    swipe.setValue({ x: 0, y: 0 });
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
      setInterested(false);
    } else {
      setInterested(true);
    }
  };

  useEffect(() => {
    if (interested !== undefined) {
      if (offers.length > 0) {
        let offer = offers[0];
        if (interested) {
          addInterested(offer);
        } else {
          addNotInterested(offer);
        }
      }
    }
  }, [interested]);

  const addInterested = offer => {

    const userUpdate = {
      uid: userAuth.uid,
      interestingOffers: userAuth.interestingOffers,
    };

    updateUser(userUpdate);
    // validar que userAuth despues lleve: descripcion, image y location
    update(offer, userAuth);
    setInterested(undefined);
  };

  const addNotInterested = offer => {
    userAuth.uninterestingOffers.push(offer.id);
    const userUpdate = {
      uid: userAuth.uid,
      uninterestingOffers: userAuth.uninterestingOffers,
    };
    updateUser(userUpdate);
    setInterested(undefined);
  };

  
  const fetchOffers=()=>{
    getAbilitiesByUidUser();
    findOffersByAbilities();
    
  }


  return (
    <View style={styles.container}>
      {loading ? (
             <View style={styles.skeletonCard}>
             {/* Imagen de la Card */}
             <View style={styles.skeletonImage} />
       
             {/* Detalles de la oferta */}
             <View style={styles.skeletonDetails}>
               {/* Título de la oferta */}
               <View style={[styles.skeletonLine, styles.titleLine]} />
       
               {/* Ubicación y jornada */}
               <View style={styles.skeletonSmallLines}>
                 <View style={[styles.skeletonLine, styles.smallLine]} />
                 <View style={[styles.skeletonLine, styles.smallLine]} />
               </View>
       
               {/* Descripción corta */}
               <View style={[styles.skeletonLine, styles.shortLine]} />
               <View style={[styles.skeletonLine, styles.shortLine]} />
       
               {/* Botones de habilidades */}
               <View style={styles.skillsContainer}>
                 <View style={styles.skeletonButton} />
                 <View style={styles.skeletonButton} />
                 <View style={styles.skeletonButton} />
               </View>
             </View>
           </View>
      ) :
        offers.length < 1 ? (
          <DefaultCard onRefresh={fetchOffers} />)
          : (
            offers.length > 0 &&
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
                    dateOffer,
                    logoURL,
                    workModality,
                    companyName
                  },
                  index,
                ) => {
                  let longitud = description.length;
                  let fin = 332;
                  if (longitud > 332) {
                    fin = (longitud - 332) * -1;
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
                      description={description}s
                      descriptionShort={
                        description.length > 332 ? descriptionShort : null
                      }
                      province={province}
                      workDay={workDay}
                      dateOffer={dateOffer}
                      logoURL={logoURL}
                      workModality={workModality}
                      companyName={companyName}
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
      {offers.length > 0 && <Footer handleChoice={handleChoice} />}
    </View>
  );
}
