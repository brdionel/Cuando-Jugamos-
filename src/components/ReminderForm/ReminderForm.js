import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, DatePicker, Button } from "antd";
import styles from "./ReminderForm.module.css";
import { cancelCreateReminder, createReminder, setDate } from "../../store/actions";
 
const ReminderForm = (props) => {
  const { date, setDate, cancelCreateReminder, createReminder} = props;
  const [reminder, setReminder] = useState('') 

  const onSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      reminder, 
      fecha : date
    }
    createReminder(newObject)
  }

  const handleClose = () => {
    cancelCreateReminder()
  }
   
  return (
    <form onSubmit = {onSubmit} className = {`${styles.wrapperReminderForm} mb-5`}>
      <div className = 'd-flex justify-content-between mb-4'>
        <h4>Añadir nuevo recordatorio</h4>
        <Button onClick = {handleClose}> X </Button>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <Input 
            placeholder="Recordatorio"
            value = {reminder}
            onChange = { e => setReminder(e.target.value)}
            size="large" 
          /> 
        </div>
      </div>
      <div class="form-row">
        <div class="form-group col">
          <DatePicker 
            value = {date}
            onChange = {setDate}
            size = 'large'
          >
          </DatePicker>
        </div>
      </div>
      <hr/>
      <div class="form-row">
        <div class="form-group col">
            <Button 
              htmlType = "submit"
              size = "large"
            >
              Guardar
            </Button>
        </div>
      </div>
    </form>
  )
}

const mapStateToProps = (state) => {
  return {
    date: state.date
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    cancelCreateReminder: () => dispatch(cancelCreateReminder()), 
    createReminder: (payload) => dispatch(createReminder(payload)),
    setDate: (date) => dispatch(setDate(date)) 
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReminderForm);