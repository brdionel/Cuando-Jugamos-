import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

const NextJogo = ({nextJogo}) => {
    
    let diasProJogo = null
    let hoje = moment();
    let prox = moment(nextJogo.fecha)
    diasProJogo = prox.diff(hoje, 'days');

    return (
        <div>
            {console.log('dias pro jogo: '+ diasProJogo)}
            {
                (diasProJogo !== null)
                ?  <div className="jumbotron" style = {{
                    background: '#f0dd24'
                    }}>
                    {/* {console.log(moment(hoje).format('DD/MM/YYYY'))}
                    {prox && console.log(moment(prox).format('DD/MM/YYYY'))} */}
                    { (moment(hoje).format('DD/MM/YYYY') === moment(prox).format('DD/MM/YYYY'))
                        ? 
                            <p className="lead">
                                <span className="font-weight-bold">¡ Hoy Juega Boca !</span> 
                            </p>
            
                        :   (diasProJogo === 0)
                            ? <p className="lead">
                                <span className="font-weight-bold">¡ Mañana Juega Boca !</span> 
                            </p>
                            : ( <p className="lead">
                                Faltan <span className="lead">{diasProJogo + 1} </span>
                                dias para decir... 
                                <br/>
                                <span className="font-weight-bold">¡ Hoy Juega Boca !</span> 
                            </p>)
                            
                    }
                </div>

                : null
            }
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        nextJogo: state.nextJogo
    }
}

export default connect(mapStateToProps)(NextJogo);