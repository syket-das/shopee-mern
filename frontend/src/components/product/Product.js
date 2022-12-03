import React from 'react';
import { Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = ({ product, col, small }) => {
  return (
    <div className={`col-sm-12 col-md-6 col-lg-${col} my-3`}>
      <div className="card p-3 rounded">
        <Image
        loading='lazy'
          fluid
          style={{
            height: small ? '100px' : '200px',
            width: small ? '100px' : '200px',
            objectFit: small ? 'cover' : 'contain',
          }}
          className="card-img-top mx-auto w-100 "
          src={product.images[0].url}
          alt={product.name}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">
            <Link to={`/product/${product._id}`}>
              {product.name.length > 15
                ? product.name.substring(0, 15) + '...'
                : product.name}
            </Link>
          </h5>
          <div className="ratings mt-auto">
            <div className="rating-outer">
              <div
                className="rating-inner"
                style={{ width: `${(product.ratings / 5) * 100}%` }}
              ></div>
            </div>
            <span id="no_of_reviews">({product.numOfReviews} Reviews)</span>
          </div>
          <p className="card-text">${product.price}</p>
          {!small && (
            <Link
              to={`/product/${product._id}`}
              // id="view_btn"
              className="btn btn-outline-primary"
            >
              View Details
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Product;
