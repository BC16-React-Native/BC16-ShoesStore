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

export const get_Cart_uID = (setData,setSubToTal, id) => {
    let allEntries = [];
    let subtotal = 0;
    const queryRef = firestore().collection('cart');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allEntries = [];
        let finalResult = [];
        QuerySnapshot.forEach(doc => allEntries = doc.data().incart);
        console.log('Got cart collection result.',allEntries);
        // allEntries.map(entry => result.push(entry.productid));
        // console.log('Got result.',result);
        for (let i = 0; i < allEntries.length; i++) {
            getProducts_id(allEntries[i].productid).then(
                (data) => {
                    finalResult.push({...data.data(), quantity: allEntries[i].quantity});
                }
             )
        }
        console.log('Got product in cart collection result.',finalResult);
        for (let i = 0; i < finalResult.length; i++) {
            subtotal += finalResult[i].prices * finalResult[i].quantity;
        }
        console.log('subtotal',subtotal);
        setSubToTal(subtotal);
        setData(finalResult);
    }
      
    function onError(error) {
        console.error(error);
    }
  }