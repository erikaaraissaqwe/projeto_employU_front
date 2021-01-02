import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Routes from './Routes';
import Header from './components/parcials/Header';
import Footer from './components/parcials/Footer';

const App = (props) => {
  return (
    <BrowserRouter>
      <div>
        <Header/>
        <Routes/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}

export default App;
