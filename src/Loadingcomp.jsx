import React from 'react';
import { MoonLoader } from 'react-spinners';

const Loadingcomp = () => (
  <div className="loading-container">
    <MoonLoader size={150} color={"#123abc"} loading={true} />
  </div>
);

export default Loadingcomp;
