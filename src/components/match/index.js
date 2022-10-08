import React, {useCallback, useMemo, useState, useEffect} from 'react';
import {Animated, Image, Text, View} from 'react-native';
import {test} from '../../utils/matchs';


const Match = () => {
    return (
      <>
        {test.map(offer => (
          /*<FormSection
            title={section.name}
            aptitudes={section.abilities}
            key={section.id}
            onAptitudePress={onAptitudePress}
            userAbilities={userAbilities}
          />*/
            <View>
                <Text
                    style={[styles.title, {paddingBottom: '2%', paddingTop: '5%'}]}>
                    {offer.titulo}
                </Text>
                <View
                style={{
                display: 'flex',
                flexDirection: 'row',
                }}>
                <Icon name={'location-pin'} size={17} />
                <Text style={{flexGrow: 5}}>{offer.ubicacion}</Text>
                <Icon name={'briefcase'} size={17} />
                <Text style={{flexGrow: 2, marginLeft: 1}}> {offer.jornada}</Text>
            </View>
            <View
                style={{
                display: 'flex',
                flexDirection: 'row',
                paddingBottom: '5%',
                }}>
                <Icon name={'calendar'} size={17} />
                <Text style={{flexGrow: 5, marginLeft: 1}}>
                {' '}
                {offer.tiempo}
                </Text>
            </View>
          </View>
        ))}
      </>
    );
  };
  
  export default Match;