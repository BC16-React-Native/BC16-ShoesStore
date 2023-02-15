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
    const query = queryRef.where('status', '==', 'delivered').onSnapshot(onResult, onError);

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



export const  getProduct_id = async (setData) => {
    const ordersRef = firestore().collection('Orders');
const productsRef = firestore().collection('Products');

// Query the Orders collection to get the order with the specified ID
ordersRef.where('status', '==', 'delivered').get().then((orderDoc) => {
  if (orderDoc.exists) {
    // Get the product ID from the order document
    const productId = Object.keys(orderDoc.data().productsid)[0].productid;

    // Query the Products collection to get the product with the specified ID
    productsRef.doc(productId).get().then((productDoc) => {
      if (productDoc.exists) {
        // Get the first image URL from the product document
        const productImg = productDoc.data().imgs[0];
        console.log('First image URL:', productImg);
      } else {
        console.log('Product document does not exist');
      }
    }).catch((error) => {
      console.log('Error getting product document:', error);
    });
  } else {
    console.log('Order document does not exist');
  }
}).catch((error) => {
  console.log('Error getting order document:', error);
});
}

export const getFirstProductInOrders = async (setData) => {
    try {
      const ordersRef = firestore().collection('orders').where('status', '==', 'delivered');
      const querySnapshot = await ordersRef.get();
      const results = [];
      for (const orderDoc of querySnapshot.docs) {
        const productIdsMap = orderDoc.get('productsid');
        if (productIdsMap) {
            const firstProductId = productIdsMap?.[0].productid;
  
            // Fetch the details of the first product from the "products" collection
            const productsRef = firestore().collection('products');
            const productDoc = await productsRef.doc(firstProductId).get();
            const productData = productDoc.data();
            const result = {...orderDoc?.data(), ...productDoc?.data(), id: orderDoc.id}
            results.push(result);
        } else {
          console.log('No products found for order:', orderDoc.id);
        }
        setData(results);
      }
    } catch (error) {
      console.log('Error getting first product in orders: ', error);
    }
  };

  