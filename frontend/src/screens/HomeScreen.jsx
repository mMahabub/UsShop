import React, { useEffect, useState } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import Product from '../components/Product';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState([]); // Initialize with an empty array

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await axios.get('/api/products');
        setProducts(data.products || data); // Set products based on response format
      } catch (error) {
        console.error('Error fetching products:', error);
        // Handle errors gracefully (e.g., display an error message)
      }
    };
    fetchProducts();
  }, []);

  return (
    <>
      <h1>All Products</h1>

      {products.length > 0 && ( // Check if products array has elements before mapping
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}

      {products.length === 0 && <p>No products found</p>} {/* Display message if no products */}
    </>
  );
};

export default HomeScreen;