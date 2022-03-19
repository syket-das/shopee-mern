import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSteps = ({ shipping, confirmOrder, payment }) => {
  return (
    <div className='d-flex justify-content-center'>
      <div className="checkout-progress  mt-5 container ">
        {shipping ? (
          <Link to="shipping" className="">
            <div className="triangle2-active my-3"></div>
            <div className="step active-step my-3">Shipping</div>
            <div className="triangle-active my-3"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete my-3"></div>
            <div className="step incomplete my-3">Shipping</div>
            <div className="triangle-incomplete my-3"></div>
          </Link>
        )}

        {confirmOrder ? (
          <Link to="/order/confirm" className="">
            <div className="triangle2-active my-3"></div>
            <div className="step active-step my-3">Confirm Order</div>
            <div className="triangle-active my-3"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete my-3"></div>
            <div className="step incomplete my-3">Confirm Order</div>
            <div className="triangle-incomplete my-3"></div>
          </Link>
        )}

        {payment ? (
          <Link to="/payment" className="">
            <div className="triangle2-active my-3"></div>
            <div className="step active-step my-3">Payment</div>
            <div className="triangle-active my-3"></div>
          </Link>
        ) : (
          <Link to="#!" disabled>
            <div className="triangle2-incomplete my-3"></div>
            <div className="step incomplete my-3">Payment</div>
            <div className="triangle-incomplete my-3"></div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CheckoutSteps;
