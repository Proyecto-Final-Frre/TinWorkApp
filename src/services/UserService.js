import firestore from '@react-native-firebase/firestore';

export const create = async ({
  uid,
  name,
  email,
  abilities,
  interestingOffers = [],
  uninterestingOffers = [],
  token,
}) => {
  firestore()
    .collection('Users')
    .add({
      name: name,
      email: email,
      uid: uid,
      abilities: abilities,
      interestingOffers: [],
      uninterestingOffers: [],
    })
    .then(() => {
      console.log('User added!');
    });
};

export const updateUser = async user => {
  await firestore()
    .collection('Users')
    .where('uid', '==', user.uid)
    .get()
    .then(response => {
      if (response.docs.length > 0) {
        response.docs.forEach(doc => doc.ref.update(user));
      }
    });
};

export const findByUid = async uid => {
  return await firestore()
    .collection('Users')
    .where('uid', '==', uid)
    .get()
    .then(response => response.docs[0].data());
};
