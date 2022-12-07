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
import GetSubstation from '../pages/substation';
import CreateSubstation from '../pages/substation/create';

 const RoutesComponent = () => {

   return (
    <Switch>
      <PrivateRoute
         component={Login}
         layout={Minimal}
         path={ROUTES.LOGIN}
       />

       <PrivateRoute
          component={VerifyUser}
          layout={Minimal}
          path={ROUTES.VERIFIED_USER}
        />

        <PrivateRoute
           component={ResetPassword}
           layout={Minimal}
           path={ROUTES.RESET}
         />

         <PrivateRoute
            component={ForgotPassword}
            layout={Minimal}
            path={ROUTES.FORGOT}
          />

         <PrivateRoute
            component={Dashboard}
            layout={Main}
            path={ROUTES.DASHBOARD}
          />

          <PrivateRoute
             component={Home}
             layout={Main}
             path={ROUTES.HOME}
           />

          <PrivateRoute
             component={RegisterSuperAdmin}
             layout={Main}
             path={ROUTES.REGISTER_ADMIN}
           />

          <PrivateRoute
               component={GetSuperAdmin}
               layout={Main}
               path={ROUTES.SUPERADMINS}
             />

         <PrivateRoute
            component={RegisterDiscos}
            layout={Main}
            path={ROUTES.REGISTER_DISCO}
          />

         <PrivateRoute
              component={GetDiscos}
              layout={Main}
              path={ROUTES.DISCOS}
            />

          <PrivateRoute
             component={RegisterManagers}
             layout={Main}
             path={ROUTES.REGISTER_MANAGERS}
           />

          <PrivateRoute
               component={GetManagers}
               layout={Main}
               path={ROUTES.MANAGERS}
             />

           <PrivateRoute
              component={GetAssets}
              layout={Main}
              path={ROUTES.ASSETS}
            />

           <PrivateRoute
                component={CreateAssets}
                layout={Main}
                path={ROUTES.CREATE_ASSET}
              />

          <PrivateRoute
             component={GetSubstation}
             layout={Main}
             path={ROUTES.SUBSTATION}
           />

          <PrivateRoute
               component={CreateSubstation}
               layout={Main}
               path={ROUTES.CREATE_SUBSTATION}
             />

          <PrivateRoute
             component={GetUsers}
             layout={Main}
             path={ROUTES.USERS}
           />

          <PrivateRoute
               component={CreateUsers}
               layout={Main}
               path={ROUTES.CREATE_USER}
             />

         <PrivateRoute
            component={GetTeamGroups}
            layout={Main}
            path={ROUTES.TEAM_GROUPS}
          />

         <PrivateRoute
            component={CreateTeamGroup}
            layout={Main}
            path={ROUTES.CREATE_TEAM_GROUP}
          />

        <PrivateRoute
           component={GetTeamMembers}
           layout={Main}
           path={ROUTES.TEAM_MEMBERS}
         />

        <PrivateRoute
           component={CreateTeamMember}
           layout={Main}
           path={ROUTES.CREATE_TEAM_MEMBER}
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

      <Redirect to={ROUTES.LOGIN} />
    </Switch>
  );

 }

 export default RoutesComponent;
