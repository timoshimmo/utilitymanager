import React from 'react';
import { Route } from 'react-router-dom';

interface PrivateRouteProps {
    layout: any;
    component: any;
    path?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = (props) => {
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
