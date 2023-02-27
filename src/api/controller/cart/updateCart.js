import firestore from '@react-native-firebase/firestore';
import auth from "@react-native-firebase/auth"

export const updateCart_plus_api = async (item) =>{
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
                  // update
                  firestore().collection('cart')
                  .doc(documentSnapshot.id)
                  .update({
                      incart: firestore.FieldValue.arrayUnion({
                          productid : data.productid,
                          quantity : data.quantity + 1,
                          price: item.prices
                      }),
                  });
              } 
            });
          }
      )
}

export const updateCart_minus_api = async (item) =>{
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
                  // update
                  firestore().collection('cart')
                  .doc(documentSnapshot.id)
                  .update({
                      incart: firestore.FieldValue.arrayUnion({
                          productid : data.productid,
                          quantity : data.quantity - 1,
                          price: item.prices
                      }),
                  });
              } 
            });
          }
      )
}
