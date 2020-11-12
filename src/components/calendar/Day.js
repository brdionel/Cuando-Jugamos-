
import styles from './Day.module.css';
import React from 'react';
import { Avatar, Image } from 'antd';
import moment from 'moment';
import { Spin, Icon } from 'antd';
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

const Day = ({ reminders, currentDay, loading }) => {

    const RemindersOnDay = remindersOnDay(reminders, currentDay);

    const handleClick = (item) =>{
        alert(item.localNome + ' contra ' + item.visitanteNome)
    }

    return (
        !loading ? <ul className="events p-0">
            {RemindersOnDay.map(item => (

                <div key={item.id} className={styles.wrapper} onClick = {() => handleClick(item)}>
<                    Avatar src={item.localAvatar} />
                    <span> - </span>
                    <Avatar src={item.visitanteAvatar} />
                </div>
            ))}
        </ul> 
        : <Spin indicator={antIcon} />


    );
}
export default Day