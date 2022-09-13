import auth from '@react-native-firebase/auth';
import {WEB_CLIENT_ID} from '@env';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {addDocument} from '../../dataBase/firebase';

GoogleSignin.configure({
  webClientId: `${WEB_CLIENT_ID}`,
});

const COLLECTION_USER = 'Users';

export const createUser = (user, pass) => {
  auth()
    .createUserWithEmailAndPassword(user.email, pass)
    .then(result => {
      console.log(result);
      updateProfileUser(user.name);
      saveUser(user);
    })
    .catch(err => console.log(err));
};

const updateProfileUser = name => {
  auth().currentUser.updateProfile({displayName: name});
};

export const authenticationWithGoogle = async () => {
  await GoogleSignin.hasPlayServices();
  const authInfo = await GoogleSignin.signIn();

  const {idToken} = authInfo;

  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  return await auth().signInWithCredential(googleCredential);
};

export function singOutGoogle() {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
}

export const authenticationWithEmailAndPass = (email, pass) => {
  return auth()
    .signInWithEmailAndPassword(email, pass)
    .then(result => {
      console.log(result);
      return true;
    })
    .catch(err => {
      console.log(err);
      return false;
    });
};

export const findUserAuthenticated = () => {
  return auth().currentUser;
};
