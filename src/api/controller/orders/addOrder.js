import firestore from '@react-native-firebase/firestore';

export const addOrder = (order) =>{
    const db = firestore().collection('orders').doc();
    const orderObject = {
      id: db.id,
      address: order.address,
      productsid : order.productsid,
      status : order.status,
      userid : order.userid,
      total : order.total,
      datecreate : order.datecreate,
    };
    db.set(orderObject)
    .then(() => {
        console.log('order added!');
    });
}
