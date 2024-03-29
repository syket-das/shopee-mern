import React, { Fragment, useState, useEffect } from 'react';
import { Carousel, Image, Button, Row, Container } from 'react-bootstrap';

import Loader from '../layout/Loader';
import MetaData from '../layout/MetaData';
import ListReviews from '../review/ListReviews';

import { useAlert } from 'react-alert';
import { useDispatch, useSelector } from 'react-redux';
import {
  getProductDetails,
  newReview,
  clearErrors,
} from '../../actions/productActions';
import { addItemToCart } from '../../actions/cartActions';
import { NEW_REVIEW_RESET } from '../../constants/productConstants';
import Product from './Product';
import Skeleton from 'react-loading-skeleton';

const ProductDetails = ({ match }) => {
  const [quantity, setQuantity] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();
  const alert = useAlert();

  const {
    loading,
    error,
    product,
    similarProducts = [],
  } = useSelector((state) => state.productDetails);
  const { user } = useSelector((state) => state.auth);
  const { error: reviewError, success } = useSelector(
    (state) => state.newReview
  );

  const [loadedImg, setLoadedImg] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoadedImg(true);
      }, 1000);
    }
  }, [loading]);

  useEffect(() => {
    dispatch(getProductDetails(match.params.id));

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors());
    }

    if (success) {
      alert.success('Reivew posted successfully');
      dispatch({ type: NEW_REVIEW_RESET });
    }
  }, [dispatch, alert, error, reviewError, match.params.id, success]);

  const addToCart = () => {
    dispatch(addItemToCart(match.params.id, quantity));
    alert.success('Item Added to Cart');
  };

  const increaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber >= product.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  };

  const decreaseQty = () => {
    const count = document.querySelector('.count');

    if (count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  };

  function setUserRatings() {
    const stars = document.querySelectorAll('.star');

    stars.forEach((star, index) => {
      star.starValue = index + 1;

      ['click', 'mouseover', 'mouseout'].forEach(function (e) {
        star.addEventListener(e, showRatings);
      });
    });

    function showRatings(e) {
      stars.forEach((star, index) => {
        if (e.type === 'click') {
          if (index < this.starValue) {
            star.classList.add('orange');

            setRating(this.starValue);
          } else {
            star.classList.remove('orange');
          }
        }

        if (e.type === 'mouseover') {
          if (index < this.starValue) {
            star.classList.add('yellow');
          } else {
            star.classList.remove('yellow');
          }
        }

        if (e.type === 'mouseout') {
          star.classList.remove('yellow');
        }
      });
    }
  }

  const reviewHandler = () => {
    const formData = new FormData();

    formData.set('rating', rating);
    formData.set('comment', comment);
    formData.set('productId', match.params.id);

    dispatch(newReview(formData));
  };

  return (
    <Fragment>
      {/* {loading ? (
        <Loader />
      ) : ( */}
      <Fragment>
        <MetaData title={product.name} />
        <div className="row d-flex justify-content-around">
          <div className="col-12 col-lg-5 img-fluid" id="product_image">
            {loadedImg ? (
              <Carousel pause="hover">
                {product.images &&
                  product.images.map((image) => (
                    <Carousel.Item key={image.public_id}>
                      <Image
                        fluid
                        style={{ maxHeight: '400px' }}
                        className="d-block w-100 rounded border"
                        src={image.url}
                        alt={product.title}
                      />
                    </Carousel.Item>
                  ))}
              </Carousel>
            ) : (
              <Skeleton height={400} />
            )}
          </div>

          <div className="col-12 col-lg-5 mt-5">
            {loadedImg ? (
              <h3>{product.name}</h3>
            ) : (
              <Skeleton count={2} height={30} />
            )}

            {loadedImg ? (
              <p id="product_id">Product # {product._id}</p>
            ) : (
              <Skeleton count={1} height={10} width={250} />
            )}

            <hr />

            {loadedImg ? (
              <>
                <div className="rating-outer">
                  <div
                    className="rating-inner"
                    style={{ width: `${(product.ratings / 5) * 100}%` }}
                  ></div>
                </div>
                <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
              </>
            ) : (
              <Skeleton count={1} height={10} width={250} />
            )}
            <hr />

            {loadedImg ? (
              <p id="product_price">${product.price}</p>
            ) : (
              <Skeleton count={1} height={30} width={150} />
            )}
            <div className="d-flex justify-content-between">
              {loadedImg ? (
                <div className="d-flex w-50">
                  <span className="btn btn-danger minus" onClick={decreaseQty}>
                    -
                  </span>

                  <input
                    type="number"
                    className="form-control count d-inline text-center"
                    value={quantity}
                    readOnly
                  />

                  <span className="btn btn-primary plus" onClick={increaseQty}>
                    +
                  </span>
                </div>
              ) : (
                <Skeleton count={1} height={40} width={250} />
              )}
              {loadedImg ? (
                <Button
                  className="btn btn-success d-inline ml-4"
                  disabled={product.stock === 0}
                  onClick={addToCart}
                >
                  Add to Cart
                </Button>
              ) : (
                <Skeleton count={1} height={40} width={100} />
              )}
            </div>

            <hr />

            {loadedImg ? (
              <p>
                Status:{' '}
                <span
                  id="stock_status"
                  className={product.stock > 0 ? 'text-success' : 'text-danger'}
                >
                  {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                </span>
              </p>
            ) : (
              <Skeleton count={1} height={20} width={150} />
            )}

            <hr />

            {loadedImg ? (
              <h4 className="mt-2">Description:</h4>
            ) : (
              <Skeleton count={1} height={40} width={200} />
            )}
            {loadedImg ? (
              <p>{product.description}</p>
            ) : (
              <Skeleton count={3} height={30} />
            )}
            <hr />
            {loadedImg ? (
              <p id="product_seller mb-3">
                Sold by: <strong>{product.seller}</strong>
              </p>
            ) : (
              <Skeleton count={1} height={20} width={150} />
            )}

            {user ? (
              <>
               {loadedImg? <Button
                  className="btn btn-success mt-4"
                  data-toggle="modal"
                  data-target="#ratingModal"
                  onClick={setUserRatings}
                >
                  Submit Your Review
                </Button>:(
                  <Skeleton count={1} height={50} width={200} />  
                )}
              </>
            ) : (
              <div className="alert alert-danger mt-5" type="alert">
                Login to post your review.
              </div>
            )}

            <div className="row mt-2 mb-5">
              <div className="rating w-50">
                <div
                  className="modal fade"
                  id="ratingModal"
                  tabIndex="-1"
                  role="dialog"
                  aria-labelledby="ratingModalLabel"
                  aria-hidden="true"
                >
                  <div className="modal-dialog" role="document">
                    <div className="modal-content">
                      <div className="modal-header">
                        <h5 className="modal-title" id="ratingModalLabel">
                          Submit Review
                        </h5>
                        <Button
                          className="btn-danger"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </Button>
                      </div>
                      <div className="modal-body">
                        <ul className="stars">
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                          <li className="star">
                            <i className="fa fa-star"></i>
                          </li>
                        </ul>

                        <textarea
                          name="review"
                          id="review"
                          className="form-control mt-3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></textarea>

                        <Button
                          className="btn btn-success my-3 float-right  px-4 text-white"
                          onClick={reviewHandler}
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          Submit
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Container>
          <h3 className="text-center mt-4">Similar Products</h3>

          <Row>
            {similarProducts.map((product) => (
              <Product
                key={product._id}
                product={product}
                col={4}
                small={true}
              />
            ))}
          </Row>
        </Container>
        <Container>
          {product.reviews && product.reviews.length > 0 && (
            <ListReviews reviews={product.reviews} />
          )}
        </Container>
      </Fragment>
      {/* )} */}
    </Fragment>
  );
};

export default ProductDetails;
