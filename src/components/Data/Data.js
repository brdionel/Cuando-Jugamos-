import React, { useEffect, useState } from 'react';
import s from './Data.module.css';
import { connect } from 'react-redux';

import * as moment from 'moment';
import 'moment/locale/es';
moment.locale("es");

const Data = ({time}) => {

    let styles = {
        backgroundColor: 'transparent',
        color: `${time.primaryColor}`,
        fontWeight: '500',
        marginBottom: '0'
    }
    
    const [data, setData] = useState(moment().format('llll'))
    
    useEffect(()=> {
        setInterval(()=> {
            setData(moment().format('llll'))
        }, 1000);
    }, [])

    return (
        <div className = {`${s.data}`} style = {styles}>
            {console.log(JSON.stringify(styles))}
            <p style = {styles}>
              <i className="far fa-clock mr-3"></i>
              {JSON.stringify(data).slice(1, -1)}
            </p>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        time: state.time
    }
}

export default connect(mapStateToProps)(Data);