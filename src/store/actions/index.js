import { CREATE_REMINDER, CREATE_REMINDER_SUCCESS,SET_TIME_SUCCESS, SET_TIME_ERROR,
     CREATE_REMINDER_ERROR, READ_JOGOS, READ_REMINDERS_ERROR, READ_REMINDERS, CLOSE_VISIBLE,
     READ_REMINDERS_SUCCESS, LOAD_CREATE_REMINDER, CANCEL_CREATE_REMINDER, SET_VISIBLE,
     UPDATE_NEXT_JOGO, READ_JOGOS_SUCCESS, SET_DATE, READ_TIMES_SUCCESS, SET_TIME,
     READ_JOGOS_ERROR, SET_REMINDER, SHOW_DETAILS, CLOSE_DETAILS} from '../types';
    
import axios from 'axios';

const reminders = [
    // {
    //     id:1,
    //     reminder:'Examen JavaScript',
    //     fecha:'Sat Nov 15 2020 00:20:15 GMT-0500',
    //     color:'#21c236'

    // },
    // {
    //     id:2,
    //     reminder:'Examen Algebra',
    //     fecha:'Sun Nov 16 2020 00:20:15 GMT-0500',
    //     color:'#da6eff'


    // },
    // {
    //     id:3,
    //     reminder:'Viaje a Junin',
    //     fecha:'Mon Nov 17 2020 00:20:15 GMT-0500',
    //     color:'#FF0044'

    // },
    // {        
    //     id:4,
    //     reminder:'Cumpleaños Palomo',
    //     fecha:'Tue Nov 18 2020 00:20:15 GMT-0500',
    //     color:'#da6eff'
    // }
    
]

export function readJogos() {
    return async function(dispatch){
        try{
            dispatch({
                type: READ_JOGOS
            })
            const response = await axios.get('http://localhost:8000/jogos');
            setTimeout(() => {
                dispatch({
                    type: READ_JOGOS_SUCCESS,
                    payload: response.data
                })
            }, 1500)
           
        } catch(error){
            dispatch({
                type: READ_JOGOS_ERROR,
                payload:{
                    title:"Querido usuario, lo sentimos hubo un error",
                    debug: error
                }
            })
        }
    }   
}

export function readJogosById(id) {
    if(!id) throw new TypeError('Id no valido')
    return async function(dispatch){
        try{
            dispatch({
                type: READ_JOGOS
            })
            const response = await axios.get(`http://localhost:8000/jogos/${id}`);
            setTimeout(() => {
                dispatch({
                    type: READ_JOGOS_SUCCESS,
                    payload: response.data
                })
            }, 1500)

        } catch(error){
            dispatch({
                type: READ_JOGOS_ERROR,
                payload:{
                    title:"Querido usuario, lo sentimos hubo un error",
                    debug: error
                }
            })
        }
    }   
}

export function readTimes() {
    return async function(dispatch){
        try{
            const response = await axios.get(`http://localhost:8000/times`);
            dispatch({
                type: READ_TIMES_SUCCESS,
                payload: response.data.times
            })
           
        } catch(error){
            dispatch({
                type: READ_JOGOS_ERROR,
                payload:{
                    title:"Querido usuario, lo sentimos hubo un error",
                    debug: error
                }
            })
        }
    }   
}

export function selectTime(idTime){
    return async function(dispatch){
        try{
            dispatch({
                type: SET_TIME,
            })
            const response = await axios.get(`http://localhost:8000/times/${idTime}`);
            dispatch({
                type: SET_TIME_SUCCESS,
                payload: response.data
            })
        
        } catch(error){
            dispatch({
                type: SET_TIME_ERROR,
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
        id: reminders.length + 1
    }
    return function(dispatch){
        try{
            dispatch({
                type: CREATE_REMINDER
            })
            setTimeout(() => {
                dispatch({
                    type: CREATE_REMINDER_SUCCESS,
                    payload: newReminder
                })
            }, 1500)
            

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

export function cancelCreateReminder(){
    return {
        type: CANCEL_CREATE_REMINDER
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

export function readReminders() {
    return async function(dispatch){
        try{
            dispatch({
                type: READ_REMINDERS
            })
            setTimeout(() => {
                dispatch({
                    type: READ_REMINDERS_SUCCESS,
                    payload: reminders
                })
            }, 1500)
           
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

export function selectReminder(reminder){
    return function(dispatch){
        dispatch({
            type: SET_REMINDER, 
            payload: reminder
        })
    }
}

export function showDetails(){
    return {
        type: SHOW_DETAILS
    }
}

export function closeDetails(){
    return {
        type: CLOSE_DETAILS
    }
}

export function setDate(date){
    return {
        type: SET_DATE,
        payload: date
    }
}

export function setVisible(){
    return {
        type: SET_VISIBLE
    }
}


export function closeVisible(){
    return {
        type: CLOSE_VISIBLE
    }
}