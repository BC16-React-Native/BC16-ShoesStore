import firestore from '@react-native-firebase/firestore';

export const updateUsers = (users, id) => {
    const shoes = firestore().collection('users').doc(id).update(users)
      .then(() => {
        console.log('product updated!');
      });
};