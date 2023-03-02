import firestore from '@react-native-firebase/firestore';
const getProducts_id = (id) => {
    const query = firestore().collection('products').doc(id).get();
    return query;
 }
 export const get_Favorite_userID = (setData, id) => {   
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
        setData(result);
    }
     
    function onError(error) {
        console.error(error);
    }
};

 export const get_unFavorite_userID = (setData,id) => {
    const result = [];
    const queryRef = firestore().collection('favorite');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);


     function  onResult(QuerySnapshot) {
        let result = [];
        QuerySnapshot.forEach( (doc) => {
            result.push(doc.data().productid)
        })
        setData(result);
    }
     
    function onError(error) {
        console.error(error);
    }
};
export const getallProducts_id = (setData) => {
    let allEntries = [];
    const querySnapshot = firestore().collection('products').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push(doc.id ));
        setData(allEntries);
    }
      
    function onError(error) {  
        console.error(error);
    }
 }



