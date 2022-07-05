import React from 'react';
import {Card, withTheme} from '@rneui/themed';
import {View, StyleSheet} from 'react-native';
import BotonAptitud from '../components/BotonAptitud';

const Seccion = ({title, aptitudes = [], onClickAptitud}) => {
  return (
    <Card containerStyle={styles.container}>
      <Card.Title>{title}</Card.Title>
      <Card.Divider />
      <View style={styles.aptitudes}>
        {aptitudes.map((aptitud, index) => (
          <BotonAptitud
            title={aptitud.title}
            onPress={() => onClickAptitud(aptitud)}
            key={index}
            isActive={aptitud.isActive}
          />
        ))}
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 0,
    width: '100%',
  },
  aptitudes: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});

export default withTheme(Seccion, '');
