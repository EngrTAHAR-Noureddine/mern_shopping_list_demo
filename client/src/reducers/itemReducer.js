import { v4 as uuidv4 } from 'uuid';
import {ADD_ITEM,DELETE_ITEM,GET_ITEMS} from '../actions/types';
const initialState = {
    items:[
        {id:uuidv4(),name:'Eggs'},
        {id:uuidv4(),name:'Milk'},
        {id:uuidv4(),name:'Steak'},
        {id:uuidv4(),name:'Water'}
    ]
};

export default function(state = initialState, action){
    switch(action.type){
        case GET_ITEMS: return {...state};
        case DELETE_ITEM : 
            return {
                ...state,
                items: state.items.filter(item=>item.id!==action.payload)
            }
        default : return state;
    }
}
