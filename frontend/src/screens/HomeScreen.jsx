import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Product from '../components/Product';
import Loader from '../components/Loader';
import { Link, useParams } from 'react-router-dom';
import Message from '../components/Message';
import Paginate from '../components/Paginate';
import ProductCarousel from '../components/ProductCarousel';
import { useGetProductsQuery } from '../slices/productsApiSlice';

const HomeScreen = () => {
  const { pageNumber = 1 , keyword  = '' } = useParams(); // Default page number is 1
  const { data, isLoading, error } = useGetProductsQuery({ keyword,pageNumber });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>
          {error.data?.message || error.toString()}
        </Message>
      ) : (
        <>
        {!keyword ? <ProductCarousel/> : (
          <Link to='/' className='btn btn-success mb-4'>Go Back</Link>
        )}
          <h1>All Products</h1>
          <Row>
            {data.products.map((product) => (
              <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
                
              </Col>
            ))}
          </Row>
          <Paginate pages={data.pages} page={data.page} keyword={keyword ? keyword : ''} />
        </>
      )}
    </>
  );
};

export default HomeScreen;