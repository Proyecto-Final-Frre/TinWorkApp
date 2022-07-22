import firestore from '@react-native-firebase/firestore';

export const create = async user => {
  let userExists = await firestore()
    .collection('Users')
    .where('uid', '==', user.uid)
    .get()
    .then(response => {
      response.data.forEach(doc => console.log(doc));
    });
  if (userExists) {
  } else {
    firestore()
      .collection('Users')
      .add({
        name: user.name,
        email: user.email,
        uid: user.uid,
        abilities: user.abilities,
      })
      .then(() => {
        console.log('User added!');
      });
  }
};
