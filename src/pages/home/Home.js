import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import 'antd/dist/antd.css';
import Calendar from '../../components/calendar/Calendar';
import NavBar from '../../components/NavBar'
import NextJogo from '../../components/NextJogo'
import JogoDetails from '../../components/JogoDetails'
import ReminderForm from '../../components/ReminderForm'
import Data from '../../components/Data'
import { Spin, Icon } from 'antd';
import moment from 'moment';
import { readReminders, createReminder, updateNextJogo, readJogos ,
	setDate, readJogosById, readTimes, setVisible} from '../../store/actions'
import ModalTime from '../../components/ModalTime';

const Home = (props) => {

  const { readReminders, updateNextJogo, readJogosById, state, setVisible } = props;

  useEffect(()=>{
    setVisible()
  }, [])

  useEffect(() => { 

		if(state.time._id){
        console.log('el equipo que envio es: '+state.time._id)
        readJogosById(state.time._id) 
        readReminders()
    } 
	}, [state.time]);
	
	useEffect(() => {
    nextJogo()
	}, [state.reminders])

	const nextJogo = () => {
		const hoje = moment().format('DD/MM/YYYY');
		
		let arrayOrdenado = state.reminders.sort(function(a,b){
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(a.fecha) - new Date(b.fecha);
		})

		
		const next = arrayOrdenado.find(remin => {
			if(!remin.idLocal) return false;
			
			let jogo = moment(remin.fecha).format('DD/MM/YYYY')
			if(hoje <= jogo) return remin
		})

		if(next) updateNextJogo(next)
	}

  return(
  <>
    <ModalTime /> 
    {
      !state.visible
      ? <>
        <NavBar />
        <div className = 'container'>
          <div className='row'>
            {/*  && !state.creating */}
            { state.showDetails
              ? <div className= 'col-12'>
                  <JogoDetails />
                </div>
              : null 
            }
            {/* && !state.showDetails */}
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
              {state.nextJogo
                ? <NextJogo />
                : null
              }
              
            </div>

          </div>
        </div>
        </>
    : null
  } 
</>
)

}

const mapStateToProps = (state) => {
    return {
      state
    }
}

const mapDispatchToProps = (dispatch) => {
  return {
    readReminders: () => dispatch(readReminders()),
    updateNextJogo: payload => dispatch(updateNextJogo(payload)),
    readJogosById: (payload) => dispatch(readJogosById(payload)),
    setVisible: () => dispatch(setVisible())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
  