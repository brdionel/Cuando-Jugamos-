import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { Calendar, Button } from 'antd';
import Month from './Month';
import Day from './Day';
import SelectInput from '../inputs';
import { readReminders, createReminder, updateNextJogo, readJogos ,
	setDate, readJogosById, readTimes} from '../../store/actions'
import styles from './Calendar.module.css'

const MyCalendar = ( props ) => {

	const { readReminders, date, setDate, updateNextJogo, readJogos, reminders,
		 loading, readJogosById, readTimes, time } = props;


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
		reminders: state.reminders,
		time: state.time
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        readReminders: () => dispatch(readReminders()),
        createReminder: (payload) => dispatch(createReminder(payload)),
        updateNextJogo: (payload) => dispatch(updateNextJogo(payload)),
		readJogos: () => dispatch(readJogos()),
		setDate: (payload) => dispatch(setDate(payload)),
		readJogosById: (id) => dispatch(readJogosById(id)),
		readTimes: () => dispatch(readTimes())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(MyCalendar);