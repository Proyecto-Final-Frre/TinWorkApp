import {StyleSheet} from 'react-native';
import {BACKGROUND} from '../../utils/constants';

export const styles = StyleSheet.create({
  container: {
    backgroundColor:BACKGROUND.secondary,
    
  }, 
matchContainer: {
  flexDirection: 'row',
  backgroundColor:BACKGROUND.primary,
  borderRadius: 10,
  paddingLeft:'2%',
  marginVertical: 8,
  marginHorizontal: 16,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 1 },
  shadowOpacity: 0.1,
  shadowRadius: 3,
  elevation: 2,
  alignItems: 'center',
  minHeight: 105,
  maxWidth: '92%',
  alignSelf: 'center',
},

img: {
  width: 65,
  height: 65,
  resizeMode: 'contain',
  borderRadius: 8,
  marginRight: 10,
  backgroundColor:"green"
},

detailContainer: {
  flex: 1,
  flexDirection: 'column',
  justifyContent: 'center',
},

company: {
  fontSize: 16,
  fontWeight: 'bold',
  color: '#000',
  textAlign: 'center',
  marginBottom: 2,
},

jobTitle: {
  fontSize: 14,
  color: '#007AFF',
  textAlign: 'center',
  marginBottom: 4,
},

row: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 6,
},

columnLeft: {
  flex: 1,
},

columnRight: {
  flex: 1,
  alignItems: 'flex-start',
  marginLeft:"5%",
},

rowItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 4,
},

textSpec: {
  fontSize: 12,
  marginLeft: 4,
  color: '#333',
},
separator: {
  borderBottomColor: '#ccc',
  borderBottomWidth: 1,
  marginVertical: 2, 
  width: '100%',
},
  imageContainer: {
    height: 50,
    width: 50,
    borderRadius: 10,
  }, 
  img_2: {
    height: 100,
    width: 100,
    margin:'2%',
    marginTop:'12%'
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
