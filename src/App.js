import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import React, { Component, createContext, useState }  from 'react';
import ProductsDetails from './components/ProductsDetails/ProductsDetails';
import Login from './components/Login/Login';
import Shipment from './components/Shipment/Shipment';
import PrivateRoute from './components/PrivateRoute/PrivateRoute';

export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});

  return (
    <userContext.Provider value={[loggedInUser, setLoggedInUser]}>
      <Router>
      <Header></Header>
        <Routes>
          <Route exact path="/" element={<Shop />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/manage" element={<Manage />}></Route>
          <Route path="/login" element={<Login />}></Route>
          
          <Route exact path='/' element={<PrivateRoute/>}>
            <Route exact path='/shipment' element={<Shipment/>}/>
          </Route>

          <Route path="/product/:Key" element={<ProductsDetails />}></Route>
          <Route path='*' element={<h1>404 Error...</h1>}></Route>
        </Routes>
      </Router>
    </userContext.Provider>
  );
}

// export default withRouter(connect(mapStateToProps,)(App));
export default App;
