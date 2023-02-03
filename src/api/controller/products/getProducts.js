import firestore from '@react-native-firebase/firestore';

export const get_AllProducts = async () => {
    const allEntries = [];
    const querySnapshot = await firestore().collection('products').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
      }
      
    function onError(error) {
        console.error(error);
    }
    // querySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
    // firestore()
    //     .collection('products')
    //     .get()
    //     .then(querySnapshot => {
    //         querySnapshot.forEach(documentSnapshot => {
    //         console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    //         });
    // });
    return allEntries;

}