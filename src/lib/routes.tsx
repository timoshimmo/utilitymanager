import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';

import PrivateRoute from './private-route';
import Minimal from '../layouts/minimal/minimal';
import Login from '../pages/login';
import VerifyUser from '../pages/verification';
import ResetPassword from '../pages/reset-password';
import ForgotPassword from '../pages/forgot-password';
import RegisterSuperAdmin from '../pages/register-super-admin';

 const RoutesComponent = () => {

   return (
    <Switch>
      <Route exact path="/">
        <Redirect  to="/login" />
      </Route>

      <PrivateRoute
         component={Login}
         layout={Minimal}
         path="/login"
       />

       <PrivateRoute
          component={VerifyUser}
          layout={Minimal}
          path="/verified-user"
        />

        <PrivateRoute
           component={ResetPassword}
           layout={Minimal}
           path="/reset/:permissionCode/:token"
         />

         <PrivateRoute
            component={ForgotPassword}
            layout={Minimal}
            path="/forgot-password"
          />

          <PrivateRoute
             component={RegisterSuperAdmin}
             layout={Minimal}
             path="/register-admin"
           />

      <Redirect  to="/login" />
    </Switch>
  );

 }

 export default RoutesComponent;
