import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import {clearReminder, selectJogo } from '../../store/actions';
import styles from './Jogo.module.css';
import ReactPlayer from 'react-player/youtube';
import NavBar from '../../components/NavBar';
import {useHistory} from 'react-router-dom'

const Jogo = ({jogo, match, selectJogo, history, time, clearReminder}) => {

  const hist = useHistory();

  useEffect(() => {
    const id = match.params.id;
  
    const buscaJogo = async (id) =>{ 
      const partida = await selectJogo(id)
      // selectReminder(item);
    }

    buscaJogo(id);
    
    
  }, [])

  const handleBack = () => {
    clearReminder();
    history.goBack();
  }

  const stylesBotton = {
    backgroundColor: `${time.primaryColor && time.primaryColor}`,
    color: '#fff'
  }

  return (
    <>
      <NavBar showCreate = {false}/>
    <div className="container px-0">
    { jogo
      ? (<>
          <div className={`${styles.wrapper}`}>
            <button 
              className={styles.button}
              onClick={handleBack}
              style = {stylesBotton}
            > 
              <i className="fas fa-arrow-left"></i>
              Volver
            </button>
            <div className =''>
                <h3 className='mb-5 text-center'>{jogo.idLocal && jogo.idCampeonato.nome}</h3>
                <div className = {`${styles.details}`}>
                  <div className = 'd-flex mx-3'>
                    <div className = ''>
                      <img src={jogo.idLocal && jogo.idLocal.avatarURL} alt="img" className = 'd-block mx-auto mb-3'/>
                      <strong className='text-center'>{jogo.idLocal && jogo.idLocal.nome}</strong>
                    </div>
                    {
                      jogo.golesLocal === 0 || jogo.golesLocal
                      ?(
                        <div className="ml-5 d-flex align-items-center">
                          <span><strong className={`${styles.sizeGols}`}>{jogo.golesLocal && jogo.golesLocal}</strong></span>
                        </div>
                        ): null
                    }
                  </div>
                  <div className="d-flex align-items-center">{jogo.golesLocal === 0 || jogo.golesLocal? (<span> - </span>) : <span>vs.</span>}</div>
                  <div className = 'd-flex mx-3'>
                  {
                    jogo.golesLocal === 0 || jogo.golesLocal
                    ?(
                      <div className="mr-5 d-flex align-items-center">
                        <span><strong className={`${styles.sizeGols}`}>{jogo.golesVisitante && jogo.golesVisitante}</strong></span>
                      </div>
                    ): null
                  }
                  <div className = ''>
                    <img src={jogo.idLocal && jogo.idVisitante.avatarURL} alt="img" className = 'd-block mx-auto mb-3'/>
                    <strong className='text-center'>{jogo.idLocal && jogo.idVisitante.nome}</strong>
                  </div>
            
                  </div>
                </div>
                <p className="text-center font-weight-bold text-monospace mb-5">{jogo.idLocal && jogo.idLocal.estadio}</p>
                <div className={`${styles.flex}`}>
                {console.log(jogo.videos && jogo.videos[0])}
                <ReactPlayer
                  url={jogo.videos && jogo.videos[0]}
                  controls
                  onReady={() => console.log('onReady')}
                  onStart={() => console.log('onStart')}
                  onPause={() => console.log('onPause')}
                  onEnded={() => console.log('onEnded')}
                  onError={() => console.log('onError')}
                />
              </div>
              </div>
          </div>
        </>)
      : (<p>Cargando...</p>)
    }
  </div>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
      jogo: state.reminder,
      time: state.time
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      selectJogo: (id) => dispatch(selectJogo(id)),
      clearReminder: () => dispatch(clearReminder())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Jogo);