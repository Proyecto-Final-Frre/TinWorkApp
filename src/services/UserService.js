import firestore from '@react-native-firebase/firestore';

export const create = async user => {
  let userExists = await firestore()
    .collection('Users')
    .where('uid', '==', user.uid)
    .get()
    .then(response => {
      if (response.docs.length > 0) {
        response.docs.forEach(doc =>
          doc.ref.update({
            abilities: user.abilities,
            interestingOffers: user.interestingOffers,
            uninterestingOffers: user.uninterestingOffers,
          }),
        );
        return true;
      }
      return false;
    });
  if (!userExists) {
    firestore()
      .collection('Users')
      .add({
        name: user.name,
        email: user.email,
        uid: user.uid,
        abilities: user.abilities,
        interestingOffers: [],
        uninterestingOffers: [],
      })
      .then(() => {
        console.log('User added!');
      });
  }
};

export const findByUid = async uid => {
  return await firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .get()
    .then(response => response.docs[0].data());
};
