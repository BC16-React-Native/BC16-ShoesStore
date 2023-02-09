import firestore from '@react-native-firebase/firestore';

export const get_AllOrder = (setData) => {
    let allOrder = [];
    
    const query = firestore().collection('orders').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        allOrder = [];
        QuerySnapshot.forEach(doc => allOrder.push({ ...doc.data(), id: doc.id }));
        console.log('Got order collection result.');
        setData(allOrder);
    }

    function onError(error) {
        console.error(error);
    }
};

export const get_OrderID = (setData, id) => {
    const querySnapshot = firestore().collection('orders').doc(id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        console.log('Got order collection result.');
        setData({...QuerySnapshot.data() , id: QuerySnapshot.id});
    }
      
    function onError(error) {
        console.error(error);
    }
};

export const get_Order_userID = (setData, id) => {

    let result = [];
    const queryRef = firestore().collection('orders');
    const query = queryRef.where('userid', '==', id).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        result = [];
        QuerySnapshot.forEach(doc => result.push({ ...doc.data(), id: doc.id }));
        console.log('Got order collection result.');
        setData(result);
    }
      
    function onError(error) {
        console.error(error);
    }
};

export const getOrder_status_delivery_pending = (setData) => {
    let orders = [];
    const queryRef = firestore().collection('orders');
    const query = queryRef.where('status', 'in', ['delivering', 'pending']).onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        orders = [];
        QuerySnapshot.forEach(doc => orders.push({ ...doc.data(), id: doc.id }));
        console.log('Got order collection result.');
        setData(orders);
    }
      
    function onError(error) {
        console.error(error);
    }
  };

  export const getOrder_status_deliveried = (setData) => {
    let orders = [];
    const queryRef = firestore().collection('orders');
    const query = queryRef.where('status', '==', 'deliveried').onSnapshot(onResult, onError);

    function onResult(QuerySnapshot) {
        orders = [];
        QuerySnapshot.forEach(doc => orders.push({ ...doc.data(), id: doc.id }));
        console.log('Got order collection result.');
        setData(orders);
    }
      
    function onError(error) {
        console.error(error);
    }
  };