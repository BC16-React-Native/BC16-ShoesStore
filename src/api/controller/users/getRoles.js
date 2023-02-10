import firestore from '@react-native-firebase/firestore';


  export const get_RolesAdmin = (gmail) => {
    let users = [];
    const query =  firestore().collection('users')
    .where('email', '==', gmail)
    .get()
    .then(querySnapshot => {
        querySnapshot.forEach(user => {
            // console.log(user.data());
            users.push({ ...user.data(), querySnapshot: user.id });
        })
    });
    console.log(users)
    return users;
};