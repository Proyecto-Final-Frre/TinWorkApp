import React, {useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {authenticationWithGoogle} from '../../AuthService';
import Seccion from '../components/Seccion';
import seccionesJson from '../data/Secciones.json';

async function onGoogleButtonPress() {
  const auth = await authenticationWithGoogle();
  console.log('autenticado', auth);
}

export default function HomeScreen() {
  const [secciones, setSecciones] = useState(seccionesJson);

  const onClickAptitud = aptitud => {
    const newSections = [];
    secciones.forEach(seccion => {
      const newAptitudes = [];
      seccion.aptitudes.forEach(a => {
        newAptitudes.push({
          ...a,
          isActive: aptitud.id === a.id,
        });
      });
      newSections.push({
        ...seccion,
        aptitudes: newAptitudes,
      });
    });
    setSecciones(newSections);
  };

  return (
    <>
      <View style={styles.container}>
        {secciones.map(s => (
          <Seccion
            title={s.title}
            onClickAptitud={onClickAptitud}
            aptitudes={s.aptitudes}
          />
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
