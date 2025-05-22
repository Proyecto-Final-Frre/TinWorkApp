import firestore from '@react-native-firebase/firestore';

export const update = (offer, user) => {
  user.status = 'wait';
  offer.interestedUsers.push(user);
  firestore()
    .collection('Offers')
    .doc(offer.id)
    .update({
      interestedUsers: offer.interestedUsers,
    })
    .then(() => {
      console.log('Offer updated!');
    })
    .catch(err => {
      console.log('error', err);
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

export const findOfferByUid = async (offerUid) => {
  try {
    const doc = await firestore().collection('Offers').doc(offerUid).get();
    return doc.exists ? { uid: doc.id, ...doc.data() } : null;
  } catch (error) {
    console.error('Error al buscar oferta:', error);
    return null;
  }
};