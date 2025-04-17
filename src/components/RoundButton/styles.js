import {StyleSheet} from 'react-native';
import { hp,wp } from '../../utils/constants';
const CIRCLE_SIZE = hp(10); // podés ajustar a gusto

export const styles = StyleSheet.create({
  container: {
    width:CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    backgroundColor: '#fff',
    elevation: 5,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
