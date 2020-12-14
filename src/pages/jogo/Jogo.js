import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {closeDetails, selectJogo } from '../../store/actions';
import styles from './Jogo.module.css';

const Jogo = ({jogo, match, selectJogo, history}) => {

  useEffect(() => {
    const id = match.params.id;
  
    const buscaJogo = async (id) =>{ 
      const partida = await selectJogo(id)
      // selectReminder(item);
      console.log(partida);
    }

    buscaJogo(id);
    
  }, [])

  const handleBack = () => {
    history.goBack();
  }

  return (
    <>
    { jogo
      ? (<>
      <div>
        <button 
          className={styles.button}
          onClick={handleBack}
        > 
          <i class="fas fa-arrow-left"></i>
          Volver
        </button>
      </div>
      <div className={`mb-5 ${styles.wrapper}`}>
      {console.log(jogo)}
      <div className = 'row'>
        <div className = 'col-12 col-md-3'>
          {/* <small className = 'd-block'>{moment(jogo.fecha).format('dddd')}</small>
          <small>{moment(jogo && jogo.fecha).format('L')}</small> */}
      </div>
      <div className = 'col-12 col-md-6 d-flex flex-column align-items-center'>
        <h3 className='mb-5 text-center'>{jogo.idLocal && jogo.idCampeonato.nome}</h3>
        <div className = 'd-flex justify-content-center mb-5'>
          <div className = 'mx-3'>
            <img src={jogo.idLocal && jogo.idLocal.avatarURL} alt="img" className = 'd-block mx-auto'/>
            <strong className='text-center'>{jogo.idLocal && jogo.idLocal.nome}</strong>
          </div>
          <span>vs.</span>
          <div className = 'mx-3'>
            <img src={jogo.idLocal && jogo.idVisitante.avatarURL} alt="img" className = 'd-block mx-auto'/>
            <strong className='text-center'>{jogo.idLocal && jogo.idVisitante.nome}</strong>
          </div>
        </div>
          <p className="text-center font-weight-bold text-monospace">{jogo.idLocal && jogo.idLocal.estadio}</p>
        </div>
      </div>
    </div>
    </>)
      : (<p>Cargando...</p>)
    }
  </>
  )
}

const mapStateToProps = (state) => {
  return {
      jogo: state.reminder
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      closeDetails: () => dispatch(closeDetails()),
      selectJogo: (id) => dispatch(selectJogo(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);