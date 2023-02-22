import firestore from '@react-native-firebase/firestore';
import { getIDCart } from './getCart';

export const deleteCart = (id) =>{
    const shoes = firestore().collection('cart').doc(id);
    const queryRef = firestore().collection('cart');
    const query =  queryRef.where('userid', '==', id).onSnapshot(onResult, onError);
    shoes.delete().then(() => {
    console.log('cart deleted!');
    });
};


export const removeCart = () =>{
    const id = getIDCart().then((query) =>{
        query.forEach((data) => {
            // console.log('id', data.id);
            firestore()
            .collection('cart')
            .doc(data.id)
            .delete()
            .then(() => {
                console.log('User deleted!');
            });
        });
    });
};