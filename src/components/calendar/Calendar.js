import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Calendar, } from 'antd';
import Month from './Month';
import Day from './Day';
import ReminderForm from '../ReminderForm';
import { readReminders, createReminder, updateNextJogo, readJogos } from '../../store/actions'

const MyCalendar = ({ readReminders, state , createReminder, updateNextJogo, readJogos }) => {

    // triggers
    useEffect(() => { 
        readReminders()
        readJogos() 
    }, []);

    useEffect(() => {
        if(state.reminders.length > 0){
            console.log('ahora hay reminders cargados!' + JSON.stringify(state.reminders))
            nextJogo()

        }
    }, [state.reminders])

    const nextJogo = () => {
        const hoje = moment()
        const next = state.reminders.find(remin => {
            if(moment(remin.fecha) >= hoje ) return remin
        })

        if(next) updateNextJogo(next)

        console.log('el juego siguiente es :'+ JSON.stringify(next))
    }

    // constants
 
    const [date, setDate] = useState(moment(new Date, 'yyyy-mm-dd'))

    // functions
        const DayToFn = (day) => {
            return (
                <Day
                    loading={state.loading}
                    reminders={state.reminders}
                    currentDay={day}>
                </Day>
            );
        }
        //HandleSelectDate


    //COMPONENTE
    return (
        <>
            <div className = "container">
                <div className = "row">
                    <div className='col-sm-12 col-lg-6'>
                        {state.creating
                            ? (<ReminderForm 
                                handleSubmit = {createReminder}
                                date = {date}
                                setDate = { setDate }
                            />)
                            : null
                        }
                    </div>
                </div>   

            </div>

            <Calendar
                value = {date}
                onSelect = {setDate}

                dateCellRender={DayToFn}
                monthCellRender={Month}
            />
        </>

    )
}




const mapStateToProps = (state) => {
    console.log(state)
    return {
        state
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        readReminders: () => dispatch(readReminders()),
        createReminder: (payload) => dispatch(createReminder(payload)),
        updateNextJogo: (payload) => dispatch(updateNextJogo(payload)),
        readJogos: () => dispatch(readJogos())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);