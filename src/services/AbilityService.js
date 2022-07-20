import firestore from '@react-native-firebase/firestore';

export const findAll = () => {
  firestore()
    .collection('Abilities')
    .get()
    .then(querySnapshot => {
      console.log('Total abilities: ', querySnapshot.size);
      querySnapshot.forEach(documentSnapshot => {
        console.log(
          'Ability ID: ',
          documentSnapshot.id,
          documentSnapshot.data(),
        );
      });
    });
};
