import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Main({ children }: InferProps<typeof Main.propTypes>) {

  return (
    <div className="min-h-full w-full">
      <main className="min-h-full h-full w-full bg-[#F5F5F5]">{children}</main>
    </div>
  );
};

Main.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Main;
