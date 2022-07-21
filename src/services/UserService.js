import firestore from '@react-native-firebase/firestore';

export const create = user => {
  firestore()
    .collection('Users')
    .add({
      name: user.name,
      email: user.email,
      abilities: user.abilities,
    })
    .then(() => {
      console.log('User added!');
    });
};
