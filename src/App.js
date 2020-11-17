import React from 'react';
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import Calendar from './components/calendar/Calendar';
import NavBar from './components/NavBar'
import NextJogo from './components/NextJogo'
import JogoDetails from './components/JogoDetails'
import ReminderForm from './components/ReminderForm'
import Data from './components/Data'


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
							</>)
							: null
					  }

            <div className='col-sm-12 col-lg-9 pl-0'>
              <Calendar />
            </div>
            <div className='col-sm-12 col-lg-3 d-flex flex-column pr-0'>
              <Data />
              {console.log('next en APP: '+state.nextJogo)}
              {state.nextJogo
                ? <NextJogo />
                : null
              }
              
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


