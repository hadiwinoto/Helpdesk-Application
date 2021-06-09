import React, { Fragment, useState } from 'react';
import { MDBContainer, MDBRating } from 'mdbreact';

const RatingPage = () => {
  const [basic] = useState([
    {
      tooltip: 'Very Bad'
    },
    {
      tooltip: 'Poor'
    },
    {
      tooltip: 'Ok',
    },
    {
      tooltip: 'Good'
    },
    {
      tooltip: 'Excellent',
      choosed: true
    }
  ]);

  return (
      <Fragment>
             <MDBRating data={basic}  />
      </Fragment>
  );
};

export default RatingPage;