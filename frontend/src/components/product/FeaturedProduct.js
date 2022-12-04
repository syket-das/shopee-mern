import React from 'react';
import Skeleton from 'react-loading-skeleton';
import { Carousel, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';

const FeaturedProduct = ({ loading }) => {
  const { products } = useSelector((state) => state.products);

  let featuredProducts = products.filter(
    (product) => product.featured === true
  );

  featuredProducts = featuredProducts.slice(0, 4);

  return (
    <>
      {/* {products.length > 0 ? ( */}
      <Carousel className="my-3">
        {featuredProducts.map((product) => (
          <Carousel.Item interval={4000} key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                className="d-block w-100"
                src={product.images[0].url}
                alt={product.name}
                style={{
                  objectFit: 'cover',
                  minWidth: '100%',
                  height: '400px',
                  border: '1px solid #e3e3e3',
                }}
              />
            </Link>
            <Carousel.Caption>
              <h3 className="text-danger">
                {product.name.length > 50
                  ? product.name.substring(0, 50) + '...'
                  : product.name}
              </h3>
              <p className="text-dark">
                {product.description.length > 100 ? (
                  <b> {product.description.substring(0, 100) + '...'}</b>
                ) : (
                  <b>{product.description}</b>
                )}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
        {loading && (
          <Skeleton height={400} style={{ backgroundColor: '#e3e3e3' }} />
        )}
      </Carousel>
    </>
  );
};

export default FeaturedProduct;
