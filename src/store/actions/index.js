import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS,
     CREATE_REMINDER_ERROR, READ_REMINDERS, READ_REMINDERS_ERROR, 
     READ_REMINDERS_SUCCESS, LOAD_CREATE_REMINDER, UPDATE_NEXT_JOGO} from '../types';
    
import axios from 'axios';

const reminders = [
    {
        id:1,
        reminder:'Reminder 1',
        day:'Wed Feb 05 2020 00:20:15 GMT-0500',
        color:'#21c236'

    },
    {
        id:2,
        reminder:'Reminder 2',
        date:'Thu Feb 06 2020 00:20:15 GMT-0500',
        color:'#da6eff'


    },
    {
        id:3,
        reminder:'Reminder 3',
        date:'Thu Feb 06 2020 00:20:15 GMT-0500',
        color:'#FF0044'

    },
    {        
        id:4,
        reminder:'Reminder 4',
        date:'Thu Mar 06 2020 00:20:15 GMT-0500',
        color:'#da6eff'
    }
    
]


export function readReminders() {
    return async function(dispatch){
        try{
            const response = await axios.get('http://localhost:8000/jogos');
            dispatch({
                type: READ_REMINDERS_SUCCESS,
                payload: response.data
            })
           
        } catch(error){
            dispatch({
                type: READ_REMINDERS_ERROR,
                payload:{
                    title:"Querido usuario, lo sentimos hubo un error",
                    debug: error
                }
            })
        }
    }   
}

export function createReminder(reminder){
    const newReminder = {
        ...reminder, 
        id: reminders.length + 1,
        day: null
    }
    return function(dispatch){
        try{
            dispatch({
                type: CREATE_REMINDER
            })
            setTimeout(()=> {
                dispatch({
                    type: CREATE_REMINDER_SUCCESS,
                    payload: newReminder
                })
            }, 2500)

        } catch(error){
            dispatch({
                type: CREATE_REMINDER_ERROR,
                payload:{
                    title:"Querido usuario, lo sentimos hubo un error",
                    debug: error
                }
            })
        }
    }
}

export function loadCreateReminder() {
    return function(dispatch){
        dispatch({
            type: LOAD_CREATE_REMINDER
        })
    }
}

export function updateNextJogo(jogoDate) {
    return function(dispatch){
        dispatch({
            type: UPDATE_NEXT_JOGO,
            payload: jogoDate
        })
    }
}