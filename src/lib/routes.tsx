import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { ROUTES } from './route-links';

import PrivateRoute from './private-route';
import Minimal from '../layouts/minimal';
import Main from '../layouts/main';

import Login from '../pages/login';
import VerifyUser from '../pages/verification';
import ResetPassword from '../pages/reset-password';
import ForgotPassword from '../pages/forgot-password';
import RegisterSuperAdmin from '../pages/super-admin/create';
import GetSuperAdmin from '../pages/super-admin';
import RegisterDiscos from '../pages/discos/create';
import GetDiscos from '../pages/discos';
import Dashboard from '../pages/dashboard';
import Home from '../pages/home';
import RegisterManagers from '../pages/managers/create';
import GetManagers from '../pages/managers';
import CreateUsers from '../pages/users/create';
import GetUsers from '../pages/users';
import GetAssets from '../pages/assets';
import CreateAssets from '../pages/assets/create';
import GetTeamGroups from '../pages/team-group';
import CreateTeamGroup from '../pages/team-group/create';
import GetTeamMembers from '../pages/team-member';
import CreateTeamMember from '../pages/team-member/create';
import GetTickets from '../pages/support';
import Messages from '../pages/support/messages';
import GetInventory from '../pages/store';
import CreateInventory from '../pages/store/create';
import GetProjects from '../pages/projects';
import CreateProject from '../pages/projects/create';
import AccountsOffice from '../pages/account';
import GetItemsRequest from '../pages/store/item-request';

 const RoutesComponent = () => {

   return (
    <Switch>
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
            component={Dashboard}
            layout={Main}
            path="/dashboard"
          />

          <PrivateRoute
             component={Home}
             layout={Main}
             path="/home"
           />

          <PrivateRoute
             component={RegisterSuperAdmin}
             layout={Main}
             path="/register-admin"
           />

          <PrivateRoute
               component={GetSuperAdmin}
               layout={Main}
               path="/super-admins"
             />

         <PrivateRoute
            component={RegisterDiscos}
            layout={Main}
            path="/register-disco"
          />

         <PrivateRoute
              component={GetDiscos}
              layout={Main}
              path="/discos"
            />

          <PrivateRoute
             component={RegisterManagers}
             layout={Main}
             path="/register-managers"
           />

          <PrivateRoute
               component={GetManagers}
               layout={Main}
               path="/managers"
             />

           <PrivateRoute
              component={GetAssets}
              layout={Main}
              path="/assets"
            />

           <PrivateRoute
                component={CreateAssets}
                layout={Main}
                path="/create-asset"
              />

          <PrivateRoute
             component={GetUsers}
             layout={Main}
             path="/users"
           />

          <PrivateRoute
               component={CreateUsers}
               layout={Main}
               path="/create-users"
             />

         <PrivateRoute
            component={GetTeamGroups}
            layout={Main}
            path="/team-groups"
          />

         <PrivateRoute
            component={CreateTeamGroup}
            layout={Main}
            path="/create-team-group"
          />

        <PrivateRoute
           component={GetTeamMembers}
           layout={Main}
           path="/team-members"
         />

        <PrivateRoute
           component={CreateTeamMember}
           layout={Main}
           path="/create-team-member"
         />

       <PrivateRoute
          component={GetTickets}
          layout={Main}
          path={ROUTES.TICKETS}
        />

       <PrivateRoute
          component={Messages}
          layout={Main}
          path={ROUTES.TICKET_MESSAGES}
        />

      <PrivateRoute
         component={GetInventory}
         layout={Main}
         path={ROUTES.INVENTORY}
       />

      <PrivateRoute
         component={CreateInventory}
         layout={Main}
         path={ROUTES.CREATE_INVENTORY}
       />

       <PrivateRoute
          component={GetProjects}
          layout={Main}
          path={ROUTES.PROJECTS}
        />

       <PrivateRoute
          component={CreateProject}
          layout={Main}
          path={ROUTES.CREATE_PROJECTS}
        />

      <PrivateRoute
         component={AccountsOffice}
         layout={Main}
         path={ROUTES.ACCOUNTS}
       />

       <PrivateRoute
          component={GetItemsRequest}
          layout={Main}
          path={ROUTES.ITEM_REQUESTS}
        />

      <Redirect  to="/login" />
    </Switch>
  );

 }

 export default RoutesComponent;
