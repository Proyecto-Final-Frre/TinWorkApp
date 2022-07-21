import firestore from '@react-native-firebase/firestore';

export const findAll = async () => {
  let abilities = [];

  await firestore()
    .collection('Abilities')
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(documentSnapshot => {
        abilities.push(documentSnapshot.data());
      });
    });

  return abilities;
};
