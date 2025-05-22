import {StyleSheet} from 'react-native';
import { hp, wp } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom:hp(1.5),
    width: wp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: -1,
  },
});
