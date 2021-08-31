import {ADD_ITEM,DELETE_ITEM,GET_ITEMS} from './types';

export const getItem = ()=>{
    return {
        type: GET_ITEMS
    };
};
export const deleteItem = id =>{
    return {
        type: DELETE_ITEM,
        payload:id
    };
};