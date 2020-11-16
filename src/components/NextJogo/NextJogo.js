import React from 'react';
import { connect } from 'react-redux';
import moment from 'moment'

const NextJogo = (props) => {
    let prox = null;
    let hoje = null;
    if(props.nextJogo){
        console.log('props es: '+ JSON.stringify(props.nextJogo.fecha))
        prox = moment(props.nextJogo.fecha)
        hoje = moment()
    }

    return (
        <div>
            { prox? (

                <div className="jumbotron" style = {{
                    background: '#f0dd24'
                }}>
                    <p class="lead">
                        Faltan <span class="lead">{prox.diff(hoje, 'days')} </span>
                        dias para decir... 
                        <br/>
                        <span class="font-weight-bold">¡ Hoy Juega Boca !</span> 
                    </p>
                </div>
            )
                : null
            }
        </div>
    )
}

export default connect( (state) => state )(NextJogo);