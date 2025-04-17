import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {BACKGROUND, CARD, FONT_SIZE, FUENTES} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {position: 'absolute', top: 10},
  card: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: BACKGROUND.secondary
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: "#4361EE",
  },
  shadow: {
    position: 'relative',
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  image: {
    width: 150,
    height: 100,
    margin:"1%",
    alignSelf:'center'
  },
    title:{
      fontFamily: FUENTES.REGULAR,
      fontSize: FONT_SIZE.xl,
      color: colors.tinworkBlack,
      flexWrap: 'wrap', 
      fontWeight: 'bold',
   
  
    },
    subtitle:{
      fontFamily: FUENTES.LIGHT,
      fontSize: FONT_SIZE.lg,
      color: colors.tinworkBlue,
      fontWeight: 'bold',
      flexWrap: 'wrap', 
    },
  choiseContainer: {
    position: 'absolute',
    top: 75,
  },
  likeContainer: {left: 45, transform: [{rotate: '-30deg'}]},
  nopeContainer: {right: 45, transform: [{rotate: '30deg'}]},
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  botoncito: {
    marginTop: 20,
    display: 'flex',
    alignContent: 'flex-end',
  },
  cardLocation: {
    margin: 10,
    padding: '1%',
    display: 'grid',
    gap: '3%',
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  header: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#bbb", 
    backgroundColor:BACKGROUND.primary
  },
  logoContainer: {
    width: 85,
    height: 85,
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "#E0F0FF",
    justifyContent: "center",
    alignItems: "center",
  },
  headerContent: {
    flex: 1,
    marginLeft: 12,
  },
  logo: {
    width: 85,
    height: 85,
    borderRadius: 8,
    backgroundColor: "#E0F0FF",
  },
  companyName: {
    fontSize: 16,
    fontWeight: FUENTES.BOLD,
    marginTop: 8,
    color: "#333",
  },
  content: {
    padding: 16,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: FUENTES.SEMI_BOLD,
    color: "#222",
    marginBottom: 12,
  },
  mainInfoContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start', 
  },
  column: {
    flex: 1, 
    flexDirection: 'column', 
  },  
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,      
    alignItems: 'center', 
  },
  infoText: {
    fontSize: 14,
    color:colors.tinworkBlack,
    marginLeft: 4,    
  },
  descriptionContainer: {
    marginTop: 12,
    marginBottom:12,
    backgroundColor:"#EAF4FF"
  },
  description: {
    fontFamily: FUENTES.LIGHT,
    fontSize: FONT_SIZE.sm2,
    textAlign: 'justify',
    color: colors.tinworkBlack,  
  },
  expandButton: {
    alignSelf: "center",
    marginTop: '1%',
    paddingVertical: 4,
  },
  expandButtonText: {
    textAlign: 'center',
    color: '#2E81FB',
  },
  tagsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "center",
    marginBottom: 8,
  }
});
