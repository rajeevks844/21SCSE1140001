//App.js

import React from 'react';
import { NavLink } from 'react-router-dom';
import './App.css';

const Navigation = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <NavLink exact to="/" className="navbar-brand" activeClassName="active">
        Home
      </NavLink>
      <NavLink to="/products" className="navbar-brand" activeClassName="active">
        Products
      </NavLink>
    </nav>
  );
}

const App = () => {
  return (
    <div className="App">
      <Navigation />
      <Routes />
    </div>
  );
}

export default App;
