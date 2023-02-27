import firestore from '@react-native-firebase/firestore';

export const deleteFavorite = (id) =>{
    const shoes = firestore().collection('favorite').doc(id);

    shoes.delete().then(() => {
    console.log('favorite deleted!');
    });

};

export const deleteFavorite_idProduct = (id, idPro) =>{  
    const queryRef = firestore().collection('favorite');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    let data;
     function  onResult(QuerySnapshot) {
        QuerySnapshot.forEach( (doc) => {
            doc.data().productid == idPro ? data = doc.data().id : null;
        })
        firestore().collection('favorite').doc(data).delete().then(() => {
            console.log('favorite deleted!');
            });
    }
     
    function onError(error) {
        console.error(error);
    }
};