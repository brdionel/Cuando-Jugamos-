import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {closeDetails } from '../../store/actions';
import styles from './JogoDetails.module.css';

const JogoDetails = ({ jogo, closeDetails}) => {
    
    const handleClose = () => {
        closeDetails()
    }

    return (
        <div className={`mb-5 ${styles.wrapper}`}>
            <div className = 'row'>
                <div className = 'col-12 col-md-3'>
                    <small className = 'd-block'>{moment(jogo.fecha).format('dddd')}</small>
                    <small>{moment(jogo.fecha).format('L')}</small>
                </div>
                <div className = 'col-12 col-md-6 d-flex flex-column align-items-center'>
                    <h3 className='mb-5 text-center'>{jogo.idCampeonato.nome}</h3>
                    <div className = 'd-flex justify-content-center mb-5'>
                        <div className = 'mx-3'>
                            <img src={jogo.idLocal.avatarURL} alt="img" className = 'd-block mx-auto'/>
                            <strong className='text-center'>{jogo.idLocal.nome}</strong>
                        </div>
                        <span>vs.</span>
                        <div className = 'mx-3'>
                            <img src={jogo.idVisitante.avatarURL} alt="img" className = 'd-block mx-auto'/>
                            <strong className='text-center'>{jogo.idVisitante.nome}</strong>
                        </div>
                    </div>
                    <p className="text-center font-weight-bold text-monospace">{jogo.idLocal.estadio}</p>
                </div>
                <div className = 'col-md-1 offset-md-2'>
                    <button onClick = {handleClose}> X </button>
                </div>
            </div>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        jogo: state.reminder
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        closeDetails: () => dispatch(closeDetails())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(JogoDetails);