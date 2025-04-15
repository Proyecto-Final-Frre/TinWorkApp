import {StyleSheet} from 'react-native';
import {BACKGROUND, CARD, FONT_SIZE, FUENTES} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {position: 'absolute', top: 45},
  card: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor:BACKGROUND.secondary,
    justifyContent:'space-between'
  },
  shadow: {
    position: 'relative',
    borderRadius: 16,
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
  title: {
    fontFamily: FUENTES.BOLD,
    fontSize: FONT_SIZE.xl2,
    color: '#000',
  },
  description: {
    fontFamily: FUENTES.LIGHT,
    fontSize: FONT_SIZE.sm2,
    textAlign: 'justify',
    color: '#000',
    padding:5
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
    marginVertical: 15,
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
  button: {
    marginHorizontal: 15,
    marginBottom: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: 200,
    height: 200,
  },
   buttonWrapper: {
    alignSelf: 'stretch',
    marginHorizontal: 15,
    marginBottom: 20,
  }
});
