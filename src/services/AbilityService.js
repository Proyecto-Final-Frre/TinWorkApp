import firestore from '@react-native-firebase/firestore';

export const findAll = () => {
  return firestore()
    .collection('Abilities')
    .get()
    .then(querySnapshot => {
      const abilities = [];
      querySnapshot.forEach(documentSnapshot => {
        abilities.push({
          id: documentSnapshot.id,
          category: documentSnapshot.data().category,
          title: documentSnapshot.data().title,
        });
      });
      return abilities;
    });

  return abilities;
};
