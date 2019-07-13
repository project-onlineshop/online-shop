import React from 'react';
import Header from './misc/Header';
// import Footer from './misc/Footer';
import { Switch, Route, Redirect } from 'react-router-dom'
import Home from './misc/Home';
import ProductsBase from './products/ProductsBase';
import NotFound from './misc/NotFound';
import ProductForm from './products/ProductForm';
import Login from './auth/Login';
import PrivateRoute from '../guards/PrivateRoute';
import Profile from '../components/auth/Profile';
import ProductDetail from './products/ProductDetail';
import ProductsFavs from './products/ProductsFavs';
import Register from './auth/Register';

function App() {
  return (
    <div className="App">
      <Header/>
      <main className="container">
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/products" component={ProductsBase} />
          <Route exact path="/products/new" component={ProductForm} />
          <PrivateRoute exact path="/products/favs" component={ProductsFavs} />
          <Route exact path="/products/:id" component={ProductDetail} />
          
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/" component={() => (
            <Redirect to="/products" />
          )} />

          <Route path="/" component={NotFound}/>
        </Switch>
      </main>
      {/* <Footer/> */}
    </div>
  );
}

export default App;