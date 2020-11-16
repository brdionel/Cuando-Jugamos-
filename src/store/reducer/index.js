import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS, DELETE_REMINDER_ERROR, CREATE_REMINDER_ERROR,
    DELETE_REMINDER, DELETE_REMINDER_SUCCESS, READ_REMINDERS, READ_REMINDERS_ERROR, READ_REMINDERS_SUCCESS,
    UPDATE_REMINDER, UPDATE_REMINDER_ERROR, UPDATE_REMINDER_SUCCESS, LOAD_CREATE_REMINDER, UPDATE_NEXT_JOGO, 
    CANCEL_CREATE_REMINDER, READ_JOGOS_ERROR, READ_JOGOS_SUCCESS, SET_REMINDER, SHOW_DETAILS, CLOSE_DETAILS,
    SET_DATE } from '../types';

import moment from 'moment'

const init = {
    reminders:[],
    reminder:{},
    showDetails: false,
    loading:false,
    error:false,
    creating: false,
    nextJogo: null,
    date: moment(new Date, 'yyyy-mm-dd')
}
    
export default (state=init, action)=>{
    switch(action.type){

        case SHOW_DETAILS: 
        return {
            ...state,
            showDetails: true
        }

        case CLOSE_DETAILS: 
        return {
            ...state,
            showDetails: false
        }

        case READ_REMINDERS: 
        return {
            ...state,
            loading:true
        }

        case READ_REMINDERS_SUCCESS: 
        return {
            ...state,
            loading:false,
            reminders: [...state.reminders, ...action.payload]
        }

        case READ_REMINDERS_ERROR: 
        return {
            ...state,
            loading:false,
            error:action.payload
        }

        case READ_JOGOS_SUCCESS: 
        return {
            ...state,
            loading:false,
            reminders: [...state.reminders, ...action.payload.jogos]
        }

        case READ_JOGOS_ERROR: 
        return {
            ...state,
            loading:false,
            error:action.payload
        }


        case CREATE_REMINDER: 
        return {
            ...state,
            creating:false,
            loading:true
        }


        case CREATE_REMINDER_SUCCESS: 
        return {
            ...state,
            loading:false,
            reminders: [...state.reminders, action.payload]
        }

        case CREATE_REMINDER_ERROR: 
        return {
            ...state,
            loading:false,
            error:action.payload
        }

        case LOAD_CREATE_REMINDER:
            return {
                ...state,
                creating: true
            }

        case CANCEL_CREATE_REMINDER:
            return {
                ...state,
                creating: false
            }
        
        case UPDATE_NEXT_JOGO:
            return {
                ...state,
                nextJogo: action.payload
            }

        case SET_REMINDER: 
            return {
                ...state,
                reminder: action.payload
            }

        case SET_DATE:
            return {
                ...state,
                date: action.payload
            }

        default: return state;
    }

}