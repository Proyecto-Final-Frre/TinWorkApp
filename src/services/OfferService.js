import firestore from '@react-native-firebase/firestore';

export const update = (offer, userId) => {
  offer.interestedUsers.push(userId);
  firestore()
    .collection('Offers')
    .doc(offer.id)
    .update({
      interestedUsers: offer.interestedUsers,
    })
    .then(() => {
      console.log('User updated!');
    });
};

export const findByAbilities = (
  abilities,
  interestingOffers,
  uninterestingOffers,
) => {
  return firestore()
    .collection('Offers')
    .where('requiredAbilities', 'array-contains-any', abilities)
    .get()
    .then(querySnapshot => {
      let offers = [];
      querySnapshot.forEach(response => {
        let offer = response.data();
        offer.id = response.id;
        if (
          !interestingOffers.includes(offer.id) &&
          !uninterestingOffers.includes(offer.id)
        ) {
          offers.push(offer);
        }
      });
      return offers;
    });
};
