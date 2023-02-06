import firestore from '@react-native-firebase/firestore';

export const updateProduct = (product, id) => {
    const shoes = firestore().collection('products').doc(id).update(product)
      .then(() => {
        console.log('product updated!');
      });
};
