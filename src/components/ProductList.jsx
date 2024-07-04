import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText } from '@mui/material';
import {
  fetchProducts,
  deleteProduct,
} from '../features/products/productSlice';

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.products);
  const productStatus = useSelector((state) => state.products.status);
  const error = useSelector((state) => state.products.error);

  useEffect(() => {
    if (productStatus === 'initial') {
      dispatch(fetchProducts());
    }
  }, [productStatus, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteProduct(id));
  };

  let content;

  if (productStatus === 'loading') {
    content = <div>Loading...</div>;
  } else if (productStatus === 'succeeded') {
    content = (
      <List>
        {products.map((product) => (
          <ListItem key={product.id}>
            <ListItemText
              primary={product.name}
              secondary={`Price: $${product.price}`}
            />
            <Button
              component={Link}
              to={`/edit/${product.id}`}
              variant='contained'
            >
              Edit
            </Button>
            <Button
              onClick={() => handleDelete(product.id)}
              variant='contained'
              color='secondary'
              sx={{ marginLeft: 1 }}
            >
              Delete
            </Button>
          </ListItem>
        ))}
      </List>
    );
  } else if (productStatus === 'failed') {
    content = <div>{error}</div>;
  }

  return (
    <div>
      <h1>Product List</h1>
      <Button component={Link} to='/add' variant='contained' color='primary'>
        Add Product
      </Button>
      {content}
    </div>
  );
};

export default ProductList;
