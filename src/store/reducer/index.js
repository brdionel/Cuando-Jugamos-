import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS, CREATE_REMINDER_ERROR, SET_TIME_SUCCESS,
    SET_TIME_ERROR, READ_REMINDERS, READ_REMINDERS_ERROR, READ_REMINDERS_SUCCESS, LOAD_CREATE_REMINDER, 
    UPDATE_NEXT_JOGO, CANCEL_CREATE_REMINDER, READ_JOGOS_ERROR, READ_JOGOS_SUCCESS, SET_TIME,
    SET_REMINDER, SHOW_DETAILS, CLOSE_DETAILS, SET_DATE, READ_TIMES_SUCCESS, READ_JOGOS, SET_VISIBLE,
    CLOSE_VISIBLE, SET_JOGO } from '../types';

import moment from 'moment'

const init = {
  reminders:[],
  reminder:{},
  times: [],
  time: false,
  showDetails: false,
  loading:false,
  error:false,
  creating: false,
  nextJogo: false,
  date: moment(new Date, 'yyyy-mm-dd'),
  visible: false
}
    
export default (state=init, action)=>{
    switch(action.type){

        case SHOW_DETAILS: 
        return {
            ...state,
            creating: state.creating && false,
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

        case SET_TIME:
            return {
                ...state,
                loading: true
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

        case READ_JOGOS: 
        return {
            ...state,
            loading:true,
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
            error: action.payload
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
                showDetails: state.showDetails && false,
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

        case READ_TIMES_SUCCESS: 
            return {
                ...state,
                times: action.payload
            }

        case SET_TIME_SUCCESS:
            return {
                ...state,
                reminders: [],
                loading: false,
                time: action.payload.time
            }

        case SET_VISIBLE:
            return {
                ...state,
                visible: true
            }

        case CLOSE_VISIBLE:
            return {
                ...state,
                visible: false
            }

        case SET_JOGO:
            const jogo = state.reminders.find(item => {
              return(item._id === action.payload) 
            })
            return {
              ...state,
              reminder: jogo
            }

        default: return state;
    }

}