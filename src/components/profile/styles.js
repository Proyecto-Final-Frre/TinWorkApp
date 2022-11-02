import {StyleSheet} from 'react-native';
import {FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';

export const styles = StyleSheet.create({
  containerrrr: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: FUENTES.BOLD,
    fontSize: FONT_SIZE.xl2,
    color: '#000',
  },
  vistaGeneral: {display: 'flex'},
  descripcion: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  nombreymail: {
    marginLeft: 10,
  },
  titulos: {
    fontSize: 15,
    marginVertical: 5,
  },
  datos: {
    fontSize: 18,
    color: 'black',
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 15,
  },
  img: {
    height: 120,
    width: 120,
    marginHorizontal: 5,
  },
  ubicacion: {
    marginTop: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  texto: {
    marginHorizontal: 5,
  },
  mismatchs: {
    fontSize: 35,
    color: '#000',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
});
