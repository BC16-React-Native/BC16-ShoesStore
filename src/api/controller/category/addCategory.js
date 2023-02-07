import firestore from '@react-native-firebase/firestore';

export const addFavorite = (data) =>{
    const db = firestore().collection('category').doc();
    const categoryObject = {
      id: db.id,
        name: data.name,
    };
    db.set(categoryObject)
    .then(() => {
        console.log('category added!');
    });
}
  