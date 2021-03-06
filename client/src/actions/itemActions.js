import axios from 'axios';
import {ADD_ITEM,DELETE_ITEM,GET_ITEMS,ITEMS_LOADING} from './types';

export const getItem = () => dispatch =>{
   dispatch(setItemLoading()); /*return true*/
   axios.get('/api/items')
        .then(res=>dispatch({
            type:GET_ITEMS,
            payload:res.data
        }));

};

export const deleteItem = id =>dispatch =>{
    axios.delete(`/api/items/${id}`)
        .then(res=>dispatch(
            {
                type:DELETE_ITEM,
                payload:id
            }
        ));
};

export const addItem = item =>dispatch => {
   axios.post('/api/items',item)
        .then(res=>dispatch({
            type:ADD_ITEM,
            payload: res.data
        }))
};

export const setItemLoading=()=>{
    return {
        type:ITEMS_LOADING
    }
}

