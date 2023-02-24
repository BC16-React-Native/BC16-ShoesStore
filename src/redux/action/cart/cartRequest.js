import { getCartFailed, getCartStart, setCart } from "../../features/cart/cartSlice";
import auth from "@react-native-firebase/auth"
import firestore from '@react-native-firebase/firestore';
import { useSelector } from "react-redux";

export const getCart = async (dispatch) => {
    dispatch(getCartStart());
    try{
        const queryRef = firestore().collection('cart')
        const query = await queryRef.where('userid', '==', auth().currentUser.uid)
            .get().then((query) =>{
                query.forEach((data) => {
                    dispatch(setCart(data.data()));
                });
            });
    } catch(err){
        dispatch(getCartFailed(err));
    }
};
export const updateCart_minus = (dispatch, cart, item) => {
    dispatch(getCartStart());
    try{
        const data_exits = cart.incart.find( (element) => {
            return element.productid == item.productid
        });
        var filtered = cart.incart.filter((el) => { return el.productid != item.productid; }); 
        filtered.push({...data_exits, quantity: data_exits.quantity - 1});
        const update = {...cart, incart: filtered}
        dispatch(setCart(update));

    } catch(err){
        dispatch(getCartFailed(err));
    }
};
export const updateCart_plus = (dispatch, cart, item) => {
    dispatch(getCartStart());
    try{
        const data_exits = cart.incart.find( (element) => {
            return element.productid == item.productid
        });
        var filtered = cart.incart.filter((el) => { return el.productid != item.productid; }); 
        filtered.push({...data_exits, quantity: data_exits.quantity + 1});
        const update = {...cart, incart: filtered}
        dispatch(setCart(update));

    } catch(err){
        dispatch(getCartFailed(err));
    }
};

export const deleteItemCart = (dispatch, cart, item) => {
    dispatch(getCartStart());
    try{
        // const data_exits = cart.incart.find( (element) => {
        //     return element.productid == item.productid
        // });
        var filtered = cart.incart.filter((el) => { return el.productid != item.productid; }); 
        // filtered.push({...data_exits, quantity: data_exits.quantity + 1});
        const update = {...cart, incart: filtered}
        dispatch(setCart(update));

    } catch(err){
        dispatch(getCartFailed(err));
    }
};
