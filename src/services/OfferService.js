import firestore from '@react-native-firebase/firestore';

export const findByAbilities = abilities => {
  return firestore()
    .collection('Offers')
    .where('requiredAbilities', 'array-contains-any', abilities)
    .get()
    .then(querySnapshot => {
      let offers = [];
      querySnapshot.forEach(response => offers.push(response.data()));
      return offers;
    });
};
