import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'
import AOS from 'aos'

import s from './NextJogo.module.css'

AOS.init ({ 
  delay : 1000 ,  // valores de 0 a 3000 , con un paso de 50 ms de 
}) ;

const NextJogo = ({nextJogo, time}) => {
    
  let diasProJogo = null
  let hoje = moment();
  let prox = moment(nextJogo.fecha)
  diasProJogo = prox.diff(hoje, 'days');

  const styles = {
    backgroundColor: time!== {} && `${time.primaryColor}`
  }

  return (
    <div>
      {(diasProJogo !== null)
        ? <div className="jumbotron text-white text-center" style = { styles } data-aos="fade-left">
            { (moment(hoje).format('DD/MM/YYYY') === moment(prox).format('DD/MM/YYYY'))
              ? 
                <p className="lead">
                  <span className="font-weight-bold">¡ Hoy Juega {time.apodo}!</span> 
                </p>
              : (diasProJogo === 0)
                ? <p className="lead">
                    <span className="font-weight-bold">¡ Mañana Juega {time.apodo}!</span> 
                  </p>
                : (<p className="lead">
                    Faltan <strong className="font-weight-bold">{diasProJogo+1} </strong>
                    dias para decir... 
                    <br/>
                    <span className="font-weight-bold">¡ Hoy Juega {time.apodo}!</span> 
                  </p>)    
            }
            <img src={time.avatarURL} alt={time.nome} className = {`${s.data} d-block mx-auto my-2`}/>
          </div>
        : null
      }
    </div>
  )
}

const mapStateToProps = (state) => {
    return {
        nextJogo: state.nextJogo,
        time: state.time
    }
}

export default connect(mapStateToProps)(NextJogo);