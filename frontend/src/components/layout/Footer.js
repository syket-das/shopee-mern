import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <footer className="footer-section">
        <div className="container">
          <div className="footer-cta pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fa fa-map-marker"></i>
                  <div className="cta-text">
                    <h4>Find us</h4>
                    <span>Phagwara, Punjab, India</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fa fa-phone"></i>
                  <div className="cta-text">
                    <h4>Call us</h4>
                    <span>+91 8100156406</span>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-md-4 mb-30">
                <div className="single-cta">
                  <i className="fa fa-envelope-open"></i>
                  <div className="cta-text">
                    <h4>Mail us</h4>
                    <span>saiketsd23@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-content pt-5 pb-5">
            <div className="row">
              <div className="col-xl-4 col-lg-4 mb-50">
                <div className="footer-widget">
                  <div className="footer-logo">
                    <Link to="index.html">
                      <img
                        src="/images/logo.png"
                        className="img-fluid"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div className="footer-text">
                    <p>
                      Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                      sed do eiusmod tempor incididuntut consec tetur
                      adipisicing elit,Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div className="footer-social-icon">
                    <span>Follow us</span>
                    <Link to="#/">
                      <i className="fa fa-facebook"></i>
                    </Link>
                    <Link to="#/">
                      <i className="fa fa-twitter"></i>
                    </Link>
                    <Link to="#/">
                      <i className="fa fa-google"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="#/">about</Link>
                    </li>
                    <li>
                      <Link to="#/">services</Link>
                    </li>
                    <li>
                      <Link to="#/">portfolio</Link>
                    </li>
                    <li>
                      <Link to="#/">Contact</Link>
                    </li>
                    <li>
                      <Link to="#/">About us</Link>
                    </li>
                    <li>
                      <Link to="#/">Our Services</Link>
                    </li>
                    <li>
                      <Link to="#/">Expert Team</Link>
                    </li>
                    <li>
                      <Link to="#/">Contact us</Link>
                    </li>
                    <li>
                      <Link to="#/">Latest News</Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div className="footer-widget">
                  <div className="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div className="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div className="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i className="fa fa-telegram"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="copyright-area">
          <div className="container">
            <div className="row">
              <div className="col-xl-6 col-lg-6 text-center text-lg-left">
                <div className="copyright-text">
                  <p>
                    Copyright &copy; 2022, All Right Reserved |{' '}
                    <a
                      target="_blank"
                      rel="noreferrer"
                      href="https://www.syket-das.me/"
                    >
                      Developed By Syket
                    </a>
                  </p>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div className="footer-menu">
                  <ul>
                    <li>
                      <Link to="/">Home</Link>
                    </li>
                    <li>
                      <Link to="#/">Terms</Link>
                    </li>
                    <li>
                      <Link to="#/">Privacy</Link>
                    </li>
                    <li>
                      <Link to="#/">Policy</Link>
                    </li>
                    <li>
                      <Link to="#/">Contact</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Fragment>
  );
};

export default Footer;
