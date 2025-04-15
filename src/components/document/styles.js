import {Dimensions, StyleSheet} from 'react-native';
import {BACKGROUND, FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';
import {colors} from '../../constants/colors';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({    
      card: {
        backgroundColor: BACKGROUND.secondary,
        borderRadius: 10,
      },
     title:{
          fontFamily: FUENTES.REGULAR,
          fontSize: FONT_SIZE.xl,
          color: colors.tinworkBlack,   
          alignSelf:"center",
          margin:"2%"
        },
    cvContainer: {      
      marginVertical: 20,
      padding: 10,
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 10,
      backgroundColor:BACKGROUND.primary,
      },
      titulo: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        
      },
      cvButton: {
        flex: 1,
        flexDirection:'row',
        justifyContent:'center',
        alignItems: 'center',
        paddingVertical: 10,
        marginHorizontal: 5,
        backgroundColor: colors.tinworkBlue,
        borderRadius: 5,
      },
      uploadContainer: {
        flex: 1,       
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:colors.tinworkBlue,
        borderRadius: 5,
      },
      buttonText: {
        color: '#fff',
        fontWeight: '600',
      },
  
      previewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
      },      
      pdfContainer: {          
          backgroundColor:BACKGROUND.secondary, 
          borderRadius: 10,
          padding: 5,

        },
        pdf: {
          flex: 1,
          width: '100%',
          height: 300,
          backgroundColor: 'transparent',         
        },
        buttonsContainer: {
          flexDirection: 'row',
            flexWrap: 'wrap', // Permite que los botones se ajusten a nuevas líneas
            justifyContent: 'flex-start', // Alinea los botones a la izquierda
            marginVertical: 5,
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
        secondaryButton: {
          borderWidth: 1,
          borderColor: '#ddd',
        },
        modalOverlay: {
          flex: 1,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          justifyContent: 'center',
          alignItems: 'center',
        },
        modalContent: {
          width: '90%',
          backgroundColor:'green',
          borderRadius: 12,
          overflow: 'hidden',
          elevation: 5,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
        },
        modalHeader: {
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          backgroundColor:BACKGROUND.primary,
          borderBottomWidth: 1,
          borderBottomColor: '#eaeaea',
        },
        modalTitle: {
          fontSize: 18,
          fontWeight: 'bold',
          color: '#333',
        },
        closeButton: {
          padding: 4,
        },
        fullSizeImage: {
          width: '100%',
          height: 400,
          backgroundColor:BACKGROUND.secondary,
        },

})