import './App.css';
import Header from './components/Header/Header';
import Shop from './components/Shop/Shop';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Review from './components/Review/Review';
import Manage from './components/Manage/Manage';
import React, { Component }  from 'react';
import ProductsDetails from './components/ProductsDetails/ProductsDetails';

function App() {
  return (
    <div>
      <Header></Header>
      <Router>
        <Routes>
          <Route exact path="/" element={<Shop />}></Route>
          <Route path="/shop" element={<Shop />}></Route>
          <Route path="/review" element={<Review />}></Route>
          <Route path="/manage" element={<Manage />}></Route>
          <Route path="/product/:Key" element={<ProductsDetails />}></Route>
          <Route path='*' element={<h1>404 Error...</h1>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

// export default withRouter(connect(mapStateToProps,)(App));
export default App;
