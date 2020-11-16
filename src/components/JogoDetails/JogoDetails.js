import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {closeDetails } from '../../store/actions'

const JogoDetails = ({ jogo, closeDetails}) => {

    const handleClose = () => {
        closeDetails()
    }
    return (
        <div>
            <div>
                <h2>Primera Division - {moment(jogo.fecha).calendar()}</h2>
                <button onClick = {handleClose}> X </button>
            </div>
            <div>
                <div>
                    <img src={jogo.idLocal.avatar} alt="img"/>
                    <strong>{jogo.idLocal.nome}</strong>
                </div>
                <span>vs.</span>
                <div>
                    <img src={jogo.idVisitante.avatar} alt="img"/>
                    <strong>{jogo.idVisitante.nome}</strong>
                </div>
            </div>
            <p>La Bombonera</p>
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