import { formatCountdown } from 'antd/lib/statistic/utils';
import React from 'react';
import { loadCreateReminder } from '../../store/actions';
import { connect } from 'react-redux';

const NavBar = ({loadCreateReminder}) => {

    const handleClick = () => {
        loadCreateReminder()
    }

    return(
        <nav className="navbar navbar-dark bg-primary p-3">
            <div className = "container">
                <a className="navbar-brand">Cuando Jugamos?</a>
                <button 
                    className="btn btn-light my-2 my-sm-0" 
                    title='Crear recordatorio'
                    onClick = {handleClick}>
                    +
                </button>

            </div>
        </nav>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCreateReminder: () => dispatch(loadCreateReminder())
    }
}

export default connect(null, mapDispatchToProps)(NavBar);