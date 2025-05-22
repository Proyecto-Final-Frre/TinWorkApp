import {Dimensions, StyleSheet} from 'react-native';
import {BACKGROUND, FONT_SIZE, FUENTES} from '../../utils/constants';
import {colors} from '../../constants/colors';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
   card: {
          backgroundColor: BACKGROUND.secondary,
          borderRadius: 10,  
        },
  title:{
    fontFamily: FUENTES.REGULAR,
    fontSize: FONT_SIZE.xl,
    color: colors.tinworkBlack,
    flexWrap: 'wrap', 
  },
  subtitle:{
    fontFamily: FUENTES.LIGHT,
    fontSize: FONT_SIZE.xl,
    color: colors.tinworkBlack,
    flexWrap: 'wrap', 
    width:screenWidth * 0.5
  },
  ubi:{
    fontFamily: FUENTES.LIGHT,
    fontSize: FONT_SIZE.base,
    color: colors.tinworkBlack,
    flexWrap: 'wrap', 
    width:screenWidth * 0.5
  },
  searchInput: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 10,
    color:colors.tinworkBlack
  },
  selectedLocationContainer: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
  },
  selectedLocationContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  selectedLocationLabel: {
    fontSiz: 12,
    color: '#888',
  },
  selectedeLocationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  changeLocationButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor:BACKGROUND.primary,
    borderRadius: 6,
  },
  changeLocationText: {
    color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
  },
  locationContainer: {
    marginLeft:'6%',
  },
  locationHeader: {
    marginTop:'6%',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    width:screenWidth * 0.48,
    backgroundColor:"red"
  },
  ubication:{
    fontFamily: FUENTES.REGULAR,
    fontSize: FONT_SIZE.xl,
    color: colors.tinworkBlack,
  },
  ubicationContainer:{
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop:"5%"
  },
  abilityHeader:{
     display: 'flex',
     flexDirection: 'row',
     alignItems: 'center',
     justifyContent: 'space-between',
  },
  locationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  locationSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
  },
  locationText: {
    fontSize: 15,
    color: '#444',
  },
  imageContainer: {
    position: 'relative',
    height: 130,
    width: 130,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageWrapper: {
    position: 'absolute',
    width: 110,
    height: 110,
    borderRadius: 55,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  uploadIconContainer: {
    position: 'absolute',
    bottom: 10, // Ajustá según la necesidad
    left:96,  // Ajustá según la necesidad
    backgroundColor: 'rgba(255, 255, 255, 0.6)', // Fondo oscuro semitransparente
    padding: 3,
    borderRadius: 20, // Hace que el fondo sea un círculo
  },
  img: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  textoImagen: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -30 }, { translateY: -10 }],
  },
  progressCircle: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  percentageContainer: {
    position: 'absolute',
    bottom: -10,
    backgroundColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  percentageText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 30,
    padding: 4,
  },
  progressText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#2E81FB',
  },
  abilitiesContainer: {
    marginTop:'6%'

  },
  buttonsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    marginHorizontal: -4, // Compensate for button margins
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
  mismatchs: {
    fontSize: 35,
    color: '#000',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
  },
  textInput: {
    height: 100, // Altura suficiente para múltiples líneas
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10, // Padding interno
    fontSize: 16, // Tamaño de fuente adecuado
    color: '#333', // Color de texto
    backgroundColor: '#fff', // Fondo blanco para el TextInput
    textAlignVertical: 'top', // Alinear el texto al inicio
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },

  cvButton: {
    padding: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    alignItems: 'center',
  },
  cvText: {
    fontSize: 16,
    color: '#333',
  },

  thumbnail: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
  fullSizeImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  certificationContainer: {
    position: 'relative', // Para que el ícono se posicione relativo a este contenedor
    margin: 5,
  },
  trashIcon: {
    position: 'absolute', // Posiciona el ícono de forma absoluta
    top: 5, // Ajusta la distancia desde la parte superior
    right: 5, // Ajusta la distancia desde la derecha
    zIndex: 1, // Asegura que el ícono esté por encima de la imagen
  },
  certificationImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A1A',
    marginBottom: 8,
  },
  inputContainer: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E4E6EB',
    borderRadius: 12,
    padding: 12,
    minHeight: 120,
  },
  inputContainerFocused: {
    borderColor: '#2196F3',
    backgroundColor: '#FFFFFF',
    shadowColor: '#2196F3',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  inputContainerFilled: {
    backgroundColor: '#FFFFFF',
  },
  input: {
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
    minHeight: 96,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#1A1A1A',
    lineHeight: 24,
  },
  descriptionContainer: {
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#E4E6EB',
    borderRadius: 12,
    padding: 12,
  },
  characterCount: {
    fontSize: 12,
    color: '#9EA0A4',
    textAlign: 'right',
    marginTop: 4,
  },
  helperText: {
    fontSize: 13,
    color: '#65676B',
    marginTop: 4,
    fontStyle: 'italic',
  },
  inputGroup: {
    marginVertical: 16,
  },

  //Estilos de modal ubicacion
  modalContainer: {
   flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: '85%',
    maxHeight: '70%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  modalTitle: {
    flexDirection: 'row',
    margin:'1%',
    justifyContent:'space-between',
    alignItems:'center',
    alignContent:'center',


  },
  locationItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  locationItemSelected: {
    backgroundColor: '#F0F7FF',
  },
  locationItemText: {
    fontSize: 16,
    color: '#444',
    marginLeft:'2%'
  },
  locationItemTextSelected: {
    fontWeight: '600',
    color: '#4A90E2',
  },
  closeButton: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#F0F0F0',
    borderRadius: 8,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#555',
    fontWeight: '500',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
});
