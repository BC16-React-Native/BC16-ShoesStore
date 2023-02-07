import firestore from '@react-native-firebase/firestore';

export const get_Categories = (setData, id) => {
        // console.log(req.params.id)
    let result = [];
    const queryRef = firestore().collection('category');
    const query = queryRef.onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        result = [];
        QuerySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
        console.log('Got Categories collection result.', result);
        setData(result);
    }
      
    function onError(error) {
        console.error(error);
    }
};