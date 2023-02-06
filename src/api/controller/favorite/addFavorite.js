import firestore from '@react-native-firebase/firestore';

export const addFavorite = (data) =>{
    const db = firestore().collection('favorite').doc();
    const favoriteObject = {
      id: db.id,
      productid: data.productid,
      userid: data.userid,
    };
    db.set(favoriteObject)
    .then(() => {
        console.log('Favorite added!');
    });
}
  