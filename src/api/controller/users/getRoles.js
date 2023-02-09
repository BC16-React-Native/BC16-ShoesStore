import firestore from '@react-native-firebase/firestore';

export const get_RolesAdmin = (setData) => {
    let orders = [];
    const queryRef = firestore().collection('users');
    const query = queryRef.where('isAdmin', '==', 'true').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        orders = [];
        QuerySnapshot.forEach(doc => orders.push({ ...doc.data(), id: doc.id }));
        console.log('Got order collection result.');
        setData(orders);
    }
      
    function onError(error) {
        console.error(error);
    }
  };