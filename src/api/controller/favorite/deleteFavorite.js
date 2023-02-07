import firestore from '@react-native-firebase/firestore';

export const deleteFavorite = (id) =>{
    const shoes = firestore().collection('favorite').doc(id);

    shoes.delete().then(() => {
    console.log('favorite deleted!');
    });

};