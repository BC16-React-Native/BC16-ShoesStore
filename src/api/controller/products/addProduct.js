import firestore from '@react-native-firebase/firestore';

export const addProduct = (product) =>{
    const shoes = firestore().collection('products').doc();
    const shoesObject = {
      id: shoes.id,
      name: product.name,
      prices : product.prices,
      amount : product.amount,
      info : product.info,
      categoryid : product.categoryid ,
      images : product.images,
      datecreate : product.datecreate,
    };
    shoes.set(shoesObject)
    .then(() => {
        console.log('product added!');
    });
}
