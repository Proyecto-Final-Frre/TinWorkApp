import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#EBF5FF',
    alignItems: 'center',
    alignContent: 'center',
  },
  skeletonCard: {
    width: 350, 
    height: 500, 
    marginTop:40,
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    marginVertical: 10,
    padding: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
  },
  skeletonImage: {
    width: '100%',
    height: 160, 
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
  },
  skeletonDetails: {
    marginTop: 14, 
  },
  skeletonLine: {
    width: '100%',
    height: 12,
    backgroundColor: '#e0e0e0',
    borderRadius: 6,
    marginBottom: 8,
  },
  titleLine: {
    width: '80%',
    marginBottom: 14,
  },
  skeletonSmallLines: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  smallLine: {
    width: '40%',
    height: 10,
  },
  shortLine: {
    width: '60%',
    height: 10,
  },
  skillsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14, 
  },
  skeletonButton: {
    width: 70,
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
  },
});
