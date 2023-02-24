import firestore from '@react-native-firebase/firestore';
import { getIDCart } from './getCart';
import auth from "@react-native-firebase/auth"


export const removeCart = () =>{
    const id = getIDCart().then((query) =>{
        query.forEach((data) => {
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

export const deleteCart = (item) =>{
    const adddb = firestore().collection('cart').doc();
  
    const db = firestore().collection('cart')
        .where('userid', '==', auth().currentUser.uid)
        .get().then((querySnapshot) => { 
                querySnapshot.forEach(documentSnapshot => {
                const data = documentSnapshot.data().incart.find( (element) => {
                    return element.productid == item.productid
                });
                
                if(data)  {
                    // remove 
                    firestore().collection('cart')
                    .doc(documentSnapshot.id)
                    .update({
                        incart: firestore.FieldValue.arrayRemove(data),
                    });
                } 
              });
            }
        )
  }