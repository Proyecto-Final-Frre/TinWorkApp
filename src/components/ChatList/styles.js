import {StyleSheet} from 'react-native';
import {FONT_SIZE, FUENTES, BACKGROUND} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND.secondary,
  },
  recrutierContainer: {
    backgroundColor: BACKGROUND.primary,
    padding: 10,
    margin: 10,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  jobTitle: {
    fontFamily: FUENTES.BOLD,
    fontSize: FONT_SIZE.xl,
    color: '#000',
  },
  name: {
    fontFamily: FUENTES.REGULAR,
    fontSize: FONT_SIZE.lg,
    color: '#333',
  },
  company: {
    fontSize: 16,
    color: 'gray',
  },
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
  },
  img: {
    height: 100,
    width: 100,
    margin:'2%',
    marginTop:'12%'
  },
  avatar: {
    width: 45,                    
    height: 45,
    borderRadius: 22.5,            
    marginHorizontal: 10,        
    borderColor: '#ccc',
    borderWidth: 1,
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: 10
  },
  icon: {
    marginLeft: "80%",
  },
  skeletonContainer: {
    padding: 10,
  },
  skeletonChatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  skeletonAvatar: {
    width: 45,
    height: 45,
    borderRadius: 22.5,
    backgroundColor: '#e0e0e0',
    marginRight: 10,
  },
  skeletonDetails: {
    flex: 1,
  },
  skeletonLine: {
    height: 10,
    backgroundColor: '#e0e0e0',
    marginBottom: 6,
    borderRadius: 5,
  },
  shortLine: {
    width: '60%',
  }
  ,
  emptyMessageContainer: {
    flex: 1,
    padding: 30,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
  },
  emptyMessage: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    lineHeight: 24,
  }
 
});
