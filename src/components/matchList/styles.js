import {StyleSheet} from 'react-native';
import {BACKGROUND, FONT_SIZE, FUENTES, fuentes} from '../../utils/constants';
import { colors } from '../../constants/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor:BACKGROUND.secondary,
    
  }, 
  matchContainer: {
    backgroundColor: BACKGROUND.primary,
    marginTop:"3%",
    width:"96%",
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {width: 0, height: 2},
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    //flexWrap: 'wrap',
  },
  img: {
    width: 50,
    height: 50,
    borderRadius: 8,
    resizeMode: 'contain',
    marginTop: 5,
  },
  detailContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  company: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.tinworkBlack,
    fontFamily: FUENTES.REGULAR,
    fontSize: FONT_SIZE.xl,  
  },
  jobTitle: {
    fontSize: 15,
    fontWeight: '500',
    color: colors.tinworkBlue,
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 4,
  },
  iconText: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
    flexShrink: 1,
  },
  textSpec: {
    fontSize: 13,
    color: colors.tinworkBlack,
    flexShrink: 1,
    maxWidth: 150,
  }, 
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  img: {
    height: 60,
    width: 60,
    borderRadius: 10,
  },
  img_2: {
    height: 100,
    width: 100,
    margin:'2%',
    marginTop:'12%'
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
  },
  skeletonContainer: {
    padding: 16,
    width: '100%',
  },
  skeletonMatch: {
    flexDirection: 'row',
    marginBottom: 16,
    alignItems: 'center',
  },
  skeletonImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: '#e0e0e0',
    marginRight: 16,
  },
  skeletonDetails: {
    flex: 1,
  },
  skeletonLine: {
    height: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginBottom: 8,
    width: '100%',
  },
  shortLine: {
    width: '60%',
  },
  chatLine: {
    width: '40%',
  },
  emptyMessageContainer: {
    flex: 1,
    alignItems: 'center',
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  }
});
