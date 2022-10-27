import React from 'react';
import PropTypes, { InferProps } from 'prop-types';

function Minimal({ children }: InferProps<typeof Minimal.propTypes>) {

  return (
    <div className="min-h-full w-full">
      <main className="min-h-screen w-full bg-[#F5F5F5]">{children}</main>
    </div>
  );
};

Minimal.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default Minimal;
