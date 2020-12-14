import React, {useEffect} from 'react'
import {connect} from 'react-redux'
import { setVisible} from "../../store/actions";
import ModalTime from "../../components/ModalTime";

const SelectTime = ({setVisible}) => {
    
  useEffect(()=>{
      setVisible()
    }, [])

  return (
    <div>
      <ModalTime /> 
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    state
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setVisible: () => dispatch(setVisible())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SelectTime);