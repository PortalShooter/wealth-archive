import React from 'react';

function Error({ statusCode }) {
  return <p>{statusCode ? `An error ${statusCode} occurred on server` : 'An error occurred on client'}</p>;
}

Error.getInitialProps = ({ res, err }) => {
  let statusCode = res ? res.statusCode : 404;
  if (err) {
    statusCode = err.statusCode
  }

  return { statusCode };
};

export default Error;
