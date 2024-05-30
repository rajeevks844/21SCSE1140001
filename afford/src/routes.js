//routes.js

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage';
import ProductList from './components/ProductList';

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/products" component={ProductList} />
    </Switch>
  );
}

export default Routes;
