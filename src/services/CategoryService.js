import firestore from '@react-native-firebase/firestore';

export const findAllCategories = () => {
  return firestore()
    .collection('Categories')
    .get()
    .then(querySnapshot => {
      const categories = [];
      querySnapshot.forEach(documentSnapshot => {
        categories.push({
          id: documentSnapshot.id,
          name: documentSnapshot.data().name,
        });
      });
      return categories;
    });
};
