import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Provider} from 'react-redux'
import store from './store' 
import SelectTime from './components/inputs'
import Home from './pages/home'

function App() {

  return (
      <Provider store = {store}>
        <BrowserRouter>
          <Route exact path='/' component={Home}/> 
        </BrowserRouter>
      </Provider>
  );
}

export default App;