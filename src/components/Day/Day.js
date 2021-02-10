
import styles from './Day.module.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { Avatar, Badge } from 'antd';
import moment from 'moment';
import { Spin, Icon } from 'antd';
import { selectReminder, showDetails } from '../../store/actions';

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

const truncateText = (text) => text.length > 40? `${text.slice(0, 30)}...` : text
     

const Day = ({ reminders, currentDay, loading, selectReminder, showDetails, time }) => {

  const RemindersOnDay = remindersOnDay(reminders, currentDay);
    // const scrollType = {
    //   duration: 700,
    //   delay: 500,
    //   smooth: true, // linear "easeInQuint" "easeOutCubic" https://easings.net/es
    //   // offset: 50,
    // };

  // const handleShow = (item) => {
  //   electReminder(item)s
  //   showDetails()
  //   scroll.scrollTo(50, scrollType);
  // }

  let color = time!== {} && time.secondaryColor === '#ffffff'
  ? time.primaryColor 
  : time.secondaryColor

  const styleDay= {
    backgroundColor: `${currentDay < moment().subtract(1, "days")? `#eee`: 'transparent'}`,
    borderRadius: '.5em',
    opacity: `${currentDay< moment().subtract(1, "days")? `.8`: '1'}`
  } 

  const handleClickReminder = item => {
    // e.stopPropagation();
    console.log('click en reminder')
    console.log(item);
    selectReminder(item)
  }

  return (
    <div> 
      {!loading ? <ul className="events p-0" style= {styleDay}>
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
              <li key={item.id + item.reminder}>
                <Badge 
                  color={color} 
                  text={item.title? truncateText(item.title) : truncateText(item.reminder)} 
                  onClick={() => handleClickReminder(item)}
                  className = {styles.wrapperReminder} 
                />
              </li>
            )
          }
        )}
    </ul> 
    : <Spin indicator={antIcon} />
    }
    </div>
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