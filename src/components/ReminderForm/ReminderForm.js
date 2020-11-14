import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Input, DatePicker, Button } from 'antd'
import { SelectInput } from '../inputs'
import styles from './ReminderForm.module.css'
import { cancelCreateReminder } from '../../store/actions'
 
const ReminderForm = (props) => {
    const { date, setDate, handleSubmit, cancelCreateReminder} = props;

    const [reminder, setReminder] = useState('') 
    const [color, setColor] = useState('#000000')

    const options = [
        {
            text: 'to-do',
            value: '#005EFF'
        },
        {
            text: 'azap',
            value: '#da6eff'
        },
        {
            text: 'important',
            value: '#FF0044'
        }
    ]

    const onSubmit = (e) => {
        e.preventDefault();
        const newObject = {
            reminder, 
            color,
            date
        }

        handleSubmit(newObject)
    }

    const handleClose = () => {
        cancelCreateReminder()
    }
    
    return (
        <form onSubmit = {onSubmit} className = {styles.wrapperReminderForm}>
        <div className = 'd-flex justify-content-between'>
            <h3>Nuevo Recordatorio</h3>
            <button onClick = {handleClose}> X </button>
        </div>
            <div class="form-row">
                <div class="form-group col">
                    <Input 
                        placeholder="recordatorio"
                        value = {reminder}
                        onChange = { e => setReminder(e.target.value)}
                    /> 
                </div>
            </div>
            <div class="form-row">
                <div class="col">
                    <DatePicker 
                        value = {date}
                        onChange = {setDate}
                    >
                    </DatePicker>
                </div>
                <div class="col">
                    <span>Ingresa una fecha aqui, o directamente haz un click en el calendario</span>
                </div>
            </div>
    
            <Button htmlType = "submit">
                Guardar
                </Button>
            {/*         
        <SelectInput
            handleChange = {setColor}
            options = {options}
        >
        </SelectInput> */}
     </form>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        cancelCreateReminder: () => dispatch(cancelCreateReminder())
    }
}

export default connect(null, mapDispatchToProps)(ReminderForm);