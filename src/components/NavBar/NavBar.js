import React from 'react';
import { loadCreateReminder } from '../../store/actions';
import { connect } from 'react-redux';
import { Button } from 'antd';

const NavBar = ({loadCreateReminder, state}) => {

    const handleClick = () => {
        loadCreateReminder()
    }

    const styles = {
        backgroundColor: state.time && `${state.time.primaryColor}`
    }

    return(
        <nav className={`navbar py-3 mb-5 text-white`} style = {styles}>
            <div className = "container d-flex align-item-center px-0">
                <p className="navbar-brand m-0">Cuando Jugamos?</p>
                { !state.creating
                    ? (<Button 
                        className="btn btn-light my-2 my-sm-0 p-2" 
                        title='Crear recordatorio'
                        onClick = {handleClick}
                        size = 'large'>
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