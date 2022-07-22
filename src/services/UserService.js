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
      })
      .then(() => {
        console.log('User added!');
      });
  }
};
