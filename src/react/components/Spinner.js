import React from 'react';
import { MoonLoader } from 'react-spinners';

export default function Spinner(props) {
  return (
    props.loading
      ? <div className={`spinner ${props.container}__spinner`}>
          <MoonLoader
            color='white'
            loading={props.loading}
            animation-delay="0"
          />
        </div>
      : null
  );
}
