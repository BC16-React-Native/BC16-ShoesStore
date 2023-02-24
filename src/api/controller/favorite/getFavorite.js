import firestore from '@react-native-firebase/firestore';
const getProducts_id = (id) => {
    const query = firestore().collection('products').doc(id).get();
    return query;
 }
 export const get_Favorite_userID = (setData, id) => {
        // console.log(req.params.id)
   
    const queryRef = firestore().collection('favorite');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);


     function  onResult(QuerySnapshot) {
        let result = [];
        QuerySnapshot.forEach( (doc) => {
             getProducts_id(doc.data().productid).then(
               (data) => {
                    result.push({...data.data(), id: doc.id });
               }
            )
           
        });
        // console.log('Got Favorites collection result.', result);
        setData(result);
    }
     
    function onError(error) {
        console.error(error);
    }
};

