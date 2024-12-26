import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { data: products, isLoading, isError} = useGetProductsQuery();
  return (
    <>
      {isLoading ? (
        <Loader/>
      ) : isError ? (
        <Message variant='danger'>{isError.data?.message || isError.toString()}</Message>
      ) : (
        <>
          <h1>All Products</h1>
          {products.length > 0 ? (
            <Row>
              {products.map((product) => (
                <Col key={product._id} sm={12} md={6} xl={3}>
                  <Product product={product} />
                </Col>
              ))}
            </Row>
          ) : (
            <p>No products found</p>
          )}
        </>
      )}
    </>
  );
};

export default HomeScreen;