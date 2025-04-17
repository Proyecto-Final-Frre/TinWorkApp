import {StyleSheet} from 'react-native';
import { hp, wp } from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom:'0.5%',
    width: wp(50),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: -1,
  },
});
