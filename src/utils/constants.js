import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const FONT_SIZE = {
  xs: hp(1.5625),
  sm: hp(1.875),
  sm2: hp(2),
  base: hp(2.1875), //14
  lg: hp(2.5), //18
  xl: hp(2.8125),
  xl2: hp(3.125), //24
};

const {width, height} = Dimensions.get('screen');

export const CARD = {
  WIDTH: width * 0.9,
  HEIGHT: height * 0.72,
  BORDER_RADIUS: 20,
  OUT_OF_SCREEN: width + 0.5 * width,
};

export const COLORS = {
  like: '#00eda6',
  nope: '#ff006f',
};

export const FUENTES = {
  LIGHT: 'Nunito-Regular',
  REGULAR: 'Nunito-SemiBold',
  BOLD: 'Nunito-Bold',
};

export const ACTION_OFFSET = 100;
