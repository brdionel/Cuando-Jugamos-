import React from 'react';
import { Provider } from 'react-redux'
import style from './App.module.css';
import 'antd/dist/antd.css';
import Calendar from './components/calendar/Calendar';
import NavBar from './components/NavBar'
import NextJogo from './components/NextJogo'
import store from './store'

function App() {

  return (
      <Provider store = {store}>
        <NavBar />
        <div className = 'container'>
          <div className='row'>
            <div className='col-sm-12 col-lg-9'>
              <Calendar />
            </div>
            <div className='col-sm-12 col-lg-3'>
              <NextJogo />
            </div>

          </div>
        </div>
        
        </Provider>
  );
}

export default App;


