import React, { Fragment } from 'react';
import {useDispatch, useSelector} from 'react-redux';

const BookInfo = ({bookinfo}) => {
  return (
    <Fragment>
      <h2>Book Details</h2>
      <div className="alert alert-secondary" role="alert">
        There is no post selected yet. Please select!
      </div>
    {bookinfo === null ? "no data to show" : 
      <div>
        <p className="fw-bold">Title:{bookinfo.title}</p>
        <p className="fw-light">Description:{bookinfo.description}</p>
        <p className="fst-italic">Price:{bookinfo.price}</p>
      </div> 
    }
    </Fragment>
  );
};

export default BookInfo;
