import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux'
import { selectTime } from '../../store/actions'
import { readTimes } from '../../store/actions'
import styles from './SelectTime.module.css'

const SelectInput = ({times, selectTime, readTimes}) => {

    const [inputSelect, setInputSelect] = useState('')

    useEffect(() => { 
        readTimes()
	}, []);

    const handleSelect = (e) => {
        console.log(e.target)
        setInputSelect(e.target.value)
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        selectTime(inputSelect)
    }
    

    return (
        <div className = {`d-flex flex-colum justify-content-center align-items-center ${styles.body}`}>
            {/* <div className={styles.positionBall}>
                <img 
                    src="https://res.cloudinary.com/dtnixnyfz/image/upload/v1605847928/1399_bvfuzt.png" 
                    className={styles.ball}
                    alt='img pelota'
                />
                <div className={styles.shadow}></div>
            </div> */}
            <form onSubmit={handleSubmit} className = { styles.wrapper}>
            <div class="form-group">
                <h1 className='display-4 text center mb-5'>¿Cuando Jugamos?</h1>
                <select 
                    className="form-control mb-5" 
                    id="time"
                    onChange={handleSelect}
                    value={inputSelect}

                >
                <option>Decinos cual es tu equipo?</option>
                    {
                        times && times.map(item => (
                            <option key={item._id}value={item._id}>{item.nome}</option>
                            ))
                    }
                
                </select>
            </div>
                <button type="submit" class="btn btn-primary">Seleccionar</button>
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        times: state.times
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        selectTime: (option) => dispatch(selectTime(option)),
        readTimes: () => dispatch(readTimes())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);
