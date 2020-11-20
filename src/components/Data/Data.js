import React, { useEffect, useState } from 'react';
import s from './Data.module.css';
import { connect } from 'react-redux';

import * as moment from 'moment';
import 'moment/locale/es';
moment.locale("es");

const Data = ({time}) => {

    let styles = {
        backgroundColor: 'transparent',
        color: (time && time.secondaryColor === '#ffffff'? '#000' : time && time.secondaryColor),
    }
    
    const [data, setData] = useState(moment().format('llll'))
    
    useEffect(()=> {
        setInterval(()=> {
            setData(moment().format('llll'))
        }, 1000);
    }, [])

    return (
        <div className = {`jumbotron ${s.data}`} style = {styles}>
            {console.log(JSON.stringify(styles))}
            <h2>{JSON.stringify(data).slice(1, -1)}</h2>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        time: state.time
    }
}

export default connect(mapStateToProps)(Data);