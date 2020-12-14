import { Modal, Select } from 'antd';
import React, {useEffect, useState} from 'react';
import { useHistory} from 'react-router-dom';
import { connect } from 'react-redux';
import { selectTime, readTimes, closeVisible } from '../../store/actions'
import styles from '../inputs/SelectTime.module.css'

const { Option } = Select;

const ModalTime = ({visible, times, selectTime, closeVisible, readTimes, time }) =>{
  const history = useHistory()
  const [inputSelect, setInputSelect] = useState('')

  useEffect(() => { 
    readTimes()
  }, []);

  const showModal = () => {
    this.setState({
      visible: true,
    });
  };

  const handleOk = e => {
    if(inputSelect){
      if(inputSelect)
      closeVisible()
      history.push('/home')
    } else {
      
    }
  };
  
  const handleCancel = e => {
    console.log(e);
    closeVisible()
  };
  
  function onChange(value) {
    setInputSelect(value)
  }


 // Zarpado  
  useEffect(() => {
    selectTime(inputSelect); // This is be executed when `loading` state changes
    console.log('inputSelect: '+ inputSelect)
    console.log( time)
}, [inputSelect])
  
  
  function onSearch(val) {
    console.log('search:', val);
  }

  return (
    <>
      <Modal
        title="Cuando Jugamos?"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div>
          <Select
            // showSearch
            className='mx-auto'
            size = 'large'
            style={{ width: 200 }}
            placeholder="Decinos tu equipo?"
            optionFilterProp="children"
            onChange={onChange}
            onSearch={onSearch}
            filterOption={(item, option) =>
              console.log(option.children.toLowerCase().indexOf(item.toLowerCase()) >= 0 ) 
            }
          >
            {times && times.map(
              item => (
                <Option key={item._id} value={item._id}>{item.nome}</Option>
            ))}
          </Select>
        </div>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    times: state.times,
    visible: state.visible,
    error: state.error,
    time: state.time
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
      selectTime: (option) => dispatch(selectTime(option)),
      readTimes: () => dispatch(readTimes()),
      closeVisible: () => dispatch(closeVisible())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalTime)
