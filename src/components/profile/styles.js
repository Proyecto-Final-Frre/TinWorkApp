import {StyleSheet} from 'react-native';
import {FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';
import {colors} from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageContainer: {
    display: 'flex',
    height: 120,
    width: 120,
    borderRadius: 18,
    borderWidth: 0.5,
    borderColor: '#000',
    overflow: 'hidden',
    alignItems: 'center',
    flexBasis: 121,
  },
  abilitiesContainer: {},
  locationContainer: {
    flexBasis: 198,
  },
  descriptionContainer: {},
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
  datosContainer: {},
  titulos: {
    fontSize: 20,
    color: 'black',
    marginVertical: 5,
  },
  tituloSecun: {
    marginTop: 10,
    fontSize: 15,
  },
  datos: {
    fontSize: 18,
  },
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
    marginLeft: -5,
  },
  img: {
    height: 120,
    width: 120,
    marginHorizontal: 5,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#000',
  },

  textoImagen: {
    textAlign: 'center',
    textAlignVertical: 'center',
    backgroundColor: 'rgb(0, 0, 0)',
    opacity: 0.8,
    color: 'white',
    top: '83%',
  },
  ubicacion: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {},
  mismatchs: {
    fontSize: 35,
    color: '#000',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    borderRadius: 8,
    borderWidth: 0.2,
    borderColor: 'gray',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    marginTop: 8,
  },
  botonEditar: {
    fontSize: 16,
    lineHeight: 21,
    letterSpacing: 0.25,
    color: colors.tinworkBlue,
  },
  tituloyBoton: {
    display: 'flex',
    flexDirection: 'row',
  },
});
