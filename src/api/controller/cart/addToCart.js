import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"
import { getFirestore, Timestamp, FieldValue } from 'firebase-admin/firestore';

export const addCart = (item) =>{
    const db = firestore().collection('cart')
        .where('userid', '==', auth().currentUser.uid)
        .get().then((querySnapshot) => {
            querySnapshot.forEach(documentSnapshot => {
                // console.log('data: ', documentSnapshot.data());
                const data_exits = documentSnapshot.data().incart.find( (element) => {
                    return element.productid == item.id
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
                            quantity : data_exits.quantity + 1
                        }),
                    });
                } else {
                    firestore().collection('cart')
                    .doc(documentSnapshot.id)
                    .update({
                        incart: firestore.FieldValue.arrayUnion({
                            productid : item.id,
                            quantity : 1
                        }),
                    });
                }
              });
        });
    // const categoryObject = {
    //   id: db.id,
    //     name: data.name,
    // };
    // db.set(categoryObject)
    // .then(() => {
    //     console.log('category added!');
    // });
    console.log(item);
    // console.log(db.data);
    // function onResult(QuerySnapshot) {
    //     // let result = [];
    //     QuerySnapshot.forEach(doc => {
    //         // console.log(doc.data());
    //         doc.data().incart.find( (element) => {
    //             return element.productid == item.id
    //         });
    //     });

    //     // console.log('Got Cart', QuerySnapshot);
    //     // setData(result);
    // }
    
    // function onError(error) {
    //     console.error(error);
    // }
}
