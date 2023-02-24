import firestore from '@react-native-firebase/firestore';
import { get_day_between_2day } from '../../helper';

export const get_AllProducts = (setData) => {
    let allEntries = [];
    const querySnapshot = firestore().collection('products').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
        // console.log('Got products collection result.');
        setData(allEntries);
    }
      
    function onError(error) {  
        console.error(error);
    }
}

export const get_AllProducts_limit = (category) => {
    // console.log(category);
    const querySnapshot_full = firestore().collection('products').orderBy('prices', 'desc').limit(5)

    // const querySnapshot = firestore().collection('products').where('categoryid', '==', category.id).orderBy('prices', 'desc').limit(5)
    if(category?.id == 'all' || !category) {
        return querySnapshot_full
    } else {
        return firestore().collection('products').where('categoryid', '==', category.id).orderBy('prices', 'desc').limit(5)
    }
};

export const get_ProductID = (setData, id) => {
    const querySnapshot = firestore().collection('products').doc(id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        // console.log('Got products collection result.');

        setData({...QuerySnapshot.data() , productid: QuerySnapshot.id});
    }
      
    function onError(error) {
        console.error(error);
    }
  };


export const get_Products_categoryID =  (setData, id) => {
    // console.log(req.params.id);
    let allEntries = [];

    const queryRef = firestore().collection('products');
    const query =  queryRef.where('categoryid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
        // console.log('Got products collection result.');
        setData(allEntries);
    }
      
    function onError(error) {
        console.error(error);
    }
}

export const get_Products_name =  (setData, name) => {
    // console.log(req.params.name);
    let allEntries = [];

    const queryRef = firestore().collection('products');
    const query =  queryRef.where('name', '==', name).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
        // console.log('Got products collection result.');
        setData(allEntries);
    }
      
    function onError(error) {
        console.error(error);
    }
}

export const get_Products_new = (category) => {
    let allEntries = [];

    const queryRef =  firestore().collection('products');
    if(category?.id == 'all' || !category) {
        return queryRef
    } else {
        return firestore().collection('products').where('categoryid', '==', category.id)
    }
}
