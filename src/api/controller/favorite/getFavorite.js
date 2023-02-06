import firestore from '@react-native-firebase/firestore';

export const get_Favorite_userID = (setData, id) => {
        // console.log(req.params.id)
    let result = [];
    const queryRef = firestore().collection('favorite');
    const query = queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        result = [];
        QuerySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
        console.log('Got Favorites collection result.', result);
        setData(result);
    }
      
    function onError(error) {
        console.error(error);
    }
};