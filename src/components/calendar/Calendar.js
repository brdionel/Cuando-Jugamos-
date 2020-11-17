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
		nextJogo()
	}, [reminders])

	const nextJogo = () => {
		const hoje = moment().format('DD/MM/YYYY');
		
		let arrayOrdenado = reminders.sort(function(a,b){
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(a.fecha) - new Date(b.fecha);
		})

		
		const next = arrayOrdenado.find(remin => {
			if(!remin.idLocal) return false;
			
			let jogo = moment(remin.fecha).format('DD/MM/YYYY')
			if(hoje <= jogo) return remin
		})

		if(next) updateNextJogo(next)
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
		<div className = {`${styles.wrapperCalendar} mb-5`}>
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