import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

export const get_RolesbyEmail = async (email) => {
    let users = [];
    const query = await firestore().collection('users')
    .where('email', '==', email)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(user => {
            // console.log(user.data());
            users.push({ ...user.data(), querySnapshot: user.id });
        })

    });
    // console.log(users)
    return users;
  };

  export const get_User_byID = async () => {
    let users = [];
    const query = await firestore().collection('users')
    .doc(auth().currentUser.uid)
    .get().then((user) => users = user.data());
    // console.log(users)
    return users;
  };

