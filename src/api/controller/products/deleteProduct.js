import firestore from '@react-native-firebase/firestore';

export const deleteProduct = (id) =>{
    const shoes = firestore().collection('products').doc(id);

    shoes.delete().then(() => {
    console.log('product deleted!');
    });

};