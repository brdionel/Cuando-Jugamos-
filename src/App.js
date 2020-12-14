import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider} from 'react-redux';
import store from './store';
import Jogo from './pages/jogo';
import Home from './pages/home';
import SelectTime from './pages/selectTime';

function App() {

  return (
      <Provider store = {store}>
        <BrowserRouter>
          <Route exact path='/' component={SelectTime}/>
          <Route exact path='/home' component={Home}/>
          <Route exact path='/jogo/:id' component={Jogo}/>  
        </BrowserRouter>
      </Provider>
  );
}

export default App;