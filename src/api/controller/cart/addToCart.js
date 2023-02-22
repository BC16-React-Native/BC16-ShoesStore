import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

export const addCart = (item) =>{
    const adddb = firestore().collection('cart').doc();

    const db = firestore().collection('cart')
        .where('userid', '==', auth().currentUser.uid)
        .get().then((querySnapshot) => {
            if (querySnapshot.docs.length == 0) {
                const cartObject = {
                    id: adddb.id,
                    incart: [{
                        productid: item.productid,
                        quantity: 1,
                        price: item.prices
                    }],
                    userid: auth().currentUser.uid,
                };
                adddb.set(cartObject)
                .then(() => {
                    console.log('cart added!');
                });
            } else {    
                querySnapshot.forEach(documentSnapshot => {
                // console.log('data: ', documentSnapshot.data());
                const data_exits = documentSnapshot.data().incart.find( (element) => {
                    return element.productid == item.productid
                });
                console.log('data: ', data_exits);
                
                if(data_exits)  {
                    // remove 
                    firestore().collection('cart')
                    .doc(documentSnapshot.id)
                    .update({
                        incart: firestore.FieldValue.arrayRemove(data_exits),
                    });
                    // update
                    firestore().collection('cart')
                    .doc(documentSnapshot.id)
                    .update({
                        incart: firestore.FieldValue.arrayUnion({
                            productid : data_exits.productid,
                            quantity : data_exits.quantity + 1,
                            price: item.prices
                        }),
                    });
                } else {
                    firestore().collection('cart')
                    .doc(documentSnapshot.id)
                    .update({
                        incart: firestore.FieldValue.arrayUnion({
                            productid : item.productid,
                            quantity : 1,
                            price: item.prices
                        }),
                    });
                }
              });
            }
        });
}
