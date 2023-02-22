import firestore from '@react-native-firebase/firestore';
const getProducts_id = (id) => {
    const query = firestore().collection('products').doc(id).get();
    return query;
}

export const get_Cart_Price = (list) => {
    // console.log("ac",list)
    let subtotal = 0;

    Array.isArray(list) ? list?.forEach((item) => {
        console.log(item);
        subtotal += item?.price * item?.quantity;
    })
    : subtotal += list?.prices * list?.quantity;
    return subtotal
}


export const get_Cart_uID = (setdata,id) => {
   let allEntries = [];
   const queryRef = firestore().collection('cart')
   const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);


   function onResult(QuerySnapshot) {
       allEntries = [];
       let finalResult = [];
       QuerySnapshot.forEach(doc => allEntries = doc.data().incart);
       // console.log('Got cart collection result.',allEntries);
       // allEntries.map(entry => result.push(entry.productid));
       // console.log('Got result.',result);
       // for (let i = 0; i < allEntries.length; i++) {
       //     getProducts_id(allEntries[i].productid).then(
       //         (data) => {
       //             finalResult.push({...data.data(), quantity: allEntries[i].quantity});
       //         }
       //      )
       // }
       // console.log('Got product in cart collection result.',finalResult);
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
