import React, { useEffect, useState } from 'react';
import styles from './Data.module.css';

import * as moment from 'moment';
import 'moment/locale/es';
moment.locale("es");

const Data = () => {

    const [data, setData] = useState(moment().format('llll'))

    useEffect(()=> {
        setInterval(()=> {
            setData(moment().format('llll'))
        }, 1000);
    }, [])

    return (
        <div className = {`jumbotron ${styles.data}`} style = {{
            backgroundColor: 'rgba(0, 0, 0, 0.692)',
            color: '#fff'
        }}>
            {console.log(JSON.stringify(data))}
            <h2 className = 'text-white'>{JSON.stringify(data).slice(1, -1)}</h2>
        </div>
    )
}

export default Data;