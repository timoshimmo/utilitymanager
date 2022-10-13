import React from 'react';
import { Route } from 'react-router-dom';

interface PrivateRouteProps {
    layout: any;
    component: any;
    path?: string;
}

const PrivateRoute = (props: PrivateRouteProps) => {
  const { layout: Layout, component: Component, ...rest } = props;

  return (
    <Route
      {...rest}
      render={matchProps => (
        <Layout>
          <Component {...matchProps} />
        </Layout>
      )}
    />
  );
};

export default PrivateRoute;
