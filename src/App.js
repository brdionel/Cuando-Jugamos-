import React from 'react';
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import Calendar from './components/calendar/Calendar';
import NavBar from './components/NavBar'
import NextJogo from './components/NextJogo'
import JogoDetails from './components/JogoDetails'
import ReminderForm from './components/ReminderForm'


function App({ state }) {

  return (
    <>
        <NavBar />
        <div className = 'container'>
          <div className='row'>
            {
              state.showDetails
              ? <div className= 'col-12'>
                  <JogoDetails />
                </div>
              : null 
            }
            {state.creating
							? (<>
							<ReminderForm />
							{/* <div className = {styles.transparencia} ></div> */}
							</>)
							: null
					  }

            <div className='col-sm-12 col-lg-9 pl-0'>
              <Calendar />
            </div>
            <div className='col-sm-12 col-lg-3 d-flex align-items-center pr-0'>
              <NextJogo />
            </div>

          </div>
        </div>
 </>
  );
}

const mapStateToProps = (state) => {
  return {
    state
  }
}
export default connect(mapStateToProps)(App);


