import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <Fragment>
      <footer class="footer-section">
        <div class="container">
          <div class="footer-cta pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fa fa-map-marker"></i>
                  <div class="cta-text">
                    <h4>Find us</h4>
                    <span>Phagwara, Punjab, India</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fa fa-phone"></i>
                  <div class="cta-text">
                    <h4>Call us</h4>
                    <span>+91 8100156406</span>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-md-4 mb-30">
                <div class="single-cta">
                  <i class="fa fa-envelope-open"></i>
                  <div class="cta-text">
                    <h4>Mail us</h4>
                    <span>saiketsd23@gmail.com</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer-content pt-5 pb-5">
            <div class="row">
              <div class="col-xl-4 col-lg-4 mb-50">
                <div class="footer-widget">
                  <div class="footer-logo">
                    <Link to="index.html">
                      <img
                        src="https://i.ibb.co/QDy827D/ak-logo.png"
                        class="img-fluid"
                        alt="logo"
                      />
                    </Link>
                  </div>
                  <div class="footer-text">
                    <p>
                      Lorem ipsum dolor sit amet, consec tetur adipisicing elit,
                      sed do eiusmod tempor incididuntut consec tetur
                      adipisicing elit,Lorem ipsum dolor sit amet.
                    </p>
                  </div>
                  <div class="footer-social-icon">
                    <span>Follow us</span>
                    <Link to="#/">
                      <i class="fa fa-facebook"></i>
                    </Link>
                    <Link to="#/">
                      <i class="fa fa-twitter"></i>
                    </Link>
                    <Link to="#/">
                      <i class="fa fa-google"></i>
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-4 col-md-6 mb-30">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Useful Links</h3>
                  </div>
                  <ul>
                    <li>
                      <Link to="#/">Home</Link>
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
              <div class="col-xl-4 col-lg-4 col-md-6 mb-50">
                <div class="footer-widget">
                  <div class="footer-widget-heading">
                    <h3>Subscribe</h3>
                  </div>
                  <div class="footer-text mb-25">
                    <p>
                      Don’t miss to subscribe to our new feeds, kindly fill the
                      form below.
                    </p>
                  </div>
                  <div class="subscribe-form">
                    <form action="#">
                      <input type="text" placeholder="Email Address" />
                      <button>
                        <i class="fa fa-telegram"></i>
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="copyright-area">
          <div class="container">
            <div class="row">
              <div class="col-xl-6 col-lg-6 text-center text-lg-left">
                <div class="copyright-text">
                  <p>
                    Copyright &copy; 2022, All Right Reserved |{' '}
                    <Link to="https://www.syket-das.me/">
                      Developed By Syket
                    </Link>
                  </p>
                </div>
              </div>
              <div class="col-xl-6 col-lg-6 d-none d-lg-block text-right">
                <div class="footer-menu">
                  <ul>
                    <li>
                      <Link to="#/">Home</Link>
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
