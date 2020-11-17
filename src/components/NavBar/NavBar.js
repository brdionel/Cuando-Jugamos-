import React from 'react';
import { loadCreateReminder } from '../../store/actions';
import { connect } from 'react-redux';
import { Button } from 'antd';
import styles from './NavBar.module.css'

const NavBar = ({loadCreateReminder, state}) => {

    const handleClick = () => {
        loadCreateReminder()
    }

    return(
        <nav className={`navbar py-3  ${styles.wrapper} mb-5`}>
            <div className = "container d-flex align-item-center px-0">
                <p className="navbar-brand m-0">Cuando Jugamos?</p>
                { !state.creating
                    ? (<Button 
                        className="btn btn-light my-2 my-sm-0" 
                        title='Crear recordatorio'
                        onClick = {handleClick}
                        size = 'Large'>
                        +
                    </Button>)
                    : null
                    
                }

            </div>
        </nav>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadCreateReminder: () => dispatch(loadCreateReminder())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);