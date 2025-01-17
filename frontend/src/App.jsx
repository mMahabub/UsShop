import React from 'react';
import { Container } from 'react-bootstrap';
import Header from './components/Header';
import {ToastContainer}  from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Footer from './components/Footer';
import { Outlet, Router } from 'react-router-dom';
import './index.css';

const App = () => {
  return (
    
    <>
    
      <Header />
      <main className="">
        {/* <Container> */}
          <Outlet />
        {/* </Container> */}
      </main>
      <Footer />
      <ToastContainer/>
    </>
  );
};

export default App;