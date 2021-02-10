import React, { useState } from "react";
import { connect } from "react-redux";
import { Input, DatePicker, Button } from "antd";
import styles from "./ReminderForm.module.css";
import { cancelCreateReminder, createReminder, setDate } from "../../store/actions";

const { TextArea } = Input;
 
const ReminderForm = (props) => {
  const { date, setDate, cancelCreateReminder, createReminder, reminderSelected} = props;
  const [newReminder, setNewReminder] = useState(reminderSelected.reminder) 
  const [title, setTitle] = useState(reminderSelected.title) 
  
  const onSubmit = (e) => {
    e.preventDefault();
    const newObject = {
      title,
      reminder: newReminder, 
      fecha : date,
      done: false
    }
    createReminder(newObject)
  }

  const handleClose = () => {
    cancelCreateReminder()
  }
   
  return (
    <form onSubmit = {onSubmit} className = {`${styles.wrapperReminderForm} mb-5`}>
      <div className = 'd-flex justify-content-between mb-4'>
        <h4>
          {!reminderSelected.fecha && 'Añadir nuevo' } recordatorio
        </h4>
        <Button onClick = {handleClose}> X </Button>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <Input 
            placeholder="Título"
            value = {reminderSelected.title? reminderSelected.title: title}
            onChange = { e => setTitle(e.target.value)}
            size="large" 
          /> 
        </div>
      </div>
      <div className="form-row">
        <div className="form-group col">
          <TextArea 
            placeholder="Recordatorio"
            value = {reminderSelected.reminder? reminderSelected.reminder : newReminder}
            onChange = { e => setNewReminder(e.target.value)}
            rows= {3}
            showCount 
            maxLength={100} 
            allowClear
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
    date: state.date,
    reminderSelected: state.reminder
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