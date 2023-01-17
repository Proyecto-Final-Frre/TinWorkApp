import firestore from '@react-native-firebase/firestore';
import {createUser as create} from '../../AuthService';
import messaging from '@react-native-firebase/messaging';

export const createUser = async ({name, email, pass}) => {
  const auth = await create(name, email, pass);
  const token = await messaging().getToken();
  return firestore()
    .collection('Users')
    .add({
      name: name,
      email: email,
      uid: auth.user.uid,
      token: token,
      location: '',
      description: '',
      imageProfile: '',
      abilities: [],
      interestingOffers: [],
      uninterestingOffers: [],
      offersMatch: [],
    })
    .then(result => {
      console.log('User added!');
      return result;
    })
    .catch(err => {
      console.log('Error', err);
      throw err;
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
    .then(response =>
      response.docs.length > 0 ? response.docs[0].data() : null,
    );
};
