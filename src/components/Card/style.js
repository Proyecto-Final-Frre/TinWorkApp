import {StyleSheet} from 'react-native';
import {CARD, FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {position: 'absolute', top: 45},
  card: {
    width: CARD.WIDTH,
    height: CARD.HEIGHT,
    borderRadius: CARD.BORDER_RADIUS,
    overflow: 'hidden',
    backgroundColor: '#fff',
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
    width: CARD.WIDTH,
    height: 150,
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
  },
  choiseContainer: {
    position: 'absolute',
    top: 75,
  },
  likeContainer: {left: 45},
  nopeContainer: {right: 45, transform: [{rotate: '30deg'}]},
  buttonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
