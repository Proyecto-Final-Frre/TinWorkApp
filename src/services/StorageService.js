import storage from '@react-native-firebase/storage';

export const globant = async () => {
  const ref = storage().ref('globant_.jpeg');
  const url = await ref.getDownloadURL();

  return url;
};
