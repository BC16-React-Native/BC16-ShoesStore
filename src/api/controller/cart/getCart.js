import firestore from '@react-native-firebase/firestore';
const getProducts_id = (id) => {
    const query = firestore().collection('products').doc(id).get();
    return query;
}


export const get_Cart_userID = (setData, id) => {
    const queryRef = firestore().collection('cart');
    const query = queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        let result = [];
        QuerySnapshot.forEach(doc => {
            getProducts_id(doc.data().productid).then(
               (data) => {
                    result.push({...data.data(), id: doc.id , quantity: doc.data().quantity, price: doc.data().price});
               }
            )
           
        });
        console.log('Got Cart collection result.', result);
        setData(result);
        
    }
     
    function onError(error) {
        console.error(error);
    }
};

export const get_PriceCart_userID = (setData, id) => {
    const queryRef = firestore().collection('cart');
    const query = queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        let result = [];
        QuerySnapshot.forEach(doc => {
            result.push(doc.data().price);
           
        });
        console.log('Got Price Cart collection result.', result);
        setData(result);
        
    }
     
    function onError(error) {
        console.error(error);
    }
};

export const get_Cart_uID = (setdata,id) => {
    let allEntries = [];
    const queryRef = firestore().collection('cart')
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        let finalResult = [];
        QuerySnapshot.forEach(doc => allEntries = doc.data().incart);

        setdata(allEntries);
    }
      
    function onError(error) {
        console.error(error);
    }
}

export const get_LenghtCart_uID = (setdata,id) => {
    let allEntries = [];
    const queryRef = firestore().collection('cart')
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        let finalResult = [];
        QuerySnapshot.forEach(doc => allEntries = doc.data().incart);

        setdata(allEntries.length);
    }
      
    function onError(error) {
        console.error(error);
    }
}