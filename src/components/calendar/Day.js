
import styles from './Day.module.css';
import React, { useState } from 'react';
import { connect } from 'react-redux'
import { Avatar, Badge } from 'antd';
import moment from 'moment';
import { Spin, Icon } from 'antd';
import { selectReminder, showDetails } from '../../store/actions'

const antIcon = <Icon type="loading" style={{ fontSize: 24 }} spin />;

const remindersOnDay = (reminders, currentDay) => {
    const isDay = (item, currentDay) => {
        const date = moment(item.fecha);
        if (date.format('DD') === currentDay.format('DD')
            && (date.format('MM') === currentDay.format('MM'))
            && (date.format('YYYY') === currentDay.format('YYYY'))
        ) {
            return true;
        }

        return false;
    }
    const remindersOnDay = reminders.filter(item => isDay(item, currentDay));
    return remindersOnDay;
}

const Day = ({ reminders, currentDay, loading, selectReminder, showDetails }) => {

  const RemindersOnDay = remindersOnDay(reminders, currentDay);

  const handleShow = (item) => {
    selectReminder(item)
    showDetails()
  }

  return (
    <>
      {!loading ? <ul className="events p-0">
        {RemindersOnDay.map(item => 
          { if(item.idLocal) {
            return (
              <div key={item._id} className={styles.wrapper} 
                onClick = { () => handleShow(item)}
              >
                <Avatar src={item.idLocal.avatarURL} />
                <span>  </span>
                <Avatar src={item.idVisitante.avatarURL} />
              </div>
              )
            }
            else return (
              <li key={item.id} className = {styles.wrapperReminder}>
                <Badge color="yellow" text={item.reminder} />
              </li>
            )
          }
        )}
    </ul> 
    : <Spin indicator={antIcon} />
    }
    </>
  );
}

const mapStateToProps = (state) => {
    return {
        jogo: state.reminder
    }
}


const mapDispacthToProps = (dispacth) => {
    return {
        selectReminder: (item) => dispacth(selectReminder(item)),
        showDetails: () => dispacth(showDetails())
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(Day)