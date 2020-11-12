import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS, DELETE_REMINDER_ERROR, CREATE_REMINDER_ERROR,
    DELETE_REMINDER, DELETE_REMINDER_SUCCESS, READ_REMINDERS, READ_REMINDERS_ERROR, READ_REMINDERS_SUCCESS,
    UPDATE_REMINDER, UPDATE_REMINDER_ERROR, UPDATE_REMINDER_SUCCESS, LOAD_CREATE_REMINDER, UPDATE_NEXT_JOGO}
    from '../types';

const init = {
    reminders:[],
    reminder:{},
    loading:false,
    error:false,
    creating: false,
    nextJogo: null   
}
    
export default (state=init, action)=>{
    switch(action.type){

        case READ_REMINDERS: 
        return {
            ...state,
            loading:true
        }


        case READ_REMINDERS_SUCCESS: 
        return {
            ...state,
            loading:false,
            reminders: action.payload
        }

        case READ_REMINDERS_ERROR: 
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
        
        case UPDATE_NEXT_JOGO:
            return {
                ...state,
                nextJogo: action.payload
            }

        default: return state;
    }

}