import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

export const registerUser = (name, phone, email, password) => {
    firestore()
    .collection('users')
    .doc(auth().currentUser.uid)
    .set({
      name: name,
      phone: phone,
      email: email,
      image: null,
      isAdmin: false,
      address: null,
      password: password,
    })
    .then(() => {
      console.log('User added!');
    })
    .catch((error) => console.log(error.message));
}