import firestore from '@react-native-firebase/firestore';

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

