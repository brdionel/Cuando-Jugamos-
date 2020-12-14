
import styles from './Day.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Badge } from 'antd';
import moment from 'moment';
import { Spin, Icon } from 'antd';
import { selectReminder, showDetails } from '../../store/actions';
import { animateScroll as scroll} from 'react-scroll';

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

const Day = ({ reminders, currentDay, loading, selectReminder, showDetails, time }) => {

  const RemindersOnDay = remindersOnDay(reminders, currentDay);
    const scrollType = {
      duration: 700,
      delay: 500,
      smooth: true, // linear "easeInQuint" "easeOutCubic" https://easings.net/es
      // offset: 50,
    };

  // const handleShow = (item) => {
  //   electReminder(item)s
  //   showDetails()
  //   scroll.scrollTo(50, scrollType);
  // }

  let color = time!== {} && time.secondaryColor === '#ffffff'
  ? time.primaryColor 
  : time.secondaryColor


  return (
    <>
      {!loading ? <ul className="events p-0">
        {RemindersOnDay.map(item => 
          { if(item.idLocal) {
            return (
              <Link 
                to={`/jogo/${item._id}`} 
                key={item._id + item.idLocal.nome} 
                className={styles.wrapper} 
              >
                <Avatar src={item.idLocal.avatarURL} />
                <span> - </span>
                <Avatar src={item.idVisitante.avatarURL} />
              </Link>
              )
            }
            else return (
              <li key={item.id + item.reminder} className = {styles.wrapperReminder}>
                <Badge 
                  color={color} 
                  text={item.reminder} 
                />
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
        jogo: state.reminder,
        time: state.time,
        loading: state.loading
    }
}


const mapDispacthToProps = (dispacth) => {
    return {
        selectReminder: (item) => dispacth(selectReminder(item)),
        showDetails: () => dispacth(showDetails())
    }
}

export default connect(mapStateToProps, mapDispacthToProps)(Day)