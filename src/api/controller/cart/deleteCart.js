import firestore from '@react-native-firebase/firestore';

export const deleteCart = (id) =>{
    const shoes = firestore().collection('cart').doc(id);
    
    const queryRef = firestore().collection('cart');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);
    shoes.delete().then(() => {
    console.log('cart deleted!');
    });

};