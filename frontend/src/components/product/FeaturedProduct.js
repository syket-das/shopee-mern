import React from 'react';

import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const FeaturedProduct = () => {
  const { products } = useSelector((state) => state.products);

  let featuredProducts = products.filter(
    (product) => product.featured === true
  );

  featuredProducts = featuredProducts.slice(0, 4);

  return (
    <>
      {products.length > 0 ? (
        <Carousel className="my-3">
          {featuredProducts.map((product) => (
            <Carousel.Item interval={1000} key={product._id}>
              <Link
                to={`/product/${product._id}`}
                id="view_btn"
                className="btn btn-block"
              >
                <img
                  className="d-block w-100"
                  src={product.images[0].url}
                  alt={product.name}
                  height="400px"
                  width="100%"
                />
              </Link>
              <Carousel.Caption>
                <h3 className="text-dark">{product.name}</h3>
                <p className="text-dark">
                  {product.description.substring(0, 100)}
                </p>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      ) : null}
    </>
  );
};

export default FeaturedProduct;
