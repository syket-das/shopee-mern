import React, { Fragment } from 'react';
import { Route, Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import { logout } from '../../actions/userActions';

import Search from './Search';

import '../../App.css';
import { Image, Navbar, Row, Col, Figure } from 'react-bootstrap';

const Header = () => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const { user, loading } = useSelector((state) => state.auth);
  const { cartItems } = useSelector((state) => state.cart);

  const logoutHandler = () => {
    dispatch(logout());
    alert.success('Logged out successfully.');
  };

  return (
    <Fragment>
      <Navbar className="w-100">
        <Row className="d-flex align-items-center justify-content-between w-100">
          <Col
            md={4}
            className="d-flex align-items-center justify-content-center justify-content-md-start"
          >
            <Navbar.Brand className="navbar-brand">
              <Link
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontFamily: 'cursive',
                  textDecoration: 'none',
                  marginLeft: '10px',
                }}
                to="/"
              >
                <b>SHOPEE</b>
              </Link>
            </Navbar.Brand>
          </Col>

          <Col md={4} className="">
            <Route render={({ history }) => <Search history={history} />} />
          </Col>

          <Col
            md={4}
            className=" d-flex align-items-center justify-content-center justify-content-md-end "
          >
            <Link to="/cart" style={{ textDecoration: 'none' }}>
              <span id="cart" className="ml-3">
                Cart
              </span>
              <span className="ml-1" id="cart_count">
                {cartItems.length}
              </span>
            </Link>

            {user ? (
              <div className="ml-4 dropdown d-inline">
                <Link
                  to="#!"
                  className="btn dropdown-toggle text-white mr-4"
                  type="button"
                  id="dropDownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <Figure className="avatar avatar-nav">
                    <Image
                      src={user.avatar && user.avatar.url}
                      alt={user && user.name}
                      className="rounded-circle"
                    />
                  </Figure>
                  <span>{user && String(user.name).split(' ')[0]}</span>
                </Link>

                <div
                  className="dropdown-menu"
                  aria-labelledby="dropDownMenuButton"
                >
                  {user && user.role === 'admin' && (
                    <Link className="dropdown-item" to="/dashboard">
                      Dashboard
                    </Link>
                  )}
                  <Link className="dropdown-item" to="/orders/me">
                    Orders
                  </Link>
                  <Link className="dropdown-item" to="/me">
                    Profile
                  </Link>
                  <Link
                    className="dropdown-item text-danger"
                    to="/"
                    onClick={logoutHandler}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            ) : (
              !loading && (
                <Link to="/login" className="btn ml-4 my-2" id="login_btn">
                  Login
                </Link>
              )
            )}
          </Col>
        </Row>
      </Navbar>
    </Fragment>
  );
};

export default Header;
