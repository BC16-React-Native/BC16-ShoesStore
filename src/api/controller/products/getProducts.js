import firestore from '@react-native-firebase/firestore';
import { get_day_between_2day } from '../../helper';

export const get_AllProducts = (setData) => {
    let allEntries = [];
    const querySnapshot = firestore().collection('products').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
        console.log('Got products collection result.');
        setData(allEntries);
      }
      
    function onError(error) {  
        console.error(error);
    }
}

export const get_AllProducts_limit = (setData) => {
    let allEntries = [];
      
    const querySnapshot = firestore().collection('products').orderBy('prices', 'desc').limit(5).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => allEntries.push({ ...doc.data(), id: doc.id }));
        console.log('Got products collection result.');
        setData(allEntries);
    }
      
    function onError(error) {
        console.error(error);
    }
};

export const get_ProductID = (setData, id) => {
    const querySnapshot = firestore().collection('products').doc(id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        console.log('Got products collection result.');
        setData({...QuerySnapshot.data() , id: QuerySnapshot.id});
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
        console.log('Got products collection result.');
        setData(allEntries);
    }
      
    function onError(error) {
        console.error(error);
    }
}

export const get_Products_new = (setData) => {
    let allEntries = [];

    const queryRef =  firestore().collection('products').onSnapshot(onResult, onError);
    // queryRef.forEach((doc) => {
    //     const now = new Date();
    //     const datecreate = new Date(doc.data().datecreate);
    //     const day_dist = get_day_between_2day(datecreate, now);

    //     day_dist < 7 ?  shoes.push({...doc.data(), id: doc.id}) : null;
    // })
    function onResult(QuerySnapshot) {
        allEntries = [];
        QuerySnapshot.forEach(doc => {
            const now = new Date();
            const datecreate = new Date(doc.data().datecreate);
            const day_dist = get_day_between_2day(datecreate, now);

            day_dist < 7 ?  allEntries.push({...doc.data(), id: doc.id}) : null;
        });
        console.log('Got products collection result.');
        setData(allEntries);
    }

    function onError(error) {
        console.error(error);
    }
}
