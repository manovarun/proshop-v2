import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  Col,
  Image,
  ListGroup,
  Row,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Rating';
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader';
import Message from '../components/Message';

const ProductScreen = () => {
  const { id: productId } = useParams();

  const { data, isLoading, error } = useGetProductDetailsQuery(productId);

  const [qty, setQty] = useState(1);

  const AddToCartHandler = () => {};

  return (
    <>
      <Link to="/" className="btn btn-light my-3">
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data.message || error.error}</Message>
      ) : (
        <Row>
          <Col md={5}>
            <Image src={data.product.image} alt={data.product.name} fluid />
          </Col>
          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>{data.product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  value={data.product.rating}
                  text={`${data.product.numReviews} Reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Price: ${data.product.price}</Col>
              </ListGroup.Item>
              <ListGroup.Item>
                <Col>Description: {data.product.description}</Col>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>${data.product.price}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong>
                        {data.product.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                {data.product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>Qty</Col>
                      <Col>
                        <Form.Select
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(data.product.countInStock).keys()].map(
                            (x) => (
                              <option key={x + 1} value={x + 1}>
                                {x + 1}
                              </option>
                            )
                          )}
                        </Form.Select>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}
                <ListGroup.Item>
                  <Button
                    className="btn btn-block"
                    type="button"
                    disabled={data.product.countInStock === 0}
                    onClick={AddToCartHandler}
                  >
                    Add to Cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
