import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import PrivateRoute from '../PrivateRoute';
import App from '../App';
import Login from '../Login';
import TaxiOrder from '../TaxiOrder';
import Profile from '../Profile';
//import { AuthProvider } from '../../context/Auth';
// Мы оборачиваем наши роуты в несколько провайдеров
// DataProvider - предоставляет обьект data с имейлами.
// AuthProvider - предоставляет метод авторизации authorize
//                и текущий статус isAuthorized
// BrowserRouter - провайдер react-router-dom.

export default () => (
  <BrowserRouter>
    <div>
      <App/>      
      <Switch>          
        <Route
          path="/login"
          component={Login}
        />
        <PrivateRoute
          path="/map"
          component={TaxiOrder}
        />
        <PrivateRoute
          path="/profile"
          component={Profile}
        />
        <Redirect to="/login"/>          
      </Switch>
    </div>
  </BrowserRouter>
);