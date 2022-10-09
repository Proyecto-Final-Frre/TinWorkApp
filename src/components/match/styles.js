import {CurrentRenderContext} from '@react-navigation/native';
import {StyleSheet} from 'react-native';
import {colors} from '../../constants/colors';
import {CARD, FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';
import Icon from 'react-native-vector-icons/Entypo';

export const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  title: {
    fontFamily: FUENTES.BOLD,
    fontSize: FONT_SIZE.xl2,
    color: '#000',
  },
});
