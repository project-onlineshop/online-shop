import React from 'react';
import Header from './misc/Header';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './misc/Home';
import ProductsBase from './products/ProductsBase';
import NotFound from './misc/NotFound';
import ProductForm from './products/ProductForm';
import Login from './auth/Login';
import PrivateRoute from '../guards/PrivateRoute';

function App() {
  return (
    <div className="App">
      <Header/>

      <main className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home}/>
          <PrivateRoute exact path="/products" component={ProductsBase} />
          <PrivateRoute exact path="/products/new" component={ProductForm} />
          <Route exact path="/" component={() => (
            <Redirect to="/home" />
          )} />

          <Route path="/" component={NotFound}/>
        </Switch>
      </main>
    </div>
  );
}

export default App;