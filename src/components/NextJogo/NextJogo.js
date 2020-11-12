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
                <p>
                    Faltan {prox.diff(hoje, 'days')} dias para decir...
                    ! Hoy Juega Boca "
                </p>
            )
                : null
            }
        </div>
    )
}

export default connect( (state) => state )(NextJogo);