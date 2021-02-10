import React, { useEffect } from "react";
import { connect } from "react-redux";
import "antd/dist/antd.css";
import Calendar from "../../components/calendar/Calendar";
import NavBar from "../../components/NavBar";
import NextJogo from "../../components/NextJogo";
import ReminderForm from "../../components/ReminderForm";
import moment from "moment";
import { readReminders, updateNextJogo, readJogosById, setVisible} from "../../store/actions";
import Data from '../../components/Data';

const Home = (props) => {

  const { readReminders, updateNextJogo, readJogosById, state, setVisible } = props;

  // useEffect(()=>{
  //   setVisible()
  // }, [])

  useEffect(() => { 

		if(state.reminders.length === 0){
      console.log('se ejecuta efecto')
      readJogosById(state.time._id) 
      readReminders()
      nextJogo()
    } 
	}, []);
	
	useEffect(() => {
	}, [state.reminders])

	const nextJogo = () => {
    // Agrego el formato de las fechas para que funcione a la hora de comparar
    const hoje = moment().format('YYYY MM DD');
    
    let arrayOrdenado = state.reminders.sort(function(a,b){
			// Turn your strings into dates, and then subtract them
			// to get a value that is either negative, positive, or zero.
			return new Date(a.fecha) - new Date(b.fecha);
		})

		const next = arrayOrdenado.find(remin => {
			if(!remin.idLocal) return false;
			
      let jogo = moment(remin.fecha).format('YYYY MM DD');
			if(moment(jogo).isSameOrAfter(moment(hoje))) return remin
		})

		if(next) updateNextJogo(next)
	}

  return(
  <>
    {/* <ModalTime />  */}
    {
       <>
        <NavBar />
        <div className = 'container'>
          <div className='row'>
            {/* && !state.showDetails */}
            {console.log('reminder !=={}' + !state.reminder.fecha)}
            {console.log('!!reminder' + !!state.reminder)}
            {state.creating || state.reminder.fecha
              ? (<>
              <ReminderForm />
              </>)
              : null
            }

            <div className='col-sm-12 col-lg-9 pl-0'>
              <Calendar />
            </div>
            <div className='col-sm-12 col-lg-3 d-flex flex-column pr-0'>
              <Data/>
              <br/>
              {state.nextJogo
                ? <NextJogo />
                : null
              }
              
            </div>

          </div>
        </div>
        </>
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