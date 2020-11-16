import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Calendar, Button } from 'antd';
import Month from './Month';
import Day from './Day';
import { readReminders, createReminder, updateNextJogo, readJogos , setDate} from '../../store/actions'
import styles from './Calendar.module.css'

const MyCalendar = ({ readReminders, date, setDate, updateNextJogo, readJogos, reminders, loading }) => {

	// triggers
   useEffect(() => { 
		(async () => {
			await readJogos() 
			readReminders()
		})()
  }, []);

  useEffect(() => {
  	if(reminders.length > 0){
      console.log('ahora hay reminders cargados!' + JSON.stringify(reminders))
      nextJogo()
    }
  }, [reminders])

	const nextJogo = () => {
		const hoje = moment()
		const next = reminders.find(remin => {
				if(moment(remin.fecha) >= hoje ) return remin
		})

		if(next) updateNextJogo(next)

		console.log('el juego siguiente es :'+ JSON.stringify(next))
	}

	// functions
		const DayToFn = (day) => {
			return (
				<Day
					loading={loading}
					reminders={reminders}
					currentDay={day}>
				</Day>
			);
		}
		//HandleSelectDate


	//COMPONENTE
	return (
		<div className = {`${styles.wrapperCalendar} my-5`}>
			<Calendar
					value = {date}
					onSelect = {setDate}
					dateCellRender={DayToFn}
					monthCellRender={Month}
			/>
		</div>

	)
}




const mapStateToProps = (state) => {
    return {
		date: state.date,
		loading: state.loading,
		reminders: state.reminders
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        readReminders: () => dispatch(readReminders()),
        createReminder: (payload) => dispatch(createReminder(payload)),
        updateNextJogo: (payload) => dispatch(updateNextJogo(payload)),
		readJogos: () => dispatch(readJogos()),
		setDate: (payload) => dispatch(setDate(payload))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);