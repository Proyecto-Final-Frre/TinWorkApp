import {Dimensions, StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {BACKGROUND, FONT_SIZE, FUENTES} from '../../utils/constants';
const screenWidth = Dimensions.get('window').width;

export const styles = StyleSheet.create({
    container: {
      marginTop:'6%',
    },
    headerContainer: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 8,
    },
      title:{
        fontFamily: FUENTES.REGULAR,
        fontSize: FONT_SIZE.xl,
        color: colors.tinworkBlack,   
        flexWrap:'wrap',
        width:screenWidth * 0.5,
      },
    editButton: {
      flexDirection: "row",
      alignItems: "center",
      paddingVertical: 6,
      paddingHorizontal: 12,
      backgroundColor: BACKGROUND.primary,
      borderRadius: 6,
    },
    editButtonText: {
       color: '#4A90E2',
    fontSize: 14,
    fontWeight: '500',
    },
    actionButtons: {
      flexDirection: "row",
      alignItems: "center",
      
    },
    cancelButton: {
     padding: 6,
     marginLeft:1
    },
    cancelButtonText: {
      color: "#666666",
      fontSize: 14,
    },
    saveButton: {
      backgroundColor: "#4A80F0",
      flexDirection: "row",
      alignItems: "center",
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
    },
    saveButtonDisabled: {
      backgroundColor: "#A0A0A0",
    },
    saveButtonText: {
      color: "#FFFFFF",
      fontSize: 14,
      fontWeight: "500",
      marginLeft: 4,
    },
    descriptionContainer: {
      borderWidth: 1,
      borderColor: '#D0D0D0',
      backgroundColor: '#E0ECFF',
      borderRadius: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    descriptionContainerActive: {
      borderColor: "#4A80F0",
      backgroundColor: "#FFFFFF",
      shadowColor: "#4A80F0",
      shadowOffset: { width: 0, height: 0 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    input: {
      fontFamily: FUENTES.REGULAR,
      fontSize: FONT_SIZE.xs,
      color: colors.tinworkBlack,
      flexWrap: 'wrap', // Permite que el texto pase a la siguiente línea si es necesario
      padding: 4,
      fontSize: 15,
      lineHeight: 22,
      padding: 10,
      //fontFamily: 'System', // Cambialo si usás una fuente custom
    },
    textArea: {
      minHeight: 120,
      textAlignVertical: "top",
    },
    helperContainer: {
      flexDirection: "row",
      justifyContent: 'space-between',
      alignItems: "center",
      marginTop: 4,
      overflow: "hidden",
    },
    helperText: {
      fontSize: 14,
      color: "#6B7280",
      fontStyle: "italic",
    },
    charCount: {
      fontSize: 12,
      color: "#9EA0A4",
    },
    charCountWarning: {
      color: "#F59E0B",
    },
    emptyStateContainer: {
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
    },
    emptyStateText: {
      color: "#9EA0A4",
      fontSize: 14,
      textAlign: "center",
      fontStyle: "italic",
    },
  })